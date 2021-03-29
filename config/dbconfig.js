const mysql = require("mysql")

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: process.env.DBPORT
})

connection.connect(error => {
    if(error) throw error
    console.log(`Connected to database...!`)
})

module.exports = connection