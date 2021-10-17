const bcrypt = require("bcryptjs");

function geners(userPassword,dbPassword){
    console.log("dbPassword: "+dbPassword);
	return new Promise(resolve => {
		setTimeout(async() => {
            console.log("comparando...");
            const palabraSecretaValida = await bcrypt.compare(userPassword, dbPassword);
            resolve(palabraSecretaValida);
            console.log("comparada... v: "+palabraSecretaValida);
		}, 1000);
	});
}

async function passwordChecker(userPassword,dbPassword) {
	let cllave='';
	console.log('calling');
	const result = await geners(userPassword,dbPassword);
	cllave=result;
	console.log('result:'+result);
	return cllave;
}
exports.passwordChecker = passwordChecker;
