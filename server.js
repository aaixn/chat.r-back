const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 4000
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: "true",
        optionsSuccessStatus: 200
    }
})

// middleware
app.use(cors({origin: '*', optionsSuccessStatus: 200}))
app.use(express.json())
app.use(cookieParser())

dotenv.config()

app.get('/', (req, res) => {
    res.send('Hey Po')
})

const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)

const authController = require('./controllers/authController')
app.use('/api/auth', authController)

const messageController = require('./controllers/messageController')
app.use('/api/messages', messageController)

const friendRequestsController = require('./controllers/friendRequestsController')
app.use('/api/friendRequest', friendRequestsController)

io.on('connection', (socket) => {
    // when connect
    console.log('a user connected');

    // socket.on('sendMessage', ({senderId, receiverId, content}) => {
    //     io.to(Zw_74Yqp7G3QqeA7AAAJ).emit('receiveMessage', {
    //         senderId,
    //         content
    //     })
    // })

    // when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})