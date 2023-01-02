const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3000
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()

app.get('/', (req, res) => {
    res.send('Hey Po')
})

const usersController = require('./controllers/users')
app.use('/api/users', usersController)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})