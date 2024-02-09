import { ServerResponse } from 'http'

export function notFound(res: ServerResponse) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: 'Endpoint not found' }))
}
