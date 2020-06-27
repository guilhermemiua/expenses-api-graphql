import UserService from '../services/UserService'

import { IUser } from '../../interfaces/UserInterface'
import { AuthenticationError } from 'apollo-server'

const UserResolver = {
  Query: {
    user: (parent, { id }, context): Promise<IUser> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return UserService.getUser(id)
    }
  },
  Mutation: {
    createUser: (parent, { user }): Promise<IUser> => {
      return UserService.createUser(user)
    },
    login: (parent, { email, password }): Promise<String> => {
      return UserService.login(email, password)
    }
  }
}

export default UserResolver
