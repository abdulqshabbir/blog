const app = require('./app')
const PORT = require('./utils/config').PORT

//------------------- SERVER -------------------//
app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}!`)
})