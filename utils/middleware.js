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

const errorHandler = (error, request, response, next) => {
    console.error(error.message, 'hi there!!!!!!!!!!!!!!!!!!')

    if (error.name === 'ValidationError') {
        res.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    logger,
    errorHandler
}