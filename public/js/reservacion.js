let ocultar1 = function(){
    var my_class = document.getElementsByClassName("options");
    var count = my_class.length;
    for(i=0;i<count;i++){
        my_class[i].classList.add("ocultar");
    }
    
}

let show1 = function(a,b){
    var my_class = document.getElementsByClassName("options");
    // var count = my_class.length;
    for(i=a-1;i<b;i++){
        my_class[i].classList.remove("ocultar");
    }
}

function show(clase,requerido){
    var my_class = document.getElementsByClassName(clase);
    var count = my_class.length;
    var my_class1 = document.getElementsByClassName(requerido);
    for(i=0;i<count;i++){
        my_class[i].classList.remove("ocultar");
    }
    var count1 = my_class1.length;
    for(i=0;i<count1;i++){
        my_class1[i].setAttribute("required",true);
    }
}

function ocultar(clase,requerido){
    var my_class = document.getElementsByClassName(clase);
    var count = my_class.length;
    var my_class1 = document.getElementsByClassName(requerido);
    var count1 = my_class1.length;
    for(i=0;i<count1;i++){
        my_class1[i].removeAttribute("required");
    }
    for(i=0;i<count;i++){
        my_class[i].classList.add("ocultar");
        
    }
}

function ShowSelected(id)
{
/* Para obtener el valor */
var cod = document.getElementById(""+id).value;
// alert(cod);
return cod;
}

function ShowText(id){
    /* Para obtener el texto */
    var combo = document.getElementById(""+id);
    var selected = combo.options[combo.selectedIndex].text;
    // alert(selected);
    return selected;
}

function selectPet(){
    let mascotaText = ShowText("mascotas");
    let choice = document.getElementById("mascotaChoice");
    choice.value=""+mascotaText;
}

function selectMesa(){
    let mesaText = ShowText("hLlegada");
    let choice = document.getElementById("hchoice");
    choice.value=""+mesaText;
}

function selectNumPer(){
    let mnpText = ShowText("numPersonas");
    let choice = document.getElementById("numpChoice");
    choice.value=""+mnpText;
}

function formulario(){
    let opcion = document.querySelector('input[name="tipoReservacion"]:checked').value;
    // alert(opcion)
    if(opcion === "mesa"){
        ocultar("paseo-option","paseo-required")
        show("mesa-option","mesa-required")
    }
    else if(opcion === "paseo"){
        // alert("paseo si")
        ocultar("mesa-option","mesa-required")
        show("paseo-option","paseo-required")
    }
    else{
        alert("Error");
    }
}

let mesas = [1,4,5,8,9,12,13,16];
function showMesas(){
    let numper = ShowSelected("numPersonas");
    let numperText = ShowText("numPersonas");
    ocultar1();
    if(numper==1){
        //Aguascaliente
        show1(mesas[0],mesas[1]);
    }
    else if(numper==2){
        //Baja California
        show1(mesas[2],mesas[3]);
    }
    else if(numper==3){
        //Baja California Sur
        show1(mesas[4],mesas[5]);
    }
    else if(numper==4){
        //Campeche
        show1(mesas[6],mesas[7]);
    }
}