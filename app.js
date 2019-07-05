
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = require('./utils/config').MONGO_URI
const logger = require('./utils/middleware')

//----------- DATABASE CONNECTION -------------//
mongoose
    .connect(MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log(`connected to database at URI: ${MONGO_URI}!`))
    .catch(error => {
        console.log('error connecting to mongoDB', error)
    })

//------------- MIDDLE WARE -------------------//
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
// morgan.token('req-body', (req, res) => JSON.stringify(req.body))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(logger)

//------------------ ROUTES -------------------//
app.use('/api/blogs', blogRouter)
module.exports = app