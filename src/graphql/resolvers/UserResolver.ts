import UserService from '../services/UserService'

import User from '../../database/models/UserModel'
import { UserInterface } from '../../interfaces/UserInterface'

// const UserResolver = {
//   async getById (id): Promise<Partial<UserInterface>> {
//     const user = await User.findById(id)

//     return user
//   },
//   async create (user): Promise<Partial<UserInterface>> {
//     const {
//       username,
//       email,
//       password
//     } = user

//     const userCreated = await User.create({
//       username,
//       email,
//       password
//     })

//     return userCreated
//   }
// }

const UserResolver = {
  Query: {
    user: (parent, { id }, context): Promise<Partial<UserInterface>> => {
      if (!context.userId) return null

      return UserService.getById(id)
    }
  },
  Mutation: {
    createUser: (parent, { user }): Promise<Partial<UserInterface>> => {
      return UserService.create(user)
    }
  }
}

export default UserResolver
