import Bull from "bull";
import env from "../config";

import { createOrder, createTransaction } from '../modules/order/order.service';
import { requestHandler } from '../utils/requestHandler'

export const taskQueue = new Bull('task_queue', env.REDIS_URL);

taskQueue.process('log_order', 10, async (job, done) => {
    try {
        console.log('*********************** Logging Order*************************');
        let log = await createOrder(job.data);
        let txn = await createTransaction({ ...job.data, status: 'unpaid', date: log.createdAt })
        let data = {
            "order_id": log.id,
            "platform_code": "022",
            "order_amount": job.data.amount,
            count: 0
        }
        await taskQueue.add('log_tax', data, { removeOnComplete: true });
        console.log(txn);
        console.log('*********************** Order logging Done *************************');
        done();
    } catch (error: any) {
        done(error);
        return;
    }
});

taskQueue.process('log_tax', 10, async (job, done) => {
    let count: number = job.data.count;
    try {
        console.log('*********************** Logging Tax*************************');
        delete job.data.count
        let res = await requestHandler({ verb: 'post', payload: job.data, url: env.TAX_URL, })
        console.log(res.data);
        console.log('*********************** Tax logging Done *************************');
        done();
    } catch (error: any) {
        count = count ? +count + 1 : 0;
        if (count <= 5) {
            await taskQueue.add('log_tax', { ...job.data, count }, { removeOnComplete: true, delay: count * 120000 });
        }
        done(error);
        return;
    }
});

let jobs_array = [taskQueue,];

jobs_array.map((job) => {
    job.on('error', function (error) {
        console.log(error);
        return;
    });

    job.on('failed', async function (job, error) {
        try {
            // TODO: Log failed job and error
            console.log(error);
            await job.remove();
        } catch (error) {
            console.log(error);
            return;
        }
    });
});

process.on('SIGTERM', () => {
    taskQueue.close(false);
});