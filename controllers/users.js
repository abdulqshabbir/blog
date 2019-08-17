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
    @Blog Schema2
*/

userRouter.post('/', async (req, res) => {
    const body = req.body

    if(body.password.length < 3) {
        // password is too short
        res.status(400).json({error: 'Password must be at least 3 characters long'})
    }

    else if(!(body.password && body.username)) {
        // either password, username, or both are missing
        res.status(400).json({error: 'Password and username are required'})
    }

    else{
        try {
            const hashedPassword = await bcrypt.hash(body.password, saltRounds)
            
            // Find blogs in the database which exist that match the name of the person signing up
            const userBlogs = await Blog.find({author: body.name}).exec()

            if (userBlogs) {
                // If user signing up already has blogs under his/her name...
                const userBlogsIds = userBlogs.map(blog => blog._id)
                const newUser = new User({
                    username: body.username,
                    name: body.name,
                    hashedPassword: hashedPassword,
                    blogs: userBlogsIds
                })
                console.log('new user', newUser)
                // save new user with blog references to database
                await newUser.save()
                res.status(201).json(newUser.toJSON())
            }

            else {
                // If user signing up does NOT already have blogs under his/her name pass along an empty array for blog references
                const newUser = new User({
                    username: body.username,
                    name: body.name,
                    hashedPassword: hashedPassword,
                    blogs: []
                })
                console.log('new user', newUser)
                await newUser.save()
                res.send(201).json(newUser.toJSON()).end()            
            }
        } catch(exception) {
            console.log(exception)
        }
    }
})


module.exports = userRouter
