# chat.r API
by Ana Nguyen

## Project Description
---
Chat.r is a live chat web application where users can add friends, see when their friends are active, and chat live with them. Chat.r utilizes bcrypt to hash passwords to keep passwords secure. It also utilizes JSON Web Tokens for stateless authentication. Chat.r also enables low-latency, bidirectional and event-based communication between the client and server through the usage of Socket.IO.  

## Technologies
---
- Node.js
- Express
- Postgres
- SQL
- socket.io (web sockets)
- jwt
- bcrypt

## Models
---
**USERS**

| Column | Description |
| --- | :---: |
|id|pk|
|username|unique username|
|password|hashed password utilizing bcrypy|
|name|name of user|
|bio|bio of user|
|friends| array of friends |
|active|whether a user is active on the app|
|pfp|image|

**MESSAGES**

| Column | Description |
| --- | :---: |
|id|pk|
|sender_id|fk refs USERS|
|receiver_id|fk refs USERS|
|content|message|
|time_stamp|time of creation|
|read| whether message was read or not |

**FRIEND REQUESTS**

| Column | Description |
| --- | :---: |
|id|pk|
|sender_id|fk refs USERS|
|receiver_id|fk refs USERS|

## Endpoints
---
**Auth Routes**
| Route | Method | Description |
| :---: | :---: | :---: |
| /login | POST | log user in |

**User Routes**
| Route | Method | Description |
| :---: | :---: | :---: |
| /signup | POST | sign up |
| / | GET | get all users |
| /:username | GET | get username profile |
| /search/:query | GET | get users by search |
| /:username/friends | GET | get all user's friends |
| /:username | PUT | edit user name, pfp, and/or bio |

**Message Routes**
| Route | Method | Description |
| :---: | :---: | :---: |
| /:senderUsername/:receiverUsername | GET | get all messages between two users |
| / | POST | send a message |

**Friend Request Routes**
| Route | Method | Description |
| :---: | :---: | :---: |
| /:username | GET | get all user's incoming friend requests |
| / | POST | send a friend request |
| / | PUT | accept a friend request |
| / | DELETE | decline a friend request |


## Installation Instructions
---
1. Set secret in ./env
    ```
    TOKEN_SECRET=XXXXX
    ```
2. Install dependencies
    ```
    npm i
    ```
3. Run server
    ```
    nodemon server.js
    ```

## User Stories
---
User stories
- AAU I want to be able to add new friends.
- AAU I want to see which of my friends are active.
- AAU I want to see the chat with my friends update live.
- AAU I want to be able to search my friends.
- AAU I want to view, accept, and decline friend requests

**(stretch)**
- AAU I want to be able to send photos in my chats.
- AAU I want to be able to use the app from my mobile device.
- AAU I want to be able to create group chats.
- AAU I want to be able to modify my account information and delete my account.
- AAU I want to be able to search my friends.
- AAU I want to see if my messages were read.
- AAU I want to be able to search my messages.
- AAU I want to be able to see how many unread messages I have.