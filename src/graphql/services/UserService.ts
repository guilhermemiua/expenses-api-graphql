import User from '../../database/models/UserModel'

import { UserInterface } from '../../interfaces/UserInterface'

const UserService = {
  async getById (id): Promise<Partial<UserInterface>> {
    const user = await User.findById(id)

    return user
  },
  async create (user): Promise<Partial<UserInterface>> {
    const {
      username,
      email,
      password
    } = user

    const userCreated = await User.create({
      username,
      email,
      password
    })

    return userCreated
  }
}

export default UserService
