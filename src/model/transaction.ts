import { Schema, model } from 'mongoose';

export interface TransactionInterface {
    businessId: String,
    amount: Number,
    status: String,
    date: Date,

}

const transactionSchema = new Schema<TransactionInterface>({
    businessId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },

    date: {
        type: Date,
        expires: '10080m',
    },
});

export const Transaction = model('Transaction', transactionSchema);
