var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
    itemQuery();
});

function displayProducts (){
    connection.query("SELECT * FROM products"),
        function(err,res) {
            if(err) throw err;
            console.log(res)
        } 
};
 
function itemQuery() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the item",
            name: "item_id"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "amount"
        }
    ]).then(function (inquirerResponse) {
        var item = inquirerResponse.item_id;
        var amount = inquirerResponse.amount;
        console.log(item,amount)
    })

}