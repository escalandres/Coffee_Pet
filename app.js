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
const cookieCheck = require("./cookieChecker");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const prueba = require("./consultasDB");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const cookieSession = require('cookie-session');
let resultIDs;
let numIDs=0;
let key = process.env.CLIENT_SECRET;
let logAdmin = false;
let sessionAdmin = 0;


app.use(cookieParser());
app.use(cookieSession({
	secret: 'Coffee Pet',
	maxAge: 24*60*60*1000
}));

app.use(session({
    secret: 'Coffee Pet',
    resave: false,
	maxAge: 24*60*60*1000,
    saveUninitialized: true,
	cookie: { secure: true }
}))

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

app.get("/", function(req, res){
	res.render("pages/index");
	// let cookieExist = cookieCheck.cookieChecker("user");
	// console.log(cookieExist);
	// console.dir(req.cookies.user.email);
	// console.dir(req.cookies.user.password);
	// console.dir(req.cookies.user.id);
});

app.get("/home", function(req, res){
	res.render("pages/home",{Name: req.cookies.user.email});
	// let cookieExist = cookieCheck.cookieChecker("user");
	// console.log(cookieExist);
	// console.dir(req.cookies.user.email);
	// console.dir(req.cookies.user.password);
	// console.dir(req.cookies.user.id);
});

app.get("/login",function(req,res){
	if(req.cookies.user===undefined){
		res.render("pages/login");
	}
	else{
		res.redirect("perfil");
	}
})

app.get("/registro",function(req,res){
	res.render("pages/registro");
})

app.get("/about",function(req,res){
	res.render("pages/about");
})

app.get("/uabout",function(req,res){
	res.render("pages/uabout",{Name: req.cookies.user.email});
})

app.get("/pets",function(req,res){
	res.render("pages/pets");
})

app.get("/upets",function(req,res){
	res.render("pages/upets",{Name: req.cookies.user.email});
})

app.get("/login-admin",function(req,res){
	res.render("pages/login-admin");
})

app.get("/logout-admin",function(req,res){
	logAdmin = false;
	sessionAdmin = 0;
	console.log("Sesion admin cerrada");
	res.redirect("/");
})

app.get("/logout",function(req,res){
	console.log("Sesion user cerrada");
	req.session = null;
	res.clearCookie('Coffee_Pet', { path: '/' });
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

app.get("/perfil",function(req,res){
	res.render("pages/perfil",{Name: req.cookies.user.email, username: req.cookies.user.email});
	// let userID = req.signedCookies;
	
	// setTimeout(async () => {
	// 	let result2 = await pool.request()
    //         .input('@ID', sql.Int, userID)
    //         .output('@NOmbre', sql.VarChar(50))
    //         .execute('obtenerNombreCliente')
        
    // console.dir(result2)
	// res.render("pages/perfil",{Username: result2});
	// }, 5000);
	
	
})

app.get("/error",function(req,res){
	res.render("pages/error");
})

app.post("/perfil",function(req,res){

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
			password: ''
		}
		password.hashGenerator(pass).then(hash => {
			newUser.password=''+hash;
		});
		// setTimeout(async () => {
		// 	console.log("Userpass: "+newUser.password)
		// }, 3000);
		consultIDs("Clientes");
		setTimeout(async () => {
			let id = numIDs;
			// console.log("new id: "+id);
			let n=39;
			let m = String.fromCharCode(n)
			executeQuery(res,'INSERT INTO dbo.Clientes(ID_Cliente,Nombre,ApellidoP) VALUES ('+id+','+m+newUser.name+m+','+m+newUser.lastname+m+')');
			console.log("new user registred in Clientes!");
			executeQuery(res,'INSERT INTO dbo.Usuarios(Email,_Password,ID_Cliente) VALUES ('+m+newUser.email+m+','+m+newUser.password+m+','+id+')');
			console.log("new user registred in Usuarios!");
			res.redirect("/");
		}, 10000);
	}	
	res.redirect("perfil");
	
})

app.post("/login", function(req,res){
	const pass = req.body.password;
	const email = req.body.email;
	let dbUserPassword;
	userEmail(email) // es una Promesa, podemos usar then() y cacth()
	.then(passwordRecovered => {
		// console.dir(`El id generado es: ${passwordRecovered}`);
		dbUserPassword = ''+passwordRecovered;
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
				// console.log("v: "+v);
				correctPassword=v;
			});
			setTimeout(async () => {
				if(correctPassword===true){
					console.log("Usuario verificado!");
					let userID;
					prueba.getUserID(email)
					.then(result => {
						// console.dir(result)
						// console.log("result: "+result);
						userID = result.output.ID;
						// console.log("UserIID: "+userID);
					}).catch(err => {
						// ... error checks
					})
					setTimeout(async () => {
						
						console.log("userIDI: "+userID)
						res.cookie('user',{email:""+email, password:""+pass, id: userID},{expire : new Date() + 9999},{ signed: true });
						console.log("Cookie creada!");
						res.redirect("perfil");
					}, 3000);
					
					// const user = {
					// 	email: email,
					// 	password: pass
					// }
					// console.log(req.session);
					// req.session.user = user;
				}
				else{
					console.log("La contrasena es incorrecta!");
					res.redirect("login");
				}
			}, 4000);
		}
		
	}, 11000);
	
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

app.post("/perfil", function(req,res){
	const userInfo = {
		celular: req.body.celular,
		nacimiento: req.body.nacimiento
	}
	const direccionUsuario = {
		calle: req.body.calle,
		numInt: req.body.numInt,
		numExt: req.body.numExt,
		colonia: req.body.colonia,
		alcaldia: req.body.alcaldia,
		estado: req.body.estado
	}
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
	
});
