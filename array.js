// let rese = new Array(2);
// for(let h=0; h<2; h++){
//     rese[h] = new Array(2);
// }
// rese[0][0]="S";
// rese[0][1]="A";
// rese[1][0]="M";
// rese[1][1]="T";

// for(let i=0;i<2;i++){
//     for(let j=0;j<2;j++){
//         console.log(rese[i][j]);
//     }
// }

let fechaHoy = new Date()
console.log(fechaHoy.toLocaleDateString())

let hoy = fechaHoy.toLocaleDateString()
let tiempo = fechaHoy.toLocaleTimeString()
if(hoy<="22/11/2021"){
    console.log("Falta")
}
else{
    console.log('Ya fue')
}
console.log(tiempo)
if(tiempo<"20:00:00"){
    let te = parseInt(tiempo)
    let resta = parseFloat('21:00:00');
    console.log(te-resta)
    if(te-resta<=-3){
		console.log("Si se puede");			
    }
    else{
        console.log("No se puede")
    }
    // if(tiempo)
}
else{
    console.log("No es tarde")
}


