const User = require('../models/User')
const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    const formattedUsers = users.map(user => user.toJSON())
    res.status(200).json(formattedUsers)
})

userRouter.post('/', async (req, res) => {
    const body = req.body
    const newUser = new User({
        username: body.username,
        name: body.name,
        password: body.password
    })
    await newUser.save()
    res.status(201).json(newUser)
})


module.exports = userRouter
