require('dotenv').config()
const PORT = process.env.PORT
let MONGO_URI = process.env.MONGO_URI
let TEST_MONGO_URI = process.env.TEST_MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET

if (process.env.NODE_ENV === 'test') {
    MONGO_URI = TEST_MONGO_URI
}

module.exports = {
    PORT,
    MONGO_URI,
    JWT_SECRET
}