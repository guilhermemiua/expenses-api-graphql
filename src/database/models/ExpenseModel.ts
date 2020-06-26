
import mongoose from 'mongoose'
import { Decimal128, ObjectId } from 'mongodb'
import { IExpense } from '../../interfaces/ExpenseInterface'

const { Schema, model } = mongoose

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  value: {
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

const Expense = model<IExpense>('expenses', expenseSchema)

export default Expense
