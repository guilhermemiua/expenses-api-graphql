import { Document } from 'mongoose'

export interface ITransaction extends Document {
  _id: string
  description: string
  type: string
  amount: number
  user: number
}
