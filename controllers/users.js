const express = require('express')
const pool = require('../db/db')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json({users: users.rows})
    } catch (err) {
        next(err)
    }
})


module.exports = router