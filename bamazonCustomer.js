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
}

var shopping = function() {
  inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Please enter the Product Id of the item you wish to purchase.?!"
    })
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      connection.query(
        "SELECT * FROM products WHERE item_id=?",
        selection,
        function(err, res) {
          if (err) throw err;
          if (res.length === 0) {
            console.log(
              "That Product doesn't exist, Please enter a Product Id from the list above"
            );

            shopping();
          } else {
            inquirer
              .prompt({
                name: "quantity",
                type: "input",
                message: "How many items would you like to purchase?"
              })
              .then(function(answer2) {
                var quantity = answer2.quantity;
                if (quantity > res[0].stock_quanity) {
                  console.log(
                    "Our Apologies we only have " +
                      res[0].stock_quantity +
                      " items of the product selected"
                  );
                  shopping();
                } else {
                  console.log("");
                  console.log(res[0].product_name + " purchased");
                  console.log(quantity + " qty @ $" + res[0].price);

                  var newQuantity = res[0].stock_quanity - quantity;
                  connection.query(
                    "UPDATE products SET stock_quanity = ",
                    newQuantity,
                    " WHERE stock_quanity = " + res[0].item_id,
                    function(err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your Order has been Processed");
                      console.log("Thank you for Shopping with us...!");
                      console.log("");
                      // console.log(resUpdate);
                      connection.end();
                    }
                  );
                }
              });
          }
        }
      );
    });
};

homePage();
