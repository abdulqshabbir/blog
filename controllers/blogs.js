const blogRouter = require('express').Router()
const Blog = require('./../models/Blog')
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_SECRET = require('./../utils/config').JWT_SECRET
const middleware = require('./../utils/middleware')

/*
    @GET ROUTE
*/
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('user', '-blogs').exec()
        const formattedBlogs = blogs.map( blog => blog.toJSON())
        res.json(formattedBlogs)
    } catch(e) {
        console.log(e)
        res.status(500).end()
    }
})

blogRouter.get('/:id', async (req, res) => {
    const blogId = req.params.id
    try {
        const foundBlog = await Blog.findById(blogId).exec()
        res.status(200).json(foundBlog.toJSON())
    } catch(exception) {
        console.log(exception)
    }
})

/*
    @POST ROUTE

    @decodedUser has signature: [Oject] {username: [String], id: [String], iat: [String]}
*/

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
    console.log('request body: ', req.body)
    
    if (!(title && author && url && likes)) {    
        return res.status(400).json({"error": "bad request"})
    }

    try {
        const token = req.token
        const decodedUser = await jwt.verify(req.token, JWT_SECRET)

        if (!token || !decodedUser.id) {
            res.status(401).json({ error: 'Token is missing or invalid.  Unauthorized access.' })
        }

        else {
            // find user who will be the author of this blog
            const user = await User.findOne({username: decodedUser.username}).exec()

            // create new blog document from request body if user is authenticated
            const newBlog = {
                _id: new mongoose.Types.ObjectId(),
                title: title,
                author: author,
                url: url,
                likes: likes,
                // reference to user who created blog
                user: user._id
            }
           
            const savedBlogDocument = await new Blog(newBlog).save()

            if(user) {
                // Add new blog to the 'blogs' reference if there exists a user that corresponds to the author
                user.blogs.push(newBlog._id)
                await user.save()
            }
            
            res.status(201).json(savedBlogDocument.toJSON())
        }
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

/*
    @DELETE ROUTE

    @decodedUser has signature: [Oject] [  username: [String], id: [String], iat: [String]  }
    @req.params holds the value of the blog id being deleted
    @req.token holds the value of the bearer token
*/

blogRouter.delete('/:id', async (req, res) => {
    /*
        1.  DELETE request must come with a bearer token in the header
        2.  Grab the bearer token from the header and decode the user
        3.  Use the decodedUser's id to find a user in the database with the same id
        4.  Find all blogs authored by that user
        5.  Check if the blog being deleted (id of blogs is given in req.params) is one of the blogs authored by that user
    */

    // grab token from request header
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // grab only the jwt token sent in the authorization header
        req.token = authorization.substring(7)
    }

    const token = req.body.token
    const toBeDeletedBlogId = req.params.id
    
    try {
        const user = await jwt.verify(token, JWT_SECRET)
        if (!user || !token) {
            res.status.end(401).json({error: 'token missing or invalid.  Unauthorized Access'})
        }
        else {
            const blogAuthor = await User.findById(user.id)
            const blogsWrittenByAuthor = blogAuthor.blogs
            if (blogsWrittenByAuthor.includes(toBeDeletedBlogId)) {
                await Blog.findByIdAndRemove(toBeDeletedBlogId).exec()
                res.send(200).end()
            }
            else {
                res.send(401).json({error: 'Unauthorized Access.  User that sent the delete request did not create this blog.'})
            }
        }

    } catch(exception) {
        console.log(exception)
    }
})

module.exports = blogRouter