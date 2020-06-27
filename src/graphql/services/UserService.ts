import User from '../../database/models/UserModel'

import { IUser } from '../../interfaces/UserInterface'

import { ApolloError } from 'apollo-server'

class UserService {
  async getUser (id): Promise<IUser> {
    const user = await User.findById(id)

    return user
  }

  async createUser (user): Promise<IUser> {
    const {
      username,
      email,
      password
    } = user

    // Verify if email or username is already registered
    const isEmailOrUsernameRegistered = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (isEmailOrUsernameRegistered) {
      throw new ApolloError('User already registered')
    }

    const userCreated = await User.create({
      username,
      email,
      password
    })

    return userCreated
  }

  async login (email, password): Promise<String> {
    const user = await User.findOne({
      email
    })

    // Should not tell the user if is the email or password incorrect for security reasons
    if (!user) {
      throw new ApolloError('Invalid Credentials.')
    }

    if (!user.compareHash(password)) {
      throw new ApolloError('Invalid Credentials.')
    }

    // Create JWT Token
    const token = await user.generateToken()

    return token
  }
}

export default new UserService()
