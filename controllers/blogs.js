const blogRouter = require('express').Router()
const Blog = require('./../models/Blog')
/*
    @GET ROUTE
*/
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        const formattedBlogs = blogs.map( blog => blog.toJSON())
        res.json(formattedBlogs)
    } catch(e) {
        console.log(e)
        res.status(500).end()
    }
})

/*
    @POST ROUTE
*/

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
    
    if (!title || !author || !url || !likes) {    
        return res.status(400).json({"error": "bad request"})
    }
    
    const newBlog = new Blog({
        title,
        author,
        url,
        likes
    })

    try {
        const savedBlog = await newBlog.save()
        const savedFormattedBlog = savedBlog.toJSON()
        res.status(201).json(savedFormattedBlog)
    } catch(e) {
        console.log(e)
        res.status(500).end()
    }
})

module.exports = blogRouter