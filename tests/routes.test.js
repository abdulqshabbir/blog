const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('./../models/Blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
]

beforeEach(async() => {
    await Blog.deleteMany({})

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

const notesInDb = async () => {
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
        const blogsAtStart = await notesInDb()
        
        await api
                .post('/api/blogs')
                .send(newBlog)
        
        const blogsAtEnd = await notesInDb()
        const blogTitlesAtEnd = blogsAtEnd.map(blog => blog.title)
        expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
        expect(blogTitlesAtEnd.includes('My blog post'))
    })
})

afterAll(() => {
    mongoose.connection.close()
})