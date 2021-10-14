const config={
    user:"sa",
    password:"di mi nombre",
    server:"SKLA-L",//169.254.210.155 169.254.138.141
    database:"prueba",
    port:1433,
    options:{
        trustedconnection: false,
        enableArithAbort: true,
        enablearithabort: true,
        encrypt:false,
        instancename: '', //MSSQLSERVER
        connectionTimeout: 999999999,
        requestTimeout: 999999999
    }
}
module.exports = config;