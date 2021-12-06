
// function toDate(dStr,format) {
// 	var now = new Date();
// 	if (format == "h:m") {
//  		now.setHours(dStr.substr(0,dStr.indexOf(":")));
//  		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
//  		now.setSeconds(0);
//  		return now;
//     }// }else 
// 	// 	return "Invalid Format";
// }

// var a = "7:29"
// var b = toDate(a,"h:m")
// // console.log('hora: '+b.getHours().toString()+':'+b.getMinutes());
// console.log(b);
// console.log(typeof(b));
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
console.log("ISO: "+tomorrow.toISOString())
console.log("Locale: "+tomorrow.toLocaleDateString())
