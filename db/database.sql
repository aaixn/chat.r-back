-- CREATE TABLE users (
--     id SERIAL NOT NULL PRIMARY KEY,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(50) NOT NULL,
--     pfp TEXT NOT NULL DEFAULT 'https://i.imgur.com/igF2kHr.png',
--     friends INTEGER[],
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

-- INSERT INTO users (username, password, active) VALUES('test', 'test', true);