const jwt = require('jsonwebtoken')

const jwtTokens = ({id, name, username, pfp, friends, active}) => {
    const user = {id, name, username, pfp, friends, active}
    const token = jwt.sign(user, process.env.TOKEN_SECRET)
    return(token)
}

module.exports = jwtTokens