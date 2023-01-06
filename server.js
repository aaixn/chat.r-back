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
        origin: ['https://chat-r.vercel.app', 'http://localhost:3000'],
        credentials: "true"
    }
})

// middleware
app.use(cors({origin: ['https://chat-r.vercel.app', 'http://localhost:3000'], credentials: 'true'}))
app.use(express.json())
app.use(cookieParser())

server.on('clientError', (err, socket) => {
    console.error(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

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

// socket

let users = []

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const addUser = (userId, socketId) => {
    !users.some(user=>user.id === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on('connection', (socket) => {
    // when connect
    console.log('a user connected');
    
    //take userId and socketId from user
    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    // send and get message
    socket.on('sendMessage', ({senderId, receiverId, content}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('receiveMessage', 'hi'
        // {
        //     senderId,
        //     content
        // })
    )

    // when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id)
        io.emit('getUsers', users)
    })

})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})