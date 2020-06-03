import { Request } from 'express'

export default interface RequestInterface extends Request {
  userId?: number;
}
