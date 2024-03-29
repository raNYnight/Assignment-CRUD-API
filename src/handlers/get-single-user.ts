import { IncomingMessage, ServerResponse } from 'http'
import { validate as validateUUID } from 'uuid'
import { users } from '../data'

export function getSingleUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[3]
  if (!userId || !validateUUID(userId)) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid userId' }))
    return
  }

  const user = users.find((u) => u.id === userId)
  if (!user) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'User not found' }))
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(user))
}
