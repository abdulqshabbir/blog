const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/Blog')

beforeEach(async() => {
    await Blog.remove({}).exec()

    const firstBlog = new Blog({
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    })
    await firstBlog.save()

    const secondBlog = new Blog ({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    })
    await secondBlog.save()
})

const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

describe('GET requests', () => {
    test('GET request to /api/blogs with correct Content-Type and Status Code', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('GET request to /api/blogs returns correct number of items', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body.length).toBe(2)
    })
    
    test('GET request to /api/blogs returns title', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].author).toBe('Michael Chan')
    })
})

describe('POST requests', () => {
    const newBlog = new Blog({
        title: 'My blog post',
        author: 'Abdul Shabbir', 
        url: 'http://dummyurl.com',
        likes: 2
    }) 
    test('POST request to /api/blogs returns correct content-type and status code', async () => {
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    })
    test('POST request to /api/blogs adds note to database', async () => {
        const blogsAtStart = await blogsInDb()
        
        await api
                .post('/api/blogs')
                .send(newBlog)
        
        const blogsAtEnd = await blogsInDb()
        const blogTitlesAtEnd = blogsAtEnd.map(blog => blog.title)
        expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
        expect(blogTitlesAtEnd.includes('My blog post'))
    })
})


afterAll(() => {
    mongoose.connection.close()
})