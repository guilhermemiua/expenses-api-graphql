import { Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  username: string
  email: string
  password: string
  transactions: string[]

  compareHash: (password: String) => Promise<boolean>
  generateToken: () => Promise<string>
}
