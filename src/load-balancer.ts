import cluster from 'cluster'
import http, { IncomingMessage, ServerResponse } from 'http'
import os from 'os'
import { RequestMessage } from 'types/types'
import { createUser } from './handlers/create-user'
import { deleteUser } from './handlers/delete-user'
import { getSingleUser } from './handlers/get-single-user'
import { notFound } from './handlers/not-found'
import { updateUser } from './handlers/update-user'
import { getUsers } from './handlers/get-users'

const numCPUs = os.cpus().length
const PORT = process.env.PORT || 4000

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork()
  }

  let workerIndex = 0
  const workers = Object.values(cluster.workers!)
  const numWorkers = workers.length

  function getNextWorker() {
    const worker = workers[workerIndex]
    workerIndex = (workerIndex + 1) % numWorkers
    return worker
  }

  http
    .createServer((req, res) => {
      const worker = getNextWorker()
      worker!.send({ type: 'request', request: req, response: res })
    })
    .listen(PORT, () => {
      console.log(`Load balancer listening on port ${PORT}`)
    })
} else {
  console.log(`Worker ${process.pid} started`)

  const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
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

  server.listen(parseInt(PORT as string, 10) + (cluster.worker?.id || 0), () => {
    console.log(`Worker ${process.pid} listening on port ${parseInt(PORT as string, 10) + (cluster.worker?.id || 0)}`)
  })

  process.on('message', (message: RequestMessage) => {
    if (message.type === 'request') {
      server.emit('request', message.request, message.response)
    }
  })
}
