import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

const UserSchema: DocumentNode = gql`
  extend type Query {
    user(id: String!): User
  }

  extend type Mutation {
    createUser(user: UserInput!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
`

export default UserSchema
