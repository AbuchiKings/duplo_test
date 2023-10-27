import { Transaction } from "../../model/transaction";
import prisma from "../../utils/prisma";

export type newOrder = {
    amount: number
    itemId: String
    businessId: String
    createdBy: String,
    createdAt: Date
}

type newTransaction = {
    businessId: String,
    amount: Number,
    status?: String,
    date: Date,
}
export async function createOrder(data: newOrder) {
    // await Transaction.deleteMany();
    // await prisma.order.deleteMany();
    // @ts-ignore
    const order = await prisma.order.create({ data });
    return order;
}


export async function createTransaction(data: newTransaction) {
    const txn = await Transaction.create(data);
    return txn.toObject();
}

export async function getOrderDetails(businessId?: string) {
    if (!businessId) throw new Error(`Invalid request.`)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pipeline = [
        { $match: { businessId } },
        {
            $group: {
                _id: null,
                totalTransactions: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                todayTransactions: {
                    $sum: {
                        $cond: {
                            if: { $gte: ["$date", today] },
                            then: 1,
                            else: 0,
                        },
                    },
                },
                todayAmount: {
                    $sum: {
                        $cond: {
                            if: { $gte: ["$date", today] },
                            then: "$amount",
                            else: 0,
                        },
                    },
                },
            },
        }, {
            $project: {
                _id: 0, // Exclude the _id field
            },
        },
    ];

    return Transaction.aggregate(pipeline);
}

export async function getCreditScore(businessId?: string) {
    const pipeline = [
        { $match: { businessId } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalTransactions: { $sum: 1 },
            },
        }, {
            $project: {
                _id: 0, // Exclude the _id field
            },
        },
    ];
    const txn = await Transaction.aggregate(pipeline);
    const score = txn[0].totalAmount / (txn[0].totalTransactions * 100);
    return { score: score.toFixed(3) };
}