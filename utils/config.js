require('dotenv').config()

const PORT = process.env.PORT
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_URI = `mongodb+srv://fullstack:${MONGO_PASSWORD}@phonebook-ajaa7.mongodb.net/test?retryWrites=true&w=majority`
module.exports = {
    PORT,
    MONGO_URI
}