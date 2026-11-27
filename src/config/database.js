const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'api_pokedex'
})

module.exports = db