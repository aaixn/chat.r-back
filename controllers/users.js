const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', async (req, res, next) => {
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

// log in
router.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const users = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        
        // username check
        if (users.rows.length) {
            const checkPassword = await bcrypt.compare(password, users.rows[0].password)
            if (!checkPassword) {
                return res.status(401).json({error: 'Incorrect password.'})
            }
            else {
                return res.status(200).json('Success!')
            }
        }
        else {
            res.status(400).json({error: 'User does not exist.'})
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router