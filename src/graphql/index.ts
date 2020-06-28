import { makeExecutableSchema } from 'apollo-server'
import { gql } from 'apollo-server-express'

import UserSchema from './schemas/UserSchema'
import TransactionSchema from './schemas/TransactionSchema'
import UserResolver from './resolvers/UserResolver'
import TransactionResolver from './resolvers/TransactionResolver'

const initialSchema = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [initialSchema, UserSchema, TransactionSchema],
  resolvers: [UserResolver, TransactionResolver]
})

export default schema
