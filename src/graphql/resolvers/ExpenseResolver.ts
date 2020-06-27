import { AuthenticationError } from 'apollo-server'

import { IExpense } from '../../interfaces/ExpenseInterface'
import { IUser } from '../../interfaces/UserInterface'

import ExpenseService from '../services/ExpenseService'
import UserService from '../services/UserService'

const ExpenseResolver = {
  Expense: {
    // Values is a Decimal128 Object, this resolver return the object value
    value: ({ value }): number => {
      return value.toString()
    },
    user: async ({ user }): Promise<IUser> => {
      return await UserService.getUser(user)
    }
  },
  Query: {
    expense: async (parent, { id }, context): Promise<IExpense> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await ExpenseService.getExpense(id)
    }
  },
  Mutation: {
    createExpense: async (parent, { expense }, context): Promise<IExpense> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await ExpenseService.createExpense(expense)
    },
    editExpense: async (parent, { id, expense }, context): Promise<IExpense> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await ExpenseService.editExpense(id, expense)
    },
    deleteExpense: async (parent, { id }, context): Promise<boolean> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await ExpenseService.deleteExpense(id)
    }
  }
}

export default ExpenseResolver
