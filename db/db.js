const Pool = require('pg').Pool

const localPoolConfig = {
    user: 'ananguyen',
    password: 'password',
    host: 'localhost',
    port: '5432',
    database: 'chatr'
}

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
} : localPoolConfig

const pool = new Pool(poolConfig)

module.exports = pool