const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const authToken = require('../middleware/auth')

// get all friend requests
router.get('/:username', authToken, async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        const friendRequests = await pool.query('SELECT * FROM friend_requests WHERE receiver_id=$1', [user.rows[0].id])
        res.json(friendRequests.rows)
    } catch(err) {
        next(err)
    }
})

// decline friend request
router.delete('/', authToken, async (req, res, next) => {
    try {
        const {id} = req.body
        const request = await pool.query('DELETE FROM friend_requests WHERE id=$1', [id])
        res.json(request.rows)
    } catch(err) {
        next(err)
    }
})

// accept friend request
router.put('/', authToken, async (req, res, next) => {
    try {
        const {id, sender_id, receiver_id} = req.body
        const friends = await pool.query('SELECT friends FROM users WHERE id=$1', [receiver_id])
        const newFriends = [...friends.rows[0].friends, sender_id]
        await pool.query('UPDATE users SET friends=$1 WHERE id=$2 RETURNING *', [newFriends, receiver_id])
        const request = await pool.query('DELETE FROM friend_requests WHERE id=$1', [id])
        
        res.json(request.rows)
    } catch(err) {
        next(err)
    }
})

module.exports = router