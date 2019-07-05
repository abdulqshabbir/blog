const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

test('GET request to /api/blogs', () => {
    api
        .get('/api/blogs')
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
})


afterAll(() => {
    mongoose.connection.close()
})