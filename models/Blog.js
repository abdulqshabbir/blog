//----------- BLOG SCHEMA AND MODEL ----------//
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String, 
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (doc, returnedDoc) => {
        returnedDoc.id = returnedDoc._id,
        delete returnedDoc.__v
        delete returnedDoc._id
        return returnedDoc
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog