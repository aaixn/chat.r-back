const express = require('express')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwtTokens = require('../utils/jwt')

// log in
router.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const users = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        
        // username check
        if (users.rows.length) {
            const id = users.rows[0].id
            const name = users.rows[0].name
            const username = users.rows[0].username
            const pfp = users.rows[0].pfp
            const bio = users.rows[0].bio
            const friends = users.rows[0].friends
            const checkPassword = await bcrypt.compare(password, users.rows[0].password)
            if (!checkPassword) {
                return res.status(401).json({error: 'Incorrect password.'})
            }
            else {
                const token = jwtTokens(users.rows[0])
                res.status(200).json({token, id, name, username, pfp, bio, friends})
            }
        }
        else {
            res.status(400).json({error: 'User does not exist.'})
        }
    } catch(err) {
        next(err)
        res.status(401).json({error: err.message})
    }
})

// router.get('/refresh_token', (req, res, next) => {
//     try {
//         const refreshToken = req.cookies.refresh_token
//         if (!refreshToken) return res.status(401).json({error: 'Null refresh token.'})
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//             if (err) return res.status(403).json({error: err.message})
//             let tokens = jwtTokens(user)
//             res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true});
//             return res.json(tokens)
//         })
//     } catch (err) {
//         next(err)
//         res.status(401).json({error: err.message})
//     }
// })

// // log out
// router.delete('/refresh_token', (req, res, next) => {
//     try {
//         res.clearCookie('refresh_token');
//         return res.status(200).json({message: 'Refresh token deleted.'})
//     } catch (err) {
//         next(err)
//         res.status(401).json({error: err.message})
//     }
// })

module.exports = router