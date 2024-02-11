import { server } from 'index'
import request from 'supertest'
import { User } from 'types/types'

const api = request(server)

describe('API Tests', () => {
  let lastCreatedUser: User = {
    id: '',
    username: '',
    age: '',
    hobbies: []
  }

  it('should get all records and return an empty array', async () => {
    const response = await api.get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should create a new object and return the created record', async () => {
    const newUser = { username: 'John Doe', age: '25', hobbies: ['hiking', 'fishing'] }
    const response = await api.post('/api/users').send(newUser)
    console.log('lastCreatedUser', response.body.hobbies)
    expect(response.status).toBe(201)
    expect(response.body.username).toBe(newUser.username)
    expect(response.body.age).toBe(newUser.age)
    expect(response.body.hobbies).toEqual(newUser.hobbies)
    lastCreatedUser = response.body
  })

  it('should get the created record by its id', async () => {
    const response = await api.get(`/api/users/${lastCreatedUser.id}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(lastCreatedUser.id)
  })

  it('should update the created record and return the updated object with the same id', async () => {
    const updatedUser = { username: 'John Doe Updated', age: '26', hobbies: ['poker', 'tv'] }
    const response = await api.put(`/api/users/${lastCreatedUser.id}`).send(updatedUser)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(lastCreatedUser.id)
    expect(response.body.username).toBe(updatedUser.username)
    expect(response.body.age).toBe(updatedUser.age)
    expect(response.body.hobbies).toEqual(updatedUser.hobbies)
  })

  it('should delete the created object by id and return confirmation of successful deletion', async () => {
    const response = await api.delete(`/api/users/${lastCreatedUser.id}`)
    expect(response.status).toBe(204)
  })

  it('should return "No such object" when trying to get a deleted object by id', async () => {
    const response = await api.get(`/api/users/${lastCreatedUser.id}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('User not found')
  })
})
