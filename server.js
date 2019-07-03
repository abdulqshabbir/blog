const express = require('express')
const app = express()
const PORT = require('./utils/config').PORT
const MONGO_PASSWORD = require('./utils/config').MONGO_PASSWORD
const MONGO_URI = `mongodb+srv://fullstack:${MONGO_PASSWORD}@phonebook-ajaa7.mongodb.net/test?retryWrites=true&w=majority`
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//------------- MIDDLE WARE -------------------//
app.use(cors())
app.use(bodyParser.json())
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

//----------- DATABASE CONNECTION -------------//

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('connected to database!'))
    .catch(error => console.log(error))

//----------- DATABASE SCHEMAS/MODELS ----------//

const blogSchema = new mongoose.Schema({
    title: String,
    author: String, 
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (doc, returnedDoc) => {
        returnedDoc.id = returnedDoc._id,
        delete returnedDoc.__v
        delete returnedDoc._id
        return returnedDoc
    }
})

const Blog = mongoose.model('blog', blogSchema)

//------------------ ROUTES -------------------//

/*
    @GET ROUTE
*/
app.get('/api/blogs', (req, res) => {
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

app.post('/api/blogs', (req, res) => {
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
        .then(formattedBlog => res.json(formattedBlog))
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})




//------------------- SERVER -------------------//
app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}!`)
})