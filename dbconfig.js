const config={
    user:"sa",
    password:"di mi nombre",
    server:"192.168.56.1",//169.254.210.155 169.254.138.141 SKLA-L
    database:"prueba",
    port:1433,
    options:{
        trustedconnection: false,
        enableArithAbort: true,
        enablearithabort: true,
        encrypt:false,
        instancename: 'MSSQLSERVER', //MSSQLSERVER
        connectionTimeout: 999999999,
        requestTimeout: 999999999
    }
}
module.exports = config;