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

});

function displayProducts() {
    console.log("Updating...");
    connection.query("SELECT * FROM products",
        function (err, rows) {
            if (err) throw err;
            console.log("GREAT STUFF FOR SALE!!")
            console.log("--------------------------")
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].item_id, rows[i].product_name, rows[i].price);
            };
            console.log("--------------------------")
            itemQuery();
        }
    )
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
        var dbItem = connection.query("SELECT * FROM products WHERE item_id = ?",
            [item], 
            function(err, response){
                // console.log(response)
                if (err) throw err;
                if(amount <= response[0].stock_quantity){ 
                    console.log("Great we'll send it.")
                } else {
                    console.log("Out of Stock!")
                }
            }
        );
    
})}
        


