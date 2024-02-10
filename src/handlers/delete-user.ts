import { users } from '../data'
import { IncomingMessage, ServerResponse } from 'http'
import { validate as validateUUID } from 'uuid'

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[3]
  if (!userId || !validateUUID(userId)) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid userId' }))
    return
  }

  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'User not found' }))
    return
  }

  users.splice(userIndex, 1)
  res.statusCode = 204
  res.end()
}
