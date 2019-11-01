var mysql = require('mysql');
var inquirer = require('inquirer');


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

  });


  function startQuestion(){
      inquirer
      .prompt({
          name: "start",
          message: "What would you like to search?",
          choices: [

          ]
      })
  }
  