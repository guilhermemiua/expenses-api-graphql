
import mongoose from 'mongoose'
import { Decimal128, ObjectId } from 'mongodb'
import { ITransaction } from '../../interfaces/TransactionInterface'

const { Schema, model } = mongoose

const transactionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Decimal128,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'users',
    require: true
  }
})

const Transaction = model<ITransaction>('transactions', transactionSchema)

export default Transaction
