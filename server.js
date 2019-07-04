//------------- IMPORTS -------------------//
const express = require('express')
const app = express()
const PORT = require('./utils/config').PORT
const MONGO_URI = require('./utils/config').MONGO_URI
const MONGO_TEST_URI = require('./utils/config').MONGO_TEST_URI
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')

//------------- MIDDLE WARE -------------------//
app.use(cors())
app.use(bodyParser.json())
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

//----------- DATABASE CONNECTION -------------//

if (process.env.NODE_ENV === 'test') {
    MONGO_URI = process.env.MONGO_TEST_URI
}

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('connected to database!'))
    .catch(error => console.log(error))

//------------------ ROUTES -------------------//
app.use('/api/blogs', blogRouter)

//------------------- SERVER -------------------//
app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}!`)
})