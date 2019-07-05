const mongoose = require('mongoose')
const blogRouter = require('express').Router()
const Blog = require('./../models/Blog')
/*
    @GET ROUTE
*/
blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(docs => docs.map(doc => doc.toJSON()))
        .then(formattedDocs => res.json(formattedDocs))
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

/*
    @POST ROUTE
*/

blogRouter.post('/', (req, res) => {
    const { title, author, url, likes } = req.body
    if (!title || !author || !url || !likes) return res.status(400).json({"error": "bad request"}).end()
    const newBlog = new Blog({
        title,
        author,
        url,
        likes
    })
    newBlog
        .save()
        .then(blog => blog.toJSON())
        .then(formattedBlog => res.status(201).json(formattedBlog))
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

module.exports = blogRouter