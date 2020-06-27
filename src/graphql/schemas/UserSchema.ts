import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

const UserSchema: DocumentNode = gql`
  extend type Query {
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(user: UserInput!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
`

export default UserSchema
