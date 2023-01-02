const jwt = require('jsonwebtoken')

const jwtTokens = ({id, name, username, pfp, friends, active}) => {
    const user = {id, name, username, pfp, friends, active}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '14d'})
    return({accessToken, refreshToken})
}

module.exports = jwtTokens