const express = require('express')
const pool = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')
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
        const usernameExists = await pool.query('SELECT * FROM users WHERE username=$1', [req.body.username])
        // console.log(usernameExists.rows[0]);
        if (usernameExists.rows[0]) {
            res.json('Username taken.')
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await pool.query(
            'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *', 
            [req.body.name, req.body.username, hashPassword])
            res.json({users: newUser.rows[0]})
        }
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

// get users by search
router.get('/search/:query', authToken, async (req, res, next) => {
    try {
        const {query} = req.params
        const matching = await pool.query('SELECT * FROM users WHERE username LIKE "$1%"', [query])
        res.json(matching.rows)
    } catch(err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

// get user friends
router.get('/:username/friends', authToken, async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])

        const searchFriend = async (id) => {
            return await pool.query(`SELECT * FROM users WHERE id=${id}`)
        }

        const friends = await Promise.all(await user.rows[0].friends.map(async (id) => {
            const result = await searchFriend(id)
            return result.rows
        }))
        console.log(...friends);
        res.json(friends)
    } catch (err) {
        next(err)
        res.status(500).json({error : err.message})
    }
})

router.put('/:username/addFriend', authToken, async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        const friends = [...user.rows[0].friends, req.body.id]
        const editUser = await pool.query('UPDATE users SET friends=$1 WHERE username=$2 RETURNING *', [friends, username])
        res.json(editUser.rows)
    } catch (err) {
        next(err)
    }
})

// edit pfp
router.put('/:username', authToken, async (req, res, next) => {
    try {
        const {name, pfp, bio} = req.body
        const username = req.params.username
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        const editUser = await pool.query('UPDATE users SET name=$1, pfp=$2, bio=$3 RETURNING *', [name, pfp, bio])
        res.json(editUser.rows)
    } catch (err) {
        next(err)
    }
})

module.exports = router