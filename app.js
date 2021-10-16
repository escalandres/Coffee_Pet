//jshint esversion:6
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const config = require("./dbconfig");
// const rest = new(require('rest-mssql-nodejs'))(config);
const sql = require('mssql')
const port = 3001;
const admin = require("./adminconfig");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const rondasDeSal = 10;
function encryptHash(passwordClient){
	bcrypt.hash(passwordClient, rondasDeSal, (err, encryptPassword) => {
		if (err) {
			console.log("Error hasheando:", err);
		} else {
			console.log("Y hasheada es: " + encryptPassword);
			return encryptPassword;
		}
	});
	
}
let resultIDs;
let numIDs=0;
let key = process.env.CLIENT_SECRET;
// let app = express();
let logAdmin = false;
let sessionAdmin = 0;
// setTimeout(async()=>{
//   const resultado = await rest.executeQuery('select * from customers');
  
//   console.log(resultado);
// },1);
var  consultQuery = function(query){
	var connection =  new  sql.ConnectionPool(config);
	connection.connect(function(err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
		}
		else {
			var request = new sql.Request(connection);
			request.query(query, function (err, recordset) {
				if (err) {
					console.log("Error while querying database :- " + err);
				}
				else {
					console.log("Aqui vamosss");
					resultIDs = recordset.rowsAffected;
					console.log("resultID: "+resultIDs);
				}
				connection.close();
			});
		}
	});
}

function consultIDs(){
	
	const queryID = 'SELECT * FROM customers';
	consultQuery(queryID);
	setTimeout(async () => {
		numIDs = parseInt(resultIDs);
		console.log("numID: "+numIDs);
		// console.log(typeof numIDs);
		numIDs = numIDs+1000;
		console.log("numID2: "+numIDs);
    }, 3000);
}

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
					  resultIDs = recordset.rowsAffected;
					  console.log("Resultado: "+result);
					// res.send(recordset);
					
				}
				connection.close();
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

// https.createServer({
// 	cert: fs.readFileSync(''),
// 	key: fs.readFileSync('')
// },app).listen(port,function(){
// 	console.log('Servidor https corriendo')
// });

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("pages/index");
	// executeQuery (res , query1);
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
	logAdmin = false;
	sessionAdmin = 0;
	console.log("Sesion admin cerrada");
	res.redirect("/");
})

app.get("/admin",function(req,res){
	if(logAdmin === true && sessionAdmin === 0){
		res.render("pages/admin");
		sessionAdmin = 1;
	}
	else{
		res.redirect("error");
	}
	
})


app.get("/error",function(req,res){
	res.render("pages/error");
})

app.post("/registro", function(req,res){
	let pass = req.body.password;
	let repeat = req.body.repeat;
	if(pass !== repeat){
		res.redirect("registro");
	}
	else{
		const newUser = {
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			password: encryptHash(pass)
		}
		consultIDs();
		setTimeout(async () => {
			let id = numIDs;
			console.log("new id: "+id);
			executeQuery(res,'INSERT INTO dbo.Clientes(id,nombre,apellido) VALUES ('+id+','+newUser.name+','+newUser.lastname+')');
			console.log("new user registred in Clientes!");
			executeQuery(res,'INSERT INTO dbo.Usuarios(Email,_Password,ID_Cliente) VALUES ('+newUser.email+','+newUser.password+','+id+')');
			console.log("new user registred in Usuarios!");
		}, 8000);
	}
	
	
})

app.post("/login-admin", function(req, res){
	if(logAdmin === true){
		res.redirect("error");
	}
	else{
		const user = {
			username: req.body.username,
			password: req.body.password,
			key: req.body.key
		};
		if(user.username === admin.username && user.password === admin.password && user.key === admin.key){
			console.log("Si se pudo");
			logAdmin = true;
			res.redirect("admin");
		}
		else{
			res.redirect("error");
		}
	}
	
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
	
});
