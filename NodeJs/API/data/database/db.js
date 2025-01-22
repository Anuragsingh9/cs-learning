var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practice"
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log("DB connection established");
});

module.exports = connection;