var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: ""
});

connection.connect(function (err) {
    if (err) throw err;
    yearsBetween();
});