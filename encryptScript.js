const bcrypt = require("bcryptjs");

//Generate hash--------------------------------------------------------------------------
// Primero vamos a hashear la contraseña
const palabraSecretaTextoPlano = "hunter2";
// Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
const rondasDeSal = 10;

bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal, (err, palabraSecretaEncriptada) => {
	if (err) {
		console.log("Error hasheando:", err);
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
	}
});

//Export hash-----------------------------------------------------------------------------
function geners(){
	return new Promise(resolve => {
		setTimeout(async() => {
			const palabraSecretaTextoPlano = "hunter2";
			const rondasDeSal = 10;
			const palabraSecretaEncriptada = await bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal);
			console.log("palabra: "+palabraSecretaEncriptada);
			resolve(''+palabraSecretaEncriptada);
		}, 1000);
	});
}

async function asyncCall() {
	let cllave='';
	console.log('calling');
	const result = await geners();
	cllave=result;
	console.log(result);
	return cllave;
}
exports.asyncCall = asyncCall;

//Compare password and hash-----------------------------------------------------------------------------
let palabraSecretaProporcionadaPorUsuario="celia123";
let palabraSecretaHasheada="$2a$10$Utl/XedEb4116PFNDlVc2eCERnnhy1qnHaFKxtzO96xmroKBMW1L6";
bcrypt.compare(palabraSecretaProporcionadaPorUsuario, palabraSecretaHasheada, (err, coinciden) => {
	if (err) {
		console.log("Error comprobando:", err);
	} else {
		console.log("¿La contraseña coincide?: " + coinciden);
	}
});

//Generate hash using async and await----------------------------------------------------------------------------------
// Primero vamos a hashear la contraseña
const palabraSecretaTextoPlano = "hunter2";
// Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
const rondasDeSal = 10;
const palabraSecretaEncriptada = await bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal);

// Compare password and hash using async and await-------------------------------------------------------
// Recuperamos la contraseña de la petición
const palabraSecretaTextoPlano = "hunter2";
// Y la guardada en la base de datos
const palabraSecretaEncriptada = "$2a$10$P9yvh9ew5ZueNRjQGX4Eiui9jNhaKJCX24mRsrWSNvj.0O2FjNSB2";
// Comprobamos...
const palabraSecretaValida = await bcrypt.compare(palabraSecretaTextoPlano, palabraSecretaEncriptada);