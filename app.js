//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const config = require("./dbconfig");
const rest = new(require('rest-mssql-nodejs'))(config);
const sql = require('mssql')
const port = 3000;
// setTimeout(async()=>{
//   const resultado = await rest.executeQuery('select * from customers');
  
//   console.log(resultado);
// },1);

var  executeQuery = function(res, query){
	var connection =  new  sql.ConnectionPool(config);
	connection.connect(function(err) {
    // ...
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request(connection);
			// query to the database
			request.query(query, function (err, recordset) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
          console.log(recordset);
					res.send(recordset);
				}
			});
		}
	});
}
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  var query1 = "select * from customers";
  // var query = "insert into customers(id,nombre,apellido,edad) values (5,'John','Smith',23)";
  // executeQuery (res , query);
  executeQuery (res , query1);
});
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
  