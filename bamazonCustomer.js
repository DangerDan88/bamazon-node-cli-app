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
  console.log("connected as id " + connection.threadId);
  startQuestion();
});

function startQuestion() {
  inquirer
    .prompt({
      name: "start",
      message: "What is the id of the product you would like to buy?"
    })

    .then(function(answer) {
      var query = "SELECT products, item_id, FROM bamazon WHERE ?";
      connection.query(query, function(err, res) {
        console.log(res);
      });
    });
}
