let minnie = {
    name: "Minnie", raza: "Gato - American wirehair", cumple: "16 de abril", edad: "8 años", adopcion: "16/04/2013"
}
let bola = {
    name: "Bola", raza: "Conejo holandés enano", cumple: "18 de agosto", edad: "6 años", adopcion: "18/08/2015"
}
let pelusa = {
    name: "Pelusa", raza: "Hamster enano de Campbell", cumple: "12 de octubre", edad: "1 años", adopcion: "12/10/2020"
}
let maya = {
    name: "Maya", raza: "Gato Siberiano", cumple: "4 de diciembre", edad: "2 años", adopcion: "04/12/2020"
}
let mia = {
    name: "Mia", raza: "Perro - Cocker Spaniel", cumple: "1 de febrero", edad: "2 años", adopcion: "01/02/2019"
}
let max = {
    name: "Max", raza: "Perro - Dachshund", cumple: "7 de enero", edad: "11 meses", adopcion: "07/01/2021"
}
let nina = {
    name: "Nina", raza: "Gato Naranja", cumple: "21 de noviembre", edad: "3 años", adopcion: "21/11/2018"
}
let coco = {
    name: "Coco", raza: "Conejo - Gigante Continental", cumple: "30 de septiembre", edad: "1 años", adopcion: "30/09/2020"
}
let mylo = {
    name: "Mylo", raza: "Perro - Golden Retriever", cumple: "27 de noviembre", edad: "6 años", adopcion: "27/11/2014"
}
let marc = {
    name: "Marc", raza: "Guacamaya", cumple: "1 de febrero", edad: "9 años", adopcion: "01/02/2011"
}
let peque = {
    name: "Peque", raza: "Hamster Sirio", cumple: "15 de marzo", edad: "1 años", adopcion: "15/03/2020"
}
let larry = {
    name: "Larry", raza: "Loro", cumple: "9 de febrero", edad: "11 años", adopcion: "09/02/2010"
}
let nala = {
    name: "Nala", raza: "Maltes", cumple: "19 de octubre", edad: "7 años", adopcion: "19/10/2013"
}
let lily = {
    name: "Lily", raza: "Persa Blanco", cumple: "5 de junio", edad: "6 años", adopcion: "05/06/2014"
}
let tom = {
    name: "Tom", raza: "Persa Platiado", cumple: "7 de julio", edad: "9 años", adopcion: "07/07/2012"
}
let jack = {
    name: "Jack", raza: "Pug", cumple: "23 de noviembre", edad: "5 años", adopcion: "23/11/2016"
}
let tyson = {
    name: "Tyson", raza: "Puppy", cumple: "11 de mayo", edad: "4 años", adopcion: "11/05/2017"
}
let bruno = {
    name: "Bruno", raza: "Scottish Fold", cumple: "21 de enero", edad: "11 meses", adopcion: "21/01/2021"
}
function insertarInfo(name,raza,cumple,edad,adopcion){
    // let nombre = document.getElementById("pet-name").
    (function($) {
        $('#pet-name').text(name);
        $('#pet-especie').text(raza);
        $('#pet-birthday').text(cumple);
        $('#pet-edad').text(edad);
        $('#pet-adopcion').text(adopcion);
    })(jQuery);
}
function MostrarInfo(){
    (function($) {
        
        // var totalItems = $('.carousel-item').length;
        // var totalItems = $('.item').length;
        var currentIndex = $('div.active').index();
        // $('#pets-carousel').on('slid.bs.carousel', function() {
        //     currentIndex = $('div.active').index() + 1;
        //    $('.num').html(''+currentIndex+'/'+totalItems+'');
        // });
        // alert("totalItems: "+totalItems)
        // alert("currentIndex: "+currentIndex)
        if(currentIndex===0){
            insertarInfo(minnie.name,minnie.raza,minnie.cumple,minnie.edad,minnie.adopcion)
        }
        else if(currentIndex===1){
            insertarInfo(mia.name,mia.raza,mia.cumple,mia.edad,mia.adopcion)
        }
        else if(currentIndex===2){
            insertarInfo(bola.name,bola.raza,bola.cumple,bola.edad,bola.adopcion)
        }
        else if(currentIndex===3){
            insertarInfo(max.name,max.raza,max.cumple,max.edad,max.adopcion)
        }
        else if(currentIndex===4){
            insertarInfo(nina.name,nina.raza,nina.cumple,nina.edad,nina.adopcion)
        }
        else if(currentIndex===5){
            insertarInfo(coco.name,coco.raza,coco.cumple,coco.edad,coco.adopcion)
        }
        else if(currentIndex===6){
            insertarInfo(mylo.name,mylo.raza,mylo.cumple,mylo.edad,mylo.adopcion)
        }
        else if(currentIndex===7){
            insertarInfo(marc.name,marc.raza,marc.cumple,marc.edad,marc.adopcion)
        }
        else if(currentIndex===8){
            insertarInfo(pelusa.name,pelusa.raza,pelusa.cumple,pelusa.edad,pelusa.adopcion)
        }
        else if(currentIndex===9){
            insertarInfo(peque.name,peque.raza,peque.cumple,peque.edad,peque.adopcion)
        }
        else if(currentIndex===10){
            insertarInfo(larry.name,larry.raza,larry.cumple,larry.edad,larry.adopcion)
        }
        else if(currentIndex===11){
            insertarInfo(nala.name,nala.raza,nala.cumple,nala.edad,nala.adopcion)
        }
        else if(currentIndex===12){
            insertarInfo(lily.name,lily.raza,lily.cumple,lily.edad,lily.adopcion)
        }
        else if(currentIndex===13){
            insertarInfo(tom.name,tom.raza,tom.cumple,tom.edad,tom.adopcion)
        }
        else if(currentIndex===14){
            insertarInfo(jack.name,jack.raza,jack.cumple,jack.edad,jack.adopcion)
        }
        else if(currentIndex===15){
            insertarInfo(tyson.name,tyson.raza,tyson.cumple,tyson.edad,tyson.adopcion)
        }
        else if(currentIndex===16){
            insertarInfo(bruno.name,bruno.raza,bruno.cumple,bruno.edad,bruno.adopcion)
        }
        else{
            insertarInfo(maya.name,maya.raza,maya.cumple,maya.edad,maya.adopcion)
        }
    })(jQuery);
    
}