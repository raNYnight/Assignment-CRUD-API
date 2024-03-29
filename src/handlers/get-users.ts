import { users } from '../data'
import { IncomingMessage, ServerResponse } from 'http'

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(users))
}
