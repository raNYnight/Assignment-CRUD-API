import { users } from 'data'
import { IncomingMessage, ServerResponse } from 'http'

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[3]
  if (!userId) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid userId' }))
    return
  }

  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body)
    if (!username || !age || !hobbies) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing required fields' }))
      return
    }

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'User not found' }))
      return
    }

    const updatedUser = {
      id: userId,
      username,
      age,
      hobbies
    }

    users[userIndex] = updatedUser
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(updatedUser))
  })
}
