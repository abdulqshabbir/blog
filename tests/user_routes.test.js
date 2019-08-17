const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/User')

const firstUser = {
    username: 'Princey Hamilton',
    name: 'Princey',
    password: 'cat'
}
const secondUser = {
    username: 'Amanda Hamilton',
    name: 'Amanda',
    password: 'prince'
}

beforeEach( async () => {
    await User.remove({}).exec()
    const firstUserDoc = new User(firstUser)
    const secondUserDoc = new User(secondUser)

    await firstUserDoc.save()
    await secondUserDoc.save()
})

const usersInDb = async () => {
    const users = await User.find({})
    const formattedUsers = users.map(user => user.toJSON())
    return formattedUsers
}

describe('GET requests', () => {
    test('GET request to /api/users returns correct Content-Type and status header', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('GET request to return correct number of items', async () => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(2)
    })

    test('GET request to /api/users returns correct contents in body', async () => {
        const response = await api.get('/api/users')
        const names = response.body.map(user => user.name)
        const usernames = response.body.map(user => user.username)
        expect(names).toContain('Amanda')
        expect(usernames).toContain('Amanda Hamilton')
    })
})

describe('POST requests', () => {
    const newUser = {
        username: 'newUser',
        name: 'new name',
        password: 'newpassword'
    }
    test('POST request to /api/users returns correct Content-Type and status header', async () => {
        try {
            await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        } catch(e) {
            console.log(e)
        }
    })

    test('POST request to return correct number of items', async () => {
        try {
            const usersAtStart = await usersInDb()
            await api.post('/api/users').send(newUser)
            const usersAtEnd = await usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        } catch (e) {
            console.log(e)
            throw (e)
        }
    })

    test('POST request to /api/users results in new item being added to DB', async () => {
        try {
            await api.post('/api/users').send(newUser)
            const usersAtEnd = await usersInDb()
            const usernamesAtEnd = usersAtEnd.map(u => u.username)
            expect(usernamesAtEnd).toContain('newUser')

        } catch (e) {
            console.log(e)
            throw (e)
        }
    })
})

afterAll(() => {
    mongoose.connection.close()
})