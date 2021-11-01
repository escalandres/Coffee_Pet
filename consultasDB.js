const config = require("./dbconfig");
const sql = require('mssql')

let getUserID = async (email) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Email', sql.NVarChar(30), email)
            .output('ID', sql.Int)
            .execute('getUserID')
        return result;
    } catch (err) {
        console.dir(err);
    }
}
exports.getUserID = getUserID;
// module.exports = {
//     getUserID = getUserID
    
// }
