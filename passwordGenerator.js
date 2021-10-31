const bcrypt = require("bcryptjs");
function geners(pass){
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
	const result = await geners(pass);
	cllave=result;
	// console.log(result);
	return cllave;
}
exports.hashGenerator = hashGenerator;

