//----------- USER SCHEMA AND MODEL ----------//

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String
})

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id
        delete returnedDocument._id
        delete returnedDocument.__v
        return returnedDocument
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User