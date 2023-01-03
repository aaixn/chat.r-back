const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwtTokens = require('../utils/jwt')
const authToken = require('../middleware/auth')

router.get('/', authToken, async (req, res, next) => {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json({users: users.rows})
    } catch (err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

// sign up
router.post('/signup', async (req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await pool.query(
            'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *', 
            [req.body.name, req.body.username, hashPassword])
        res.json({users: newUser.rows[0]})
    } catch (err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

// get user profile
router.get('/:username', authToken, async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        res.json(user.rows[0])
    } catch (err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

// get user friends
router.get('/:username/friends', authToken, async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        res.json(user.rows[0].friends)
    } catch (err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

module.exports = router