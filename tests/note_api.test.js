const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('contacts are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/persons')

  .expect(response.body).toHaveLength(3)
})

afterAll(() => {
  mongoose.connection.close()
})