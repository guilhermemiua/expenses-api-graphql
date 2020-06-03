import { Document } from 'mongoose'

export interface ExpenseInterface extends Document {
  _id: number
  description: string
  type: string
  value: number
  user: number
}
