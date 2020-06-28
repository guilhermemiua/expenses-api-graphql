import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'

import { ObjectId } from 'mongodb'

import { IUser } from '../../interfaces/UserInterface'

require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '../../.env.test')
    : path.join(__dirname, '../../.env')
})

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  transactions: [{
    type: ObjectId,
    ref: 'transactions'
  }]
})

userSchema.pre<IUser>('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

userSchema.methods = {
  async compareHash (password: String): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  },
  async generateToken (): Promise<string> {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    })
  }
}

const User = model<IUser>('users', userSchema)

export default User
