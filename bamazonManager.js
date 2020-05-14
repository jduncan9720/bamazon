var mysql = require("mysql");
var inquirer = require("inquirer");
var option1 = "View Products for Sale";
var option2 = "View Low Inventory";
var option3 = "Add to Inventoru";
var option4 = "Add New Product";

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    managerOption();

});

function managerOption() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [option1, option2, option3, option4],
            name: "choice"
        },
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice == option1) {
            displayAll();
        } else if (inquirerResponse.choice == option2) {
            displayLow();
        } else if (inquirerResponse.choice == option3) {
            addInventory();
        } else if (inquirerResponse.choice == option4) {
            addItem();
        }
    });
}

function displayAll() {
    console.log("Updating...");
    connection.query("SELECT * FROM products",
        function (err, rows) {
            if (err) throw err;
            console.log("Current Inventory")
            console.log("--------------------------")
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].item_id, rows[i].product_name, rows[i].price, rows[i].stock_quantity);
            };
            console.log("--------------------------")

        }
    );
    setTimeout(restartQuery, 1000);
}

function displayLow() {
    console.log("Updating...");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, rows) {
            if (err) throw err;
            console.log("Low Inventory")
            console.log("--------------------------")
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].item_id, rows[i].product_name, rows[i].price, rows[i].stock_quantity);
            };
            console.log("--------------------------")

        }
    ); setTimeout(restartQuery, 1000);
};

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which item would you like to add inventory to?",
            name: "item_id"
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "amount"
        }
    ]).then(function (inquirerResponse) {
        var item = inquirerResponse.item_id;
        var amount = inquirerResponse.amount;
        var dbItem = connection.query("SELECT * FROM products WHERE item_id = ?",
            [item],
            function (err, response) {
                if (err) throw err;
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: parseInt(response[0].stock_quantity) + parseInt(amount)
                        },
                        {
                            item_id: item
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                )
                setTimeout(restartQuery, 1000);
            }
        )
    }
    );
}

function addItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product?",
            name: "name"
        },
        {
            type: "input",
            message: "What department does it belong in?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price?",
            name: "price"
        },
        {
            type: "input",
            message: "How many are there?",
            name: "amount"
        }

    ]).then(function (inquirerResponse) {
        var product = inquirerResponse.name;
        var department = inquirerResponse.department;
        var price = inquirerResponse.price;
        var quantity = inquirerResponse.amount;
        console.log(product, department, price, quantity)

        var query = connection.query(
            "INSERT INTO products SET ?",
            [
                {
                    product_name: product,
                    department_name: department,
                    price: price,
                    stock_quantity: quantity
                }
            ],
            function (err, res) {
                if (err) throw err;
            }
        );
        setTimeout(restartQuery, 1000);
    }
    );

}

function restartQuery() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to pick another option?",
            choices: ["YES", "NO"],
            name: "choice"
        },
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice == "YES") {
            managerOption()
        } else {
            console.log("Have a good day!");
        }
    });
}