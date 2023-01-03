const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const authToken = require('../middleware/auth')

// get convo between two users
router.get('/', authToken, async (req, res, next) => {
    try {
        const {sender_id, receiver_id} = req.body
        const chat = await pool.query('SELECT * FROM users WHERE sender_id=$1 AND receiver_id=$2', [sender_id, receiver_id])
        res.json(chat)
    } catch (err) {
        next(err)
        res.status(500).json({error: err.message})
    }
})

// send a message
router.post('/', authToken, async (req, res, next) => {
    try {
        const {sender_id, receiver_id, content} = req.body
        const message = await pool.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)', [sender_id, receiver_id, content])
        res.json(message)
    } catch (err) {
        next(err)
        res.status(500).json({error: err.message})
    }
})

module.exports = router