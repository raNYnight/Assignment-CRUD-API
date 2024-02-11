import { users } from '../data'
import { IncomingMessage, ServerResponse } from 'http'
import { User } from 'types/types'
import { v4 as uuidv4 } from 'uuid'

export function createUser(req: IncomingMessage, res: ServerResponse) {
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

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies
    }

    users.push(newUser)
    res.statusCode = 201
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(newUser))
  })
}
