import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import { ApolloServer } from 'apollo-server-express'

import IRequest from './interfaces/RequestInterface'
import auth from './middlewares/auth'
import schema from './graphql'

require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '../../.env.test')
    : path.join(__dirname, '../../.env')
})

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.initGraphqlServer()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(auth)
  }

  private database (): void {
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
  }

  private async initGraphqlServer (): Promise<void> {
    const server = new ApolloServer({
      schema: schema,
      context: ({ req }: { req: IRequest }) => {
        return { userId: req.userId || '' }
      }
    })

    server.applyMiddleware({ app: this.express })
  }
}

export default new App().express
