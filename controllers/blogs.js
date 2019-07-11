const blogRouter = require('express').Router()
const Blog = require('./../models/Blog')
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_SECRET = require('./../utils/config').JWT_SECRET

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

/*
    @POST ROUTE

    @decodedUser has signature: [Oject] {username: [String], id: [String], iat: [String]}
    @
*/

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes, token } = req.body
    
    if (!(title && author && url && likes)) {    
        return res.status(400).json({"error": "bad request"})
    }

    try {
        const decodedUser = await jwt.verify(token, JWT_SECRET)

        if (!decodedUser) {
            res.status(401).json({ error: 'Token is invalid.  Unauthorized access.' })
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

module.exports = blogRouter