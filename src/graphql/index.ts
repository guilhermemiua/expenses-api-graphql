import { makeExecutableSchema } from 'apollo-server'
import { gql } from 'apollo-server-express'

import UserSchema from './schemas/UserSchema'
import ExpenseSchema from './schemas/ExpenseSchema'
import UserResolver from './resolvers/UserResolver'
import ExpenseResolver from './resolvers/ExpenseResolver'

const initialSchema = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [initialSchema, UserSchema, ExpenseSchema],
  resolvers: [UserResolver, ExpenseResolver]
})

export default schema
