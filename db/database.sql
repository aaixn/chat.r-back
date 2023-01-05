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
--     sender_id SERIAL NOT NULL REFERENCES users(id),
--     receiver_id SERIAL NOT NULL REFERENCES users(id),
--     content TEXT NOT NULL,
--     time_stamp TIMESTAMP NOT NULL DEFAULT now(),
--     read BOOLEAN
-- );

-- CREATE TABLE friend_requests (
--     id SERIAL NOT NULL PRIMARY KEY,
--     sender_id SERIAL NOT NULL REFERENCES users(id),
--     receiver_id SERIAL NOT NULL REFERENCES users(id)
-- );

-- INSERT INTO users (name, username, password, active) VALUES('tester1', 'test', 'test', true);
-- INSERT INTO users (name, username, password, active) VALUES('tester2', 'test2', 'test2', true);
-- INSERT INTO friend_requests (sender_id, receiver_id) VALUES(2, 1);
-- INSERT INTO messages (sender_id, receiver_id, content) VALUES(1, 5, 'hi buh');
