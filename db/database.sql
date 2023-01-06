-- CREATE TABLE users (
--     id SERIAL NOT NULL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     password TEXT NOT NULL,
--     pfp TEXT NOT NULL DEFAULT 'https://i.imgur.com/igF2kHr.png',
--     friends INTEGER[] NOT NULL DEFAULT '{}'::int[],
--     bio VARCHAR(100),
--     active BOOLEAN
-- );

-- CREATE TABLE messages (
--     id SERIAL NOT NULL PRIMARY KEY,
--     sender_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     receiver_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     content TEXT NOT NULL,
--     time_stamp TIMESTAMP NOT NULL DEFAULT now(),
--     read BOOLEAN
-- );

-- CREATE TABLE friend_requests (
--     id SERIAL NOT NULL PRIMARY KEY,
--     sender_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     receiver_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- INSERT INTO friend_requests(sender_id, receiver_id) VALUES(3, 1);