const logger = (req, res, next) => {
    console.log('__________________')
    console.log('------------------')
    console.log('Method: ', req.method)
    console.log('------------------')
    console.log('Path: ', req.path)
    console.log('------------------')
    console.log('Body: ', req.body)
    console.log('------------------')
    console.log('__________________')
    next()
}

module.exports = logger