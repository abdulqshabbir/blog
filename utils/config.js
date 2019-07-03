require('dotenv').config()

const PORT = process.env.PORT
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

module.exports = {
    PORT: PORT,
    MONGO_PASSWORD: MONGO_PASSWORD
}