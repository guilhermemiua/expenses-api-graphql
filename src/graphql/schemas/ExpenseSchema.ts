import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

const ExpenseSchema: DocumentNode = gql`
  extend type Query {
    hello: String
  }
`

export default ExpenseSchema
