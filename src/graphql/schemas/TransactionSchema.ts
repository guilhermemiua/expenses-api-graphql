import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

const TransactionSchema: DocumentNode = gql`
  extend type Query {
    transaction(id: ID!): Transaction!
    transactions(type: TransactionType): [Transaction]!
  }

  extend type Mutation {
    createTransaction(transaction: TransactionInput!): Transaction!
    editTransaction(id: ID!, transaction: EditTransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean
  }

  type Transaction {
    _id: ID!
    description: String!
    amount: Float!
    type: TransactionType!
    user: User
  }

  enum TransactionType {
    income
    outcome
  }

  input TransactionInput {
    description: String!
    amount: Float!
    type: String!
    user: ID!
  }

  input EditTransactionInput {
    description: String!
    amount: Float!
    type: String!
  }
`

export default TransactionSchema
