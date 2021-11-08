function dividirCadena(cadenaADividir,separador) {
	var arrayDeCadenas = cadenaADividir.split(separador);
    let a=arrayDeCadenas[0]
    let b=arrayDeCadenas[1];
    console.log("Name: "+a);
    console.log(" Apellido: "+b);
    return arrayDeCadenas;
}

let elementos = dividirCadena("Andres Escala", " ");
console.log("A: "+elementos[0]);
console.log("B: "+elementos[1]);