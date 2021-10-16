function mostrarContrasena(){
    var pass = document.getElementById("password");
    if(pass.type == "password"){
        pass.type = "text";
    }else{
        pass.type = "password";
    }
}
function mostrarRepeat(){
    var tipo = document.getElementById("repeat");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}