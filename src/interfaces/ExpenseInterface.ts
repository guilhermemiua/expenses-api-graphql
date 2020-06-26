import { Document } from 'mongoose'

export interface IExpense extends Document {
  _id: string
  description: string
  type: string
  value: number
  user: number
}
