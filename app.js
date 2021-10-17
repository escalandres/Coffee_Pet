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
const password = require("./passwordGenerator");
const passwCheck = require("./passwordCheck");

let resultIDs;
let numIDs=0;
let key = process.env.CLIENT_SECRET;
// let app = express();
let logAdmin = false;
let sessionAdmin = 0;
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

function consultIDs(table){
	
	const queryID = 'SELECT * FROM '+table;
	consultQuery(queryID);
	setTimeout(async () => {
		numIDs = parseInt(resultIDs);
		console.log("numID: "+numIDs);
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
				}
				connection.close();
			});
		}
	});
}
let userEmail = async (email) => { // función tipo async devolverá una Promesa
	try {
		await sql.connect(config); // conectamos a la DB
		let db = new sql.Request();
		let n=39;
		let m = String.fromCharCode(n)
		console.log("email: "+email);
		let Email = "Select _Password from Usuarios where Email="+m+email+m+'';
		let result = await db.query(Email); // almacenamos el resultado de la Promesa
		console.log(result);
		let id = result.recordset[0]._Password; // Obtenemos el id
		return id; // devolvemos el resultado
	} catch (err) {
		console.log(err.message);
		throw err;
	}
}

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
	// setTimeout(async () => {
	// 	let id = numIDs;
	// 	console.log("new id: "+id);
	// 	executeQuery(res,'INSERT INTO dbo.Clientes(id,nombre,apellido) VALUES ('+id+','+newUser.name+','+newUser.lastname+')');
	// 	console.log("new user registred in Clientes!");
	// 	executeQuery(res,'INSERT INTO dbo.Usuarios(Email,_Password,ID_Cliente) VALUES ('+newUser.email+','+newUser.password+','+id+')');
	// 	console.log("new user registred in Usuarios!");
	// }, 8000);
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
			// password: generateHash(pass)
			password: ''
		}
		password.hashGenerator(pass).then(v => {
			console.log("v: "+v);  // prints 60 after 4 seconds.
			newUser.password=''+v;
		});
		setTimeout(async () => {
			console.log("Userpass: "+newUser.password)
		}, 3000);
		
		consultIDs("Clientes");
		setTimeout(async () => {
			let id = numIDs;
			console.log("new id: "+id);
			let n=39;
			let m = String.fromCharCode(n)
			executeQuery(res,'INSERT INTO dbo.Clientes(ID_Cliente,Nombre,ApellidoP) VALUES ('+id+','+m+newUser.name+m+','+m+newUser.lastname+m+')');
			console.log("new user registred in Clientes!");
			executeQuery(res,'INSERT INTO dbo.Usuarios(Email,_Password,ID_Cliente) VALUES ('+m+newUser.email+m+','+m+newUser.password+m+','+id+')');
			console.log("new user registred in Usuarios!");
			res.redirect("/");
		}, 10000);
	}
	
	
})

app.post("/login", function(req,res){
	const pass = req.body.password;
	const email = req.body.email;
	let dbUserPassword;
	userEmail(email) // es una Promesa, podemos usar then() y cacth()
	.then(id => {
		console.log(`El id generado es: ${id}`);
		dbUserPassword = ''+id;
	})
	.catch(error => {
		console.log(`Hubo un error`);
	});
	setTimeout(async () => {
		if(dbUserPassword===''){
			console.log("El usuario no existe!");
			res.redirect("login");
		}
		else{
			let correctPassword;
			passwCheck.passwordChecker(pass,dbUserPassword).then(v => {
				console.log("v: "+v);  // prints 60 after 4 seconds.
				correctPassword=v;
			});
			setTimeout(async () => {
				if(correctPassword===true){
					console.log("Usuario verificado!");
					res.redirect("/");
				}
				else{
					console.log("La contrasena es incorrecta!");
					res.redirect("login");
				}
			}, 3000);
		}
		
	}, 3000);
	
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
