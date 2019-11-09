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

});

function homePage() {
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    console.log("-----------------------------");
    console.log("      Welcome To Bamazon    ");
    console.log("-----------------------------");
    console.log("");
    console.log("Find below our Products List");
    for (var i = 0; i < response.length; i++) {
      console.log(response[i].product_name);
      console.log(response[i].item_id);
    }
  });
  shopping();
};

function shopping() {
  inquirer.prompt(
    {
      name: "productBuy",
      type: "input",
      message: "What is the item id of the product you would like to purchase?"
    }
  ).then(function(answer1) {
    var selection = answer1.productBuy;
    connection.query(
      "SELECT * FROM products WHERE item_id=?",
      selection,
      function(err, response) {
        if (err) throw err;
        if (response.length === 0) {
          console.log(
            "That Product doesn't exist, Please enter a Product Id from the list above"
          );

          shopping();
        } 
      }
    );
  });
}
homePage();
