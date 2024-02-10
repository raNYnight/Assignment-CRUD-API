import { IncomingMessage, ServerResponse } from 'http'

export interface User {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export interface RequestMessage {
  type: 'request'
  request: IncomingMessage
  response: ServerResponse
}
