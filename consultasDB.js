const config = require("./dbconfig");
const sql = require('mssql')

let Regresar_IDUsuario = async (email) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('email', sql.NVarChar(30), email)
            .output('id', sql.Int)
            .execute('Regresar_IDUsuario')
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Regresar_IDMascota = async (nombre) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('nombre', sql.NVarChar(20), nombre)
            .output('id', sql.Int)
            .execute('Regresar_IDMascota')
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Regresar_DatosCliente = async (id_cliente) => {
    try {
        // console.log("Iniciando");
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id_cliente)
            .output('email', sql.NVarChar(20))
            .output('nombre', sql.NVarChar(20))
            .output('apellidop', sql.NVarChar(20))
            .output('apellidom', sql.NVarChar(20))
            .output('celular', sql.BigInt)
            .output('fnacimiento', sql.Date)
            .output('pconfianza', sql.Int)
            .execute('Regresar_DatosCliente')
        // console.dir(result);
        // console.log("a ver");
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Regresar_Direccion_Cliente = async (id_cliente) => {
    try {
        // console.log("Iniciando");
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id_cliente)
            .output('estado', sql.NVarChar(20))
            .output('municipio', sql.NVarChar(20))
            .output('colonia', sql.NVarChar(20))
            .output('calle', sql.NVarChar(20))
            .output('ne',  sql.NVarChar(5))
            .output('ni',  sql.NVarChar(5))
            .execute('Regresar_Direccion_Cliente')
        // console.dir(result);
        // console.log("a ver");
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Validar_Usuario = async (email) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('email', sql.NVarChar(20), email)
            .output('ContraEn', sql.NVarChar(61))
            .execute('Validar_Usuario')
        // console.log(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_Usuario = async (email,password,name,lastname1,lastname2) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('email', sql.NVarChar(20), email)
            .input('contra', sql.NVarChar(61),password)
            .input('nombre', sql.NVarChar(20),name)
            .input('apellidop', sql.NVarChar(20),lastname1)
            .input('apellidom', sql.NVarChar(20),lastname2)
            .execute('Agregar_Usuario')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let ActualizarDatos_Cliente = async (id,estado,municipio,colonia,calle,ne,ni,celular,fnacimiento,pconfianza) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('estado', sql.NVarChar(20),estado)
            .input('municipio', sql.NVarChar(20),municipio)
            .input('colonia', sql.NVarChar(20),colonia)
            .input('calle', sql.NVarChar(20),calle)
            .input('ne', sql.NVarChar(5),ne)
            .input('ni', sql.NVarChar(5),ni)
            .input('celular', sql.BigInt,celular)
            .input('fnacimiento', sql.Date,fnacimiento)
            .input('pconfianza', sql.Int,pconfianza)
            .execute('ActualizarDatos_Cliente')
        // console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let ActualizarPConfianza = async (id, pconfianza) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('pconfianza', sql.Int,pconfianza)
            .execute('ActualizarPConfianza')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_Empleado = async (nombre, apellidop,apellidom) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('nombre', sql.NVarChar(20), nombre)
            .input('apellidop', sql.NVarChar(20),apellidop)
            .input('apellidom', sql.NVarChar(20),apellidom)
            .execute('Agregar_Empleado')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_Mesa = async (idMesa, nasientos,ocupado) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('idMesa', sql.Int, idMesa)
            .input('nasientos', sql.Int,nasientos)
            .input('ocupado', sql.Bit,ocupado)
            .execute('Agregar_Mesa')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_EspecieRaza = async (especie, raza, alimentacion, ) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('especie', sql.NVarChar(30), especie)
            .input('raza', sql.NVarChar(30),raza)
            .input('alimentacion', sql.NVarChar(30),alimentacion)
            .input('esperanzavida', sql.Int,esperanzavida)
            .execute('Agregar_EspecieRaza')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_Mascota = async (fk_Id_EspecieRaza, nombre, fcumpleaños) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('fk_Id_EspecieRaza', sql.Int, fk_Id_EspecieRaza)
            .input('nombre', sql.NVarChar(20), nombre)
            .input('fcumpleaños', sql.Date,fcumpleaños)
            .execute('Agregar_Mascota')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Agregar_Reservacion = async (fk_Id_Empleado,fk_Id_Cliente,fk_Id_Mascota,fk_Id_Mesa,serviciolocal,horafechaexpedicion,fechareservacion,horainicio,horafin, numeropersonas) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('fk_Id_Empleado', sql.Int, fk_Id_Empleado)
            .input('fk_Id_Cliente', sql.Int,fk_Id_Cliente)
            .input('fk_Id_Mascota', sql.Int,fk_Id_Mascota)
            .input('fk_Id_Mesa', sql.Int,fk_Id_Mesa)
            .input('serviciolocal', sql.Bit,serviciolocal)
            .input('horafechaexpedicion', sql.DateTime,horafechaexpedicion)
            .input('fechareservacion', sql.Date,fechareservacion)
            .input('horainicio', sql.Time,horainicio)
            .input('horafin', sql.Time,horafin)
            .input('numeropersonas', sql.Int,numeropersonas)
            .execute('Agregar_Reservacion')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Asignar_asistencia = async (id, horallegada, asistencia) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('horallegada', sql.Time, horallegada)
            .input('asistencia', sql.Bit,asistencia)
            .execute('Asignar_asistencia')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Eliminar_Reservacion = async (idreservacion) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('idreservacion', sql.Int, idreservacion)
            .execute('Eliminar_Reservacion')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Eliminar_Usuario = async (id) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .execute('Eliminar_Usuario')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}

let Comprobacion_Datos_Registrados = async (id) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .output('resultado', sql.Bit)
            .execute('Comprobacion_Datos_Registrados')
        console.dir(result);
        return result;
    } catch (err) {
        console.dir(err);
    }
}
// exports.getUserID = getUserID;
module.exports = {
    Regresar_IDUsuario: Regresar_IDUsuario,
    Regresar_DatosCliente: Regresar_DatosCliente,
    Validar_Usuario: Validar_Usuario,
    Agregar_Usuario: Agregar_Usuario,
    ActualizarDatos_Cliente: ActualizarDatos_Cliente,
    ActualizarPConfianza: ActualizarPConfianza,
    Agregar_Empleado: Agregar_Empleado,
    Agregar_Mesa: Agregar_Mesa,
    Agregar_EspecieRaza: Agregar_EspecieRaza,
    Agregar_Mascota: Agregar_Mascota,
    Agregar_Reservacion: Agregar_Reservacion,
    Asignar_asistencia: Asignar_asistencia,
    Eliminar_Reservacion: Eliminar_Reservacion,
    Eliminar_Usuario:Eliminar_Usuario,
    Comprobacion_Datos_Registrados: Comprobacion_Datos_Registrados,
    Regresar_Direccion_Cliente: Regresar_Direccion_Cliente,
    Regresar_IDMascota: Regresar_IDMascota
};
