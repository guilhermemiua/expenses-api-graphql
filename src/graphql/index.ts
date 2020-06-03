import { makeExecutableSchema } from 'apollo-server'
import { gql } from 'apollo-server-express'
import UserSchema from './schemas/UserSchema'
import UserResolver from './resolvers/UserResolver'
import ExpenseResolver from './resolvers/ExpenseResolver'
import ExpenseSchema from './schemas/ExpenseSchema'

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
