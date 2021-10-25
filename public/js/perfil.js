
const estadoSelect = document.getElementById("selectEstados");
const alcaldia = document.getElementById("alcaldia");
const Aguascalientes = [1,11], BajaCal = [12,16], BajaCalSur = [17,21], Campeche = [22,32], Coahuila = [33,70], Colima = [71,80];
const Chiapas = [81,198], Chihuahua = [199,265], CDMX = [266,281], Durango = [282,320], Guanajuato = [321,366], Guerrer = [367,447], Hidalgo = [448,531], Jalisco = [532,656];
const EDOMEX = [657,781], Michoacan = [782,894], Morelos = [895,927], Nayarit = [928,947], NL = [948,998], Oaxaca = [999,1568], Puebla = [1569,1785], Queretaro = [1786,1803], QR = [1804,1814], SLP = [1815,1872];
const Sinaloa = [1873,1890], Sonora = [1891,1962], Tabasco = [1963,1979], Tamaulipas = [1980,2022], Tlaxcala = [2023,2082], Veracruz = [2083,2294], Yucatan = [2295,2400], Zacatecas = [2401,2458];

let ocultar = function(){
    var my_class = document.getElementsByClassName("options");
    var count = my_class.length;
    for(i=0;i<count;i++){
        my_class[i].classList.add("ocultar");
    }
    
}

let show = function(a,b){
    var my_class = document.getElementsByClassName("options");
    // var count = my_class.length;
    for(i=a-1;i<b;i++){
        my_class[i].classList.remove("ocultar");
    }
}

function ShowText(id){
    /* Para obtener el texto */
    var combo = document.getElementById(""+id);
    var selected = combo.options[combo.selectedIndex].text;
    // alert(selected);
    return selected;
}
function ShowSelected(id)
{
/* Para obtener el valor */
var cod = document.getElementById(""+id).value;
// alert(cod);
return cod;
}

function selectAlcaldia(){
    let alcaldiaText = ShowText("alcaldia");
    let choice = document.getElementById("alcaldiaChoice");
    choice.innerHTML=""+alcaldiaText;
}

function showMunicipios(){
    let estado = ShowSelected("selectEstados");
    let estadoText = ShowText("selectEstados");
    let choice = document.getElementById("estadoChoice");
    choice.innerHTML=""+estadoText;
    ocultar();
    if(estado==1){
        //Aguascaliente
        show(Aguascalientes[0],Aguascalientes[1]);
    }
    else if(estado==2){
        //Baja California
        show(BajaCal[0],BajaCal[1]);
    }
    else if(estado==3){
        //Baja California Sur
        show(BajaCalSur[0],BajaCalSur[1]);
    }
    else if(estado==4){
        //Campeche
        show(Campeche[0],Campeche[1]);
    }
    else if(estado==5){
        //Coahuila
        show(Coahuila[0],Coahuila[1]);
    }
    else if(estado==6){
        //Colima
        show(Colima[0],Colima[1]);
    }
    else if(estado==7){
        //Chiapas
        show(Chiapas[0],Chiapas[1]);
    }
    else if(estado==8){
        //Chihuahua
        show(Chihuahua[0],Chihuahua[1]);
    }
    else if(estado==9){
        //CDMX
        show(CDMX[0],CDMX[1]);
    }
    else if(estado==10){
        //Durango
        show(Durango[0],Durango[1]);
    }
    else if(estado==11){
        //Guanajuato
        show(Guanajuato[0],Guanajuato[1]);
    }
    else if(estado==12){
        //Guerrero
        show(Guerrer[0],Guerrer[1]);
    }
    else if(estado==13){
        //Hidalgo
        show(Hidalgo[0],Hidalgo[1]);
    }
    else if(estado==14){
        //Jalisco
        show(Jalisco[0],Jalisco[1]);
    }
    else if(estado==15){
        //EdoMex
        show(EDOMEX[0],EDOMEX[1]);
    }
    else if(estado==16){
        //Michoacan
        show(Michoacan[0],Michoacan[1]);
    }
    else if(estado==17){
        //Morelos
        show(Morelos[0],Morelos[1]);
    }
    else if(estado==18){
        //Nayarit
        show(Nayarit[0],Nayarit[1]);
    }
    else if(estado==19){
        //NL
        show(NL[0],NL[1]);
    }
    else if(estado==20){
        //Oaxaca
        show(Oaxaca[0],Oaxaca[1]);
    }
    else if(estado==21){
        //Puebla
        show(Puebla[0],Puebla[1]);
    }
    else if(estado==22){
        //Queretaro
        show(Queretaro[0],Queretaro[1]);
    }
    else if(estado==23){
        //QR
        show(QR[0],QR[1]);
        // show(QR2[0],QR2[1]);
    }
    else if(estado==24){
        //SLP
        show(SLP[0],SLP[1]);
    }
    else if(estado==25){
        //Sinaloa
        show(Sinaloa[0],Sinaloa[1]);
    }
    else if(estado==26){
        //Sonora
        show(Sonora[0],Sonora[1]);
    }
    else if(estado==27){
        //Tabasco
        show(Tabasco[0],Tabasco[1]);
    }
    else if(estado==28){
        //Tamaulipas
        show(Tamaulipas[0],Tamaulipas[1]);
    }
    else if(estado==29){
        //Tlaxcala
        show(Tlaxcala[0],Tlaxcala[1]);
    }
    else if(estado==30){
        //Veracruz
        show(Veracruz[0],Veracruz[1]);
    }
    else if(estado==31){
        //Yucatan
        show(Yucatan[0],Yucatan[1]);
    }
    else if(estado==32){
        //Zacatecas
        show(Zacatecas[0],Zacatecas[1]);
    }
    else{
        alert("Eliga una opcion valida!");
    }
}
