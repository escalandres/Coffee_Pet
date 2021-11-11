const bcrypt = require("bcryptjs");

function geners(userPassword,dbPassword){
    console.log("dbPassword: "+dbPassword);
	return new Promise(resolve => {
		setTimeout(async() => {
            // console.log("comparando...");
            const palabraSecretaValida = await bcrypt.compare(userPassword, dbPassword);
            resolve(palabraSecretaValida);
            // console.log("comparada... v: "+palabraSecretaValida);
		}, 1000);
	});
}

async function passwordChecker(userPassword,dbPassword) {
	let cllave='';
	// console.log('calling');
	const result = await geners(userPassword,dbPassword);
	cllave=result;
	// console.log('result:'+result);
	return cllave;
}

function geners1(pass){
	return new Promise(resolve => {
		setTimeout(async() => {
			const palabraSecretaTextoPlano = ''+pass;
			const rondasDeSal = 10;
			const palabraSecretaEncriptada = await bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal);
			// console.log("palabra: "+palabraSecretaEncriptada);
			resolve(''+palabraSecretaEncriptada);
		}, 1000);
	});
}

async function hashGenerator(pass) {
	let cllave='';
	// console.log('calling');
	const result = await geners1(pass);
	cllave=result;
	console.log(result);
	return cllave;
}

module.exports = {
	hashGenerator: hashGenerator,
	passwordChecker: passwordChecker
}

