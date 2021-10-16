const bcrypt = require("bcryptjs");
// Primero vamos a hashear la contraseña
const palabraSecretaTextoPlano = "celia123";
// Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
const rondasDeSal = 10;

bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal, (err, palabraSecretaEncriptada) => {
	if (err) {
		console.log("Error hasheando:", err);
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
	}
});