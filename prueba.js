const bcrypt = require("bcryptjs");
const enc = require("./encryptScript")
let dato ='';
enc.asyncCall().then(v => {
    console.log("v:"+v);  // prints 60 after 4 seconds.
    dato=''+v;
    // exports.v = v;
});

setTimeout(async () => {
	console.log("dato: "+dato);
}, 5000);
