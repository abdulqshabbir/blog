const User = require('../models/User')
const Blog = require('../models/Blog')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const saltRounds = 10

/* @ GET ROUTE */

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', '-_id -user -likes').exec()
    const formattedUsers = users.map(user => user.toJSON())
    res.status(200).json(formattedUsers)
})

/* @ POST ROUTE 

    @req.body has signature: [Object] {name: [String], username: [String], password: [String]}
    @Blog Schema
*/

userRouter.post('/', async (req, res) => {
    const body = req.body

    if(body.password.length < 3) {
        res.status(400).json({error: 'Password must be at least 3 characters long'})
    }

    else if(!(body.password && body.username)) {
        res.status(400).json({error: 'Password and username are required'})
    }

    else{
        try {
            const hashedPassword = await bcrypt.hash(body.password, saltRounds)
            const userBlogs = await Blog.find({author: body.name}).exec()
            const userBlogsIds = userBlogs.map(blog => blog._id)
            
            console.log('user\'s blogs: ', userBlogs)
            const newUser = new User({
                username: body.username,
                name: body.name,
                hashedPassword: hashedPassword,
                blogs: userBlogsIds
            })
    
            await newUser.save()
            res.status(201).json(newUser.toJSON())
    
        } catch(exception) {
            console.log(exception)
        }
    }
})


module.exports = userRouter
