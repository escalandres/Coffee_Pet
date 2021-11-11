function dividirCadena(cadenaADividir,separador) {
	var arrayDeCadenas = cadenaADividir.split(separador);
    let a=arrayDeCadenas[0]
    let b=arrayDeCadenas[1];
    console.log("Name: "+a);
    console.log(" Apellido: "+b);
    return arrayDeCadenas;
}

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

module.exports={
    dividirCadena: dividirCadena,
    toDate: toDate
}