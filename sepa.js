// let cadenaADividir = "Andres Rafael Escala Acosta";
// let separador = " ";
// var arrayDeCadenas = cadenaADividir.split(separador);
//     let a=arrayDeCadenas[0]
//     let b=arrayDeCadenas[2];
//     console.log("Name: "+a+", "+arrayDeCadenas[1]);
//     console.log(" Apellido: "+b+", "+arrayDeCadenas[3]);
//     return arrayDeCadenas;
const opciones = require("./opciones");
let horaAsistencia = new Date();
// let horaActual = horaAsistencia.toLocaleTimeString();
let horaActual = ""+horaAsistencia.getHours().toString()+':'+horaAsistencia.getMinutes().toString();
console.log(horaActual);
console.log(typeof(horaActual))
var b = opciones.toDate(horaActual,"hh:mm");
console.log('hora: '+b.getHours().toString()+':'+b.getMinutes().toString());
