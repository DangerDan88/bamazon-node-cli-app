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
  startQuestion();
  // displayItemsChosen();
});

function startQuestion() {
  inquirer
    .prompt({
      name: "start",
      message: "Are you ready to check out this awesome CLI app?"
    })

    .then(function(answer) {
      startDisplay(answer);
    });
}

function displayItemsChosen() {
  inquirer
    .prompt({
      name: "items",
      message: "What is the item_id of product you would like to search?"
    })

    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        [answer.items],
        function(err, response) {
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].product_name);
            console.log("Item id is  " + response[i].item_id);
            console.log("Price of item  " + "$" + response[i].price);
            console.log("Stock quanity  " + response[i].stock_quanity);
          }
        }
      );
    });
}

function startDisplay(answer) {
  var query = "SELECT * FROM products";
  connection.query(query, [answer.start], function(err, response) {
    console.log("Here are the items available.!");
    for (var i = 0; i < response.length; i++) {
      console.log(response[i].product_name);
      console.log(response[i].item_id);
    }
  });
}
