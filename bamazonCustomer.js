var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "yourRootPassword",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  startDisplay();
  displayItemsChosen();
});

function displayItemsChosen() {
  inquirer
    .prompt({
      name: "items",
      message: "What is the item_id of product you would like to search?"
    })

    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE item_id = ?",[answer.items] ,function(err,response) {
        for (var i = 0; i < response.length; i++) {
          console.log(response[i].product_name);
          console.log("Item id is  "+ response[i].item_id);
        console.log(response[i].price);
        console.log(response[i].stock_quanity);
        }
      });
    });
}

function startDisplay() {
  inquirer
    .prompt({
      name: "start",
      message: "Are you ready to check out this awesome CLI app?",
      type: "Boolean"
    })

    .then(function(answer) {
      var query = "SELECT * FROM products";

      connection.query(query, [answer.start], function(err, response) {
        for (var i = 0; i < response.length; i++) {
         // console.log(response[i].product_name);
         // console.log(response[i].item_id);
        }
      });
    });
}
