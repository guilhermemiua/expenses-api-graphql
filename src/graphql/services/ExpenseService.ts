import { IExpense } from '../../interfaces/ExpenseInterface'

import Expense from '../../database/models/ExpenseModel'
import { ApolloError } from 'apollo-server'

class ExpenseService {
  async getExpense (id: String): Promise<IExpense> {
    const expense = await Expense.findById(id)

    if (!expense) {
      throw new ApolloError('Expense not found')
    }

    return expense
  }

  async getUserExpenses ({ user }): Promise<IExpense[]> {
    const userExpenses = await Expense.find({
      user
    })

    return userExpenses
  }

  async createExpense (expense): Promise<IExpense> {
    const {
      description,
      value,
      type,
      user
    } = expense

    const expenseCreated = await Expense.create({
      description,
      value,
      type,
      user
    })

    return expenseCreated
  }

  async editExpense (id, expense): Promise<IExpense> {
    const {
      description,
      value,
      type
    } = expense

    await Expense.updateOne({
      _id: id
    }, {
      $set: {
        description,
        value,
        type
      }
    })

    return await this.getExpense(id)
  }

  async deleteExpense (id): Promise<boolean> {
    const result = await Expense.deleteOne({
      _id: id
    })

    if (result.n === 1) {
      return true
    }

    return false
  }
}

export default new ExpenseService()
