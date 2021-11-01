function show(clase,requerido){
    var my_class = document.getElementsByClassName(clase);
    var count = my_class.length;
    var my_class1 = document.getElementsByClassName(requerido);
    for(i=0;i<count;i++){
        my_class[i].classList.remove("ocultar");
        my_class1[i].setAttribute("required",true);
    }
}
// function poner() {
//     $('#myTest').prop("required", true);
// }
// function quitar() {
//     $('#myTest').removeAttr("required");
// }

function ocultar(clase,requerido){
    var my_class = document.getElementsByClassName(clase);
    var count = my_class.length;
    var my_class1 = document.getElementsByClassName(requerido);
    for(i=0;i<count;i++){
        my_class[i].classList.add("ocultar");
        my_class1[i].removeAttribute("required");
    }
}

function formulario(){
    let opcion = document.querySelector('input[name="tipo-reservacion"]:checked').value;
    if(opcion === "mesa"){
        ocultar("paseo-option","paseo-required")
        show("mesa-option","mesa-required")
    }
    else if(opcion === "paseo"){
        ocultar("mesa-option","mesa-required")
        show("paseo-option","paseo-required")
    }
    else{
        alert("Error");
    }
}