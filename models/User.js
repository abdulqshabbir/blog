//----------- USER SCHEMA AND MODEL ----------//

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        minlength: 3,
        unique: true
    },
    name: String,
    hashedPassword: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id
        delete returnedDocument._id
        delete returnedDocument.__v
        delete returnedDocument.hashedPassword
        return returnedDocument
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User