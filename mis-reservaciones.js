import * as myModule from './consultasDB';
import * as config from './dbconfig'
let Agregar_Tabla = function(){
    alert("Si");
    console.log(myModule.Mis_Reservaciones(req.cookies.user.id))
    let id=1,mascota="Marc",mesa=6,personas=2,servicio=0,fecha="21/11/2021",horainicio="10:30",horafinal="12:30";
    let _servicio
    if(servicio===0){
        _servicio="Cafeteria";
    }
    else{
        _servicio="Paseo";
    }
                //ID           Mascota             Mesa,          num personas          servicio local,         Fecha,      Hora inicio,        hora final, 
    var fila="<tr><td>"+id+"</td><td>"+mascota+"</td><td>"+mesa+"</td><td>"+personas+"</td><td>"+_servicio+"</td><td>"+fecha+"</td><td>"+horainicio+"</td><td>"+horafinal+"</td></tr>";

    var btn = document.createElement("TR");
   	btn.innerHTML=fila;
    document.getElementById("reservaciones").appendChild(btn);
}