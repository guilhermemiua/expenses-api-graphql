import User from '../../database/models/UserModel'

import { IUser } from '../../interfaces/UserInterface'

class UserService {
  async getById (id): Promise<IUser> {
    const user = await User.findById(id)

    return user
  }

  async create (user): Promise<IUser> {
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
      throw new Error('User already registered')
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

    if (!user) {
      throw new Error('User not found.')
    }
    // Should not tell the user if is the email or password incorrect for security reasons
    if (!user.compareHash(password)) {
      throw new Error('User not found.')
    }

    // Create JWT Token
    const token = await user.generateToken()

    return token
  }
}

export default new UserService()
