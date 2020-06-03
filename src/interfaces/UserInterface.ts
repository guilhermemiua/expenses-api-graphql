import { Document } from 'mongoose'

export interface UserInterface extends Document {
  _id: number
  username: string
  email: string
  password: string
  expenses: string[]
}
