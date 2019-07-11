const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./../utils/config').JWT_SECRET
const loginRouter = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')

/*
    LOGIN process: 

    1. User submits login form on front-end which sends a post request to /api/login
    2. Client sends username and (unhashed) password in the request body
    3. loginRouter checks if both fields are present
    4. loginRouter compares password to hashed password stored in database
        if password doesn't correspond to user => return bad request
        if password does match
            5. JWT is used to generate a token to identify the user and return status 200

*/

loginRouter.post('/', async (req, res) => {
    const body = req.body
    const user = await User.findOne({username: body.username})

    if (!(body.password && body.username)) {
        res.status(400).json({error: "Username and password must be provided."})
    }

    if (!user) {
        res.status(400).json({error: "Could not find user in our database."})
    }

    const passwordCorrect = await bcrypt.compare(body.password, user.hashedPassword)

    if (!passwordCorrect) {
        // send a 401 status for unauthorized user
        res.status(401).json({error: "Invalid password"})
    }

    else {
        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = await jwt.sign(userForToken, JWT_SECRET)
        res.status(200).send({
            token,
            userForToken
        })

    }
})

module.exports = loginRouter