const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')
const authToken = require('../middleware/auth')

// get convo between two users
router.get('/chat/:username', authToken, async (req, res, next) => {
    try {
        const chat = await pool.query('SELECT * FROM users WHERE username=$1', [username])
    } catch (err) {
        
    }
})

// send a message
router.post('/chat/:username', authToken, async (req, res, next) => {
    try {
        const chat = await pool.query('SELECT * FROM users WHERE username=$1', [username])
    } catch (err) {
        
    }
})