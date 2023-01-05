const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const authToken = require('../middleware/auth')

// get convo between two users
router.get('/:senderUsername/:receiverUsername', authToken, async (req, res, next) => {
    try {
        const {senderUsername, receiverUsername} = req.params
        const senderId = await pool.query('SELECT id FROM users WHERE username=$1', [senderUsername])
        const receiverId = await pool.query('SELECT id FROM users WHERE username=$1', [receiverUsername])
        const chat = await pool.query('SELECT * FROM messages WHERE sender_id=$1 AND receiver_id=$2 OR sender_id=$2 AND receiver_id=$1', [senderId.rows[0].id, receiverId.rows[0].id])
        res.json(chat.rows)
    } catch (err) {
        next(err)
        res.status(500).json({error: err.message})
    }
})

// send a message
router.post('/', authToken, async (req, res, next) => {
    try {
        const {senderUsername, receiverUsername, content} = req.body
        const senderId = await pool.query('SELECT id FROM users WHERE username=$1', [senderUsername])
        const receiverId = await pool.query('SELECT id FROM users WHERE username=$1', [receiverUsername])
        const message = await pool.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)', [senderId, receiverId, content])
        res.json(message)
    } catch (err) {
        next(err)
        res.status(500).json({error: err.message})
    }
})

module.exports = router