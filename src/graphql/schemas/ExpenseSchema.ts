import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

const ExpenseSchema: DocumentNode = gql`
  extend type Query {
    expense(id: ID!): Expense!
  }

  extend type Mutation {
    createExpense(expense: ExpenseInput!): Expense!
    editExpense(id: ID!, expense: EditExpenseInput!): Expense!
    deleteExpense(id: ID!): Boolean
  }

  type Expense {
    _id: ID!
    description: String!
    value: Float!
    type: String!
    user: User
  }

  input ExpenseInput {
    description: String!
    value: Float!
    type: String!
    user: ID!
  }

  input EditExpenseInput {
    description: String!
    value: Float!
    type: String!
  }
`

export default ExpenseSchema
