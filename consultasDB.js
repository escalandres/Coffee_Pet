const config = require("./dbconfig");
const sql = require('mssql')

let getUserID = async (email) => {
    let n=39;
	let m = String.fromCharCode(n)
    console.log("EmaiL: "+m+email+m);
    try {
        let pool = await sql.connect(config);
        console.log("EmAiL: "+email);
        let result = await pool.request()
            .input('Email', sql.NVarChar(30), 'juan@juanes.com')
            .output('ID', sql.Int)
            .execute('getUserID')
        return result;

    } catch (err) {
        console.log(err);
        console.dir(err);
    }
}
exports.getUserID = getUserID;
// module.exports = {
//     getUserID = getUserID
    
// }
