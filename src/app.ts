import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { ApolloServer } from 'apollo-server-express'

import IRequest from './interfaces/RequestInterface'
import auth from './middlewares/auth'
import schema from './graphql'

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
    mongoose.connect('mongodb://root:123456@mongo:27017/admin', { useNewUrlParser: true })
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
