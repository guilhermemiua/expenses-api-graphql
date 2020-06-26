import UserService from '../services/UserService'

import { IUser } from '../../interfaces/UserInterface'

const UserResolver = {
  Query: {
    user: (parent, { id }, context): Promise<IUser> => {
      if (!context.userId) throw new Error('Unauthorized')

      return UserService.getById(id)
    }
  },
  Mutation: {
    createUser: (parent, { user }): Promise<IUser> => {
      return UserService.create(user)
    },
    login: (parent, { email, password }): Promise<String> => {
      return UserService.login(email, password)
    }
  }
}

export default UserResolver
