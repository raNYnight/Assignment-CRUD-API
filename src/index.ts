// server.ts
import { createUser } from './handlers/create-user'
import { deleteUser } from './handlers/delete-user'
import { getSingleUser } from './handlers/get-single-user'
import { getUsers } from './handlers/get-users'
import { notFound } from './handlers/not-found'
import { updateUser } from './handlers/update-user'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import dotenv from 'dotenv'

dotenv.config()

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req

  if (method === 'GET' && url === '/api/users') {
    getUsers(req, res)
  } else if (method === 'GET' && url?.startsWith('/api/users/')) {
    getSingleUser(req, res)
  } else if (method === 'POST' && url === '/api/users') {
    createUser(req, res)
  } else if (method === 'PUT' && url?.startsWith('/api/users/')) {
    updateUser(req, res)
  } else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
    deleteUser(req, res)
  } else {
    notFound(res)
  }
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
