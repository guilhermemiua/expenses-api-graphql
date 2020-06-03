import UserService from '../services/UserService'

import Expense from '../../database/models/ExpenseModel'

const ExpenseResolver = {
  Query: {
    hello: (parent, { id }, context): String => {
      // if (!context.userId) return null

      return 'Hello world!'
    }
  }
}

export default ExpenseResolver
