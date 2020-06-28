import { AuthenticationError } from 'apollo-server'

import { ITransaction } from '../../interfaces/TransactionInterface'
import { IUser } from '../../interfaces/UserInterface'

import TransactionService from '../services/TransactionService'
import UserService from '../services/UserService'

const TransactionResolver = {
  Transaction: {
    // Values is a Decimal128 Object, this resolver return the object amount
    amount: ({ amount }): number => {
      return amount.toString()
    },
    user: async ({ user }): Promise<IUser> => {
      return await UserService.getUser(user)
    }
  },
  Query: {
    transaction: async (parent, { id }, context): Promise<ITransaction> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await TransactionService.getTransaction(id, context.userId)
    },
    transactions: async (parent, { type }, context): Promise<ITransaction[]> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await TransactionService.getTransactions({ user: context.userId, type })
    }
  },
  Mutation: {
    createTransaction: async (parent, { transaction }, context): Promise<ITransaction> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await TransactionService.createTransaction(transaction)
    },
    editTransaction: async (parent, { id, transaction }, context): Promise<ITransaction> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await TransactionService.editTransaction(id, context.userId, transaction)
    },
    deleteTransaction: async (parent, { id }, context): Promise<boolean> => {
      if (!context.userId) throw new AuthenticationError('Unauthorized')

      return await TransactionService.deleteTransaction(id, context.userId)
    }
  }
}

export default TransactionResolver
