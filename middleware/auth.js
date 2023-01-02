const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] // Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1]    // gets just token
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            err && res.status(403).json({error: err.message})
            req.user = user
            next()
        })
    } else return res.status(401).json({error: 'Null Token'})
}


module.exports = authToken