import { ApolloError } from 'apollo-server'

import { ITransaction } from '../../interfaces/TransactionInterface'

import Transaction from '../../database/models/TransactionModel'

class TransactionService {
  async getTransaction (id, user): Promise<ITransaction> {
    const transaction = await Transaction.findOne({
      id,
      user
    })

    if (!transaction) {
      throw new ApolloError('Transaction not found')
    }

    return transaction
  }

  async getTransactions ({ user, type }): Promise<ITransaction[]> {
    let queryFields = {}

    if (type) {
      queryFields = {
        ...queryFields,
        type
      }
    }

    const transactions = await Transaction.find({
      ...queryFields,
      user
    })

    return transactions
  }

  async createTransaction (transaction): Promise<ITransaction> {
    const {
      description,
      amount,
      type,
      user
    } = transaction

    const transactionCreated = await Transaction.create({
      description,
      amount,
      type,
      user
    })

    return transactionCreated
  }

  async editTransaction (id, user, transaction): Promise<ITransaction> {
    const {
      description,
      amount,
      type
    } = transaction

    await Transaction.updateOne({
      _id: id,
      user
    }, {
      $set: {
        description,
        amount,
        type
      }
    })

    return await this.getTransaction(id, user)
  }

  async deleteTransaction (id, user): Promise<boolean> {
    const result = await Transaction.deleteOne({
      _id: id,
      user
    })

    if (result.n === 1) {
      return true
    }

    return false
  }
}

export default new TransactionService()
