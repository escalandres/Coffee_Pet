//jshint esversion:6
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const config = require("./dbconfig");
const sql = require('mssql')
const port = 3001;
const admin = require("./adminconfig");
const fs = require("fs");
const password = require("./passwordGenerator");
const passwCheck = require("./passwordCheck");
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
	try {
		res.render("pages/home",{Name: req.cookies.user.email});
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
});

app.get("/login",function(req,res){
	try {
		if(req.cookies.user===undefined){
			res.render("pages/login");
		}
		else{
			res.redirect("perfil");
		}
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/registro",function(req,res){
	try {
		res.render("pages/registro");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/about",function(req,res){
	try {
		res.render("pages/about");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/uabout",function(req,res){
	try {
		res.render("pages/uabout",{Name: req.cookies.user.email});
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/pets",function(req,res){
	try {
		res.render("pages/pets");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/upets",function(req,res){
	try {
		res.render("pages/upets",{Name: req.cookies.user.email});
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/reservacion",function(req,res){
	try {
		res.render("pages/reservacion",{Name: req.cookies.user.email});
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})


app.get("/login-admin",function(req,res){
	try {
		res.render("pages/login-admin");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/logout-admin",function(req,res){
	try {
		logAdmin = false;
		sessionAdmin = 0;
		console.log("Sesion admin cerrada");
		res.redirect("/");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/logout",function(req,res){
	try {
		console.log("Sesion user cerrada");
		req.session = null;
		res.clearCookie('user', { path: '/' });
		res.redirect("/");
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/admin",function(req,res){
	try {
		if(logAdmin === true && sessionAdmin === 0){
			res.render("pages/admin");
			sessionAdmin = 1;
		}
		else{
			res.redirect("error");
		}
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
})

app.get("/perfil",function(req,res){
	try {
		if(req.cookies.user === undefined){
			// console.log("Error fn");
			// res.render("pages/perfil",{Name: 'Invalido', username: 'Invalido', Pconfianza: 'Invalido',Nombre: 'Invalido', ApellidoP: 'Invalido', ApellidoM: 'Invalido', Celular: 'Invalido', Fnacimiento: '01-01-1999'});
			// res.redirect("error");
		}
		else{
			const cliente = {
				pconfianza: 0,
				nombre: '',
				apellidop: '',
				apellidom: '',
				celular: 0,
				fnacimiento: 1999-01-01
			}
			const direccion = {
				calle: '',
				colonia: '',
				ne: '',
				ni: '',
				estado: '',
				alcaldia: ''
			}
			console.log("vamos");
			prueba.Regresar_DatosCliente(req.cookies.user.id)
				.then(result => {
					console.dir(result)
					cliente.pconfianza = result.output.pconfianza;
					cliente.nombre = result.output.nombre;
					cliente.apellidop = result.output.apellidop;
					cliente.apellidom = result.output.apellidom;
					cliente.celular = result.output.celular;
					cliente.fnacimiento = result.output.fnacimiento;
				}).catch(err => {
					// ... error checks
				})
			prueba.Regresar_Direccion_Cliente(req.cookies.user.id)
			.then(result => {
				console.dir(result)
				direccion.estado = result.output.estado;
				direccion.alcaldia = result.output.municipio;
				direccion.calle = result.output.calle;
				direccion.colonia = result.output.colonia;
				direccion.ne = result.output.ne;
				direccion.ni = result.output.ni;
				
			}).catch(err => {
				// ... error checks
			})
			
			
			setTimeout(async () =>{
				let fechan = new Date(Date.parse(cliente.fnacimiento));
				console.log(fechan)
				res.render("pages/perfil",{Name: req.cookies.user.email, username: req.cookies.user.email,
					Pconfianza: cliente.pconfianza,Nombre: cliente.nombre, ApellidoP: cliente.apellidop, 
					ApellidoM: cliente.apellidom, Celular: cliente.celular, Fnacimiento: fechan,Calle: direccion.calle,
				Colonia: direccion.colonia, NE: direccion.ne, NI: direccion.ni});
			},3000)
		}
	} catch (err) {
		console.log(err.message);
		res.redirect("error");
	}
	
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

app.get("/eliminar-cuenta",function(req,res){
	res.render("pages/eliminar-cuenta");
})

app.get("/error",function(req,res){
	res.render("pages/error");
})

app.post("/eliminar-cuenta",function(req,res){
	prueba.Eliminar_Usuario(req.cookies.user.id);
	setTimeout(async()=>{
		console.log("Usuario eliminado!");
		res.redirect("logout");
	},4000);
})

function dividirCadena(cadenaADividir,separador) {
	var arrayDeCadenas = cadenaADividir.split(separador);
    let a=arrayDeCadenas[0]
    let b=arrayDeCadenas[1];
    console.log("Name: "+a);
    console.log(" Apellido: "+b);
	return arrayDeCadenas;
}

app.post("/registro", function(req,res){
	let pass = req.body.password;
	let repeat = req.body.repeat;
	let userID;
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
		let apellidos = dividirCadena(newUser.lastname, " ");
		password.hashGenerator(pass).then(hash => {
			newUser.password=''+hash;
		});
		setTimeout(async() =>{
			prueba.Agregar_Usuario(newUser.email,newUser.password,newUser.name, apellidos[0], apellidos[1])
			.then(result => {
				console.log("Usuario agregado con exito!");
			}).catch(err => {
				// ... error checks
				console.log("Error al agregar usuario!");
			},2000);
			setTimeout(async()=>{
				
				prueba.Regresar_IDUsuario(newUser.email)
				.then(result => {
					userID = result.output.id;
				}).catch(err => {
					// ... error checks
				})
				setTimeout(async () => {
					res.cookie('user',{email:""+newUser.email, password:""+pass, id: userID},{expire : new Date() + 9999},{ signed: true });
					console.log("Cookie creada!");
					res.redirect("perfil");
				}, 4000);
			},4000)
		},2000)
		
		
	}	
	
})

app.post("/login", function(req,res){
	const pass = req.body.password;
	const email = req.body.email;
	let dbUserPassword;
	prueba.Validar_Usuario(email) // es una Promesa, podemos usar then() y cacth()
	.then(passwordRecovered => {
		// console.dir(`El id generado es: ${passwordRecovered}`);
		dbUserPassword = ''+passwordRecovered.output.ContraEn;
		// console.log(dbUserPassword);
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
					prueba.Regresar_IDUsuario(email)
					.then(result => {
						// console.dir(result)
						// console.log("result: "+result);
						userID = result.output.id;
						// console.log("UserIID: "+userID);
					}).catch(err => {
						// ... error checks
					})
					setTimeout(async () => {
						
						
						res.cookie('user',{email:""+email, password:""+pass, id: userID},{expire : new Date() + 9999},{ signed: true });
						console.log("Cookie creada!");
						// console.log(req.cookies.user)
						res.redirect("perfil");
					}, 4000);
					
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
		alcaldia: req.body.alcaldiaChoice,
		estado: req.body.estadoChoice
	}
	console.log(direccionUsuario.estado);
	console.log(direccionUsuario.alcaldia);
	console.log("e: "+direccionUsuario.estado+" a: "+direccionUsuario.alcaldia)
	prueba.ActualizarDatos_Cliente(req.cookies.user.id,direccionUsuario.estado,direccionUsuario.alcaldia,direccionUsuario.colonia,direccionUsuario.calle,direccionUsuario.numExt,direccionUsuario.numInt,userInfo.celular,userInfo.nacimiento,0)
	setTimeout(async()=>{
		res.redirect("perfil");
	},3000)
})

function toDate(dStr,format) {
	var now = new Date();
	if (format == "hh:mm") {
 		now.setHours(dStr.substr(0,dStr.indexOf(":")));
 		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
 		now.setSeconds(0);
 		return now;
    }// }else 
	// 	return "Invalid Format";
}

app.post("/reservacion", function(req,res){
	let tipoReservacion = req.body.tipoReservacion;
	const reservacion = {
		fechaReservacion: req.body.fechaReservacion,
		mascota: req.body.mascotaChoice,
		tipo: 0,
		horaInicio: '',
		horaFin: '',
		numPersonas: req.body.numPersonas,
		mesa: req.body.numMesa
	}
	reservacion.numPersonas = parseInt(reservacion.numPersonas)
	reservacion.mesa = parseInt(reservacion.mesa)
	console.log(tipoReservacion);
	if(tipoReservacion=="mesa"){
		reservacion.tipo = 0;
		reservacion.horaInicio = req.body.hLlegada;
		reservacion.horaFin = req.body.hSalida;
	}
	else{
		reservacion.tipo = 1;
		reservacion.horaInicio = req.body.hRecogida;
		reservacion.horaFin = req.body.hEntregada;
	}

	console.log(reservacion.horaInicio);
	console.log(typeof(reservacion.horaInicio));
	var b = toDate(reservacion.horaInicio,"hh:mm");
	var c = toDate(reservacion.horaFin,"hh:mm")
	console.log(b.getHours()+b.getMinutes());
	// var x=new Date(b.getHours(),b.getMinutes());
	// console.log('x: '+x);
	console.log('hora: '+b.getHours().toString()+':'+b.getMinutes().toString());
	console.log('Thora: '+b.toTimeString());
	console.log(c);
	// console.log(typeof(b))


	let fechaExpedicion = new Date();
	console.log("fecha: "+fechaExpedicion.toLocaleString());
	let idMascota;
	prueba.Regresar_IDMascota(reservacion.mascota)
	.then(id=> {
		idMascota = ''+id.output.id;
		console.log("idMascota: "+idMascota);
	})
	.catch(error => {
		console.log(`Hubo un error`);
	});
	setTimeout(async()=>{
		prueba.Agregar_Reservacion(1,req.cookies.user.id,idMascota,reservacion.mesa,reservacion.tipo,fechaExpedicion,reservacion.fechaReservacion,b,c,reservacion.numPersonas);
		console.log("Reservacion Agregada!");
	},2000);
	
	
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
	
});
