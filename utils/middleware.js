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
    if (error.name === 'ValidationError') {
        res.status(400).json({error: error.message})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // grab only the jwt token sent in the authorization header
        request.token = authorization.substring(7)
    }
    next()
}

module.exports = {
    logger,
    errorHandler,
    tokenExtractor
}