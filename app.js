//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const config = require("./dbconfig");
// const rest = new(require('rest-mssql-nodejs'))(config);
const sql = require('mssql')
const port = 3001;
const admin = require("./adminconfig");
let logAdmin = 0;
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
					connection.close();
				}
			});
		}
	});
}

//  var query1 = "select * from customers";
//  var query2 = "insert into customers(id,nombre,apellido,edad) values (5,'John','Smith',23)";
//  var query3 = "insert into products(id,nombre,precio) values (1000,'Guante',23)";
//  var query4 = "delete from customers where id=5";
// 	var query5 = "update customers set edad = 32 where id=5";
// executeQuery (res , query);
//   executeQuery (res , query4);
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("pages/index");
});

app.get("/login",function(req,res){
	res.render("pages/login");
})

app.get("/registro",function(req,res){
	res.render("pages/registro");
})

app.get("/about",function(req,res){
	res.render("pages/about");
})

app.get("/pets",function(req,res){
	res.render("pages/pets");
})

app.get("/login-admin",function(req,res){
	res.render("pages/login-admin");
})

app.get("/logout",function(req,res){
	logAdmin = 0;
	console.log("Sesion admin cerrada");
	res.redirect("/");
})

app.get("/admin",function(req,res){
	if(logAdmin === 1){
		res.render("pages/admin");
	}
	else{
		res.redirect("error");
	}
	
})


app.get("/error",function(req,res){
	res.render("pages/error");
})

app.post("/login-admin", function(req, res){

	const user = {
		username: req.body.username,
		password: req.body.password,
		key: req.body.key
	};
	if(user.username === admin.username && user.password === admin.password && user.key === admin.key){
		console.log("Si se pudo");
		logAdmin = 1;
		res.redirect("admin");
	}
	else{
		res.redirect("error");
	}
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
	
});
