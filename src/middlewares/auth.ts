import { Response, NextFunction } from 'express'

import path from 'path'
import jwt from 'jsonwebtoken'
// import IRequest from '../interfaces/HttpRequest'

require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '../../.env.test')
    : path.join(__dirname, '../../.env')
})

async function auth (request, response: Response, next: NextFunction) : Promise<void | Response> {
  try {
    const authorization = request.header('Authorization')

    if (!authorization) return next()

    const [, token] = authorization.split(' ')

    if (!token) return next()

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId }

    request.userId = decoded.userId

    return next()
  } catch (error) {
    return next()
  }
}

export default auth
