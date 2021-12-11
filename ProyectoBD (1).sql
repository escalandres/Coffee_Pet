create database ProyectoBD;
use ProyectoBD;

--0. Tabla de Log In--
create table Usuario(
ID_Usuario int identity,
Email nvarchar(20),
Clave nvarchar(61)

primary key(ID_Usuario))


--1. Tabla de los Clientes--
create table Cliente(
ID_Cliente int,
FK_ID_DireccionCliente int,
FK_ID_Usuario int,
Nombre nvarchar(20),
ApellidoP nvarchar(20),
ApellidoM nvarchar(20),
Celular bigint,
FechaNacimiento date,
PuntosConfianza int

primary key(ID_Cliente))

--1.5 Tabla de Direccion del Cliente--
create table DireccionCliente(
ID_Direccion_Cliente int,
Estado nvarchar(20),
Municipio nvarchar(20),
Colonia nvarchar(20),
Calle nvarchar(20),
NumExt nvarchar(5),
NumInt nvarchar(5)

primary key(ID_Direccion_Cliente))

--2 Tabla de Reservaciones--
create table Reservacion(
ID_Reservacion int identity,
FK_ID_Empleado int,
FK_ID_Cliente int,
FK_ID_Mascota int,
FK_ID_Mesa int,
ServicoLocal bit,
HoraFechaExpedicion datetime,
FechaReservacion date,
HoraInicio time,
HoraFin time,
HoraLlegada time,
NumPersonas int,
Asistencia bit

primary key(ID_Reservacion))

--3. Tabla de las Mesas--
create table Mesa(
ID_Mesa int,
NumAsientos int,
Ocupado bit

primary key(ID_Mesa))

--4. Tabla de los Empleados--
create table Empleado(
ID_Empleado int identity,
Nombre nvarchar(20),
ApellidoP nvarchar(20),
ApellidoM nvarchar(20)

primary key(ID_Empleado))

--5. Tabla de las Mascotas--
create table Mascota(
ID_Mascota int identity,
FK_ID_EspecieRaza int,
Nombre nvarchar(20),
FechaCumpleanos date

primary key(ID_Mascota))

--6. Tabla de Especies y Razas--
create table EspecieRaza(
ID_EspecieRaza int identity,
Especie nvarchar(30),
Raza nvarchar(30),
Alimentacion nvarchar(30),
EsperanzaVida int

primary key(ID_EspecieRaza))

--Llaves Foraneas--

ALTER TABLE Cliente
ADD FOREIGN KEY (FK_ID_DireccionCliente) REFERENCES DireccionCliente(ID_Direccion_Cliente)

ALTER TABLE Cliente
ADD FOREIGN KEY (FK_ID_USUARIO) REFERENCES Usuario(ID_Usuario)

ALTER TABLE Reservacion
ADD FOREIGN KEY (FK_ID_Empleado) REFERENCES Empleado(ID_Empleado)

ALTER TABLE Reservacion
ADD FOREIGN KEY (FK_ID_Cliente) REFERENCES Cliente(ID_Cliente)

ALTER TABLE Reservacion
ADD FOREIGN KEY (FK_ID_Mascota) REFERENCES Mascota(ID_Mascota)

ALTER TABLE Reservacion
ADD FOREIGN KEY (FK_ID_Mesa) REFERENCES Mesa(ID_Mesa)

ALTER TABLE Mascota
ADD FOREIGN KEY (FK_ID_EspecieRaza) REFERENCES EspecieRaza(ID_EspecieRaza)

--Procedimientos almacenados--

--1. INSERTAR DATOS--

	--1.1.Agrega el usuario por primera vez--		--7.1 Transaccion 1--
CREATE PROCEDURE Agregar_Usuario(
	@email nvarchar(20),
	@contra nvarchar(20),
	@nombre nvarchar(20),
	@apellidop nvarchar(20),
	@apellidom nvarchar(20))
AS
	declare @id_usu as int;
BEGIN

	begin transaction
	begin try
		insert into Usuario
		values(@email,@contra);

		SELECT TOP 1 @id_usu=ID_Usuario
		FROM Usuario ORDER BY ID_Usuario DESC;

		insert into DireccionCliente
		values(@id_usu,null,null,null,null,null,null);

		insert into Cliente
		values(@id_usu, @id_usu, @id_usu, @nombre, @apellidop, @apellidom, null, null,null);

	commit transaction
	end try
		begin catch
			ROLLBACK TRANSACTION
		end catch;	
END;

execute Agregar_Usuario 'angel@angel.com','1234', 'Rebeca', 'Aguilar', 'Rojas'

	--1.2. Agregar un empleado--
CREATE PROCEDURE Agregar_Empleado(
	@nombre nvarchar(20),
	@apellidop nvarchar(20),
	@apellidom nvarchar(20))
AS
BEGIN
	insert into Empleados
	values(@nombre,@apellidop,@apellidom);
END;

	--1.3. Agregar una mesa--
CREATE PROCEDURE Agregar_Mesa(
	@IdMesa int,
	@nasientos int,
	@ocupado bit)
AS
BEGIN
	insert into Mesa
	values(@IdMesa,@nasientos,@ocupado);
END;

	--1.4. Agregar Especie y Raza nueva--
CREATE PROCEDURE Agregar_EspecieRaza(
	@especie nvarchar(30),
	@raza nvarchar(30),
	@alimentacion nvarchar(30),
	@esperanzavida int)
AS
BEGIN
	insert into EspecieRaza
	values(@especie,@raza,@alimentacion,@esperanzavida);
END;

	--1.5. Agregar una mascota nueva--
CREATE PROCEDURE Agregar_Mascota(
	@fk_Id_EspecieRaza int,
	@nombre nvarchar(20),
	@fcumpleaños date)
AS
BEGIN
	insert into Mascota
	values(@fk_Id_EspecieRaza,@nombre,@fcumpleaños);
END;

	--1.6. Agregar reservacion-- Se modifico el empleado
CREATE PROCEDURE Agregar_Reservacion(

	@fk_Id_Cliente int,
	@fk_Id_Mascota int,
	@fk_Id_Mesa int,
	@serviciolocal bit,
	@horafechaexpedicion datetime,
	@fechareservacion date,
	@horainicio time,
	@horafin time,
	@numeropersonas int)
AS
BEGIN
	insert into Reservacion
	values(null,@fk_Id_Cliente,@fk_Id_Mascota,@fk_Id_Mesa,@serviciolocal,@horafechaexpedicion,@fechareservacion,@horainicio,@horafin,null,@numeropersonas,null);
END;


--2. ACTUALIZAR DATOS--
	--2.0. Actualizar Contraseña del usuario--
CREATE PROCEDURE ActualizarContrasena_Usuario(
	@email nvarchar(20),
	@ContraVieja nvarchar(61),
	@ContraNueva nvarchar(61),
	@result bit output)
AS
	declare @contra as nvarchar(61)
BEGIN
	select @contra=Clave from Usuario where Email=@email;

	if @contra=@ContraVieja
		begin
			update Usuario set Clave=@ContraNueva where Email=@email;
			set @result=1;
		end
	else
		begin
			set @result=0;
		end
END;

	--2.1. Actualizar datos del Cliente--				--7.2. Transaccion 2--
CREATE PROCEDURE ActualizarDatos_Cliente(
	@id int,

	@estado nvarchar(20),
	@municipio nvarchar(20),
	@colonia nvarchar(20),
	@calle nvarchar(20),
	@ne nvarchar(5)	,
	@ni nvarchar(5),

	@celular bigint,
	@fnacimiento date,
	@pconfianza int)
AS
BEGIN

	begin transaction
	begin try
		update DireccionCliente set Estado=@estado, Municipio=@municipio, Colonia=@colonia, Calle=@calle, NumExt=@ne, NumInt=@ni 
		where ID_Direccion_Cliente=@id;

		update Cliente set Celular=@celular, FechaNacimiento=@fnacimiento, PuntosConfianza=@pconfianza
		where ID_Cliente=@id;
	commit transaction
	end try
		begin catch
			ROLLBACK TRANSACTION
		end catch;	
	
END;

	--2.2. Actualizar solo puntos de confianza--
CREATE PROCEDURE ActualizarPConfianza(
	@id int,
	@pconfianza int)
AS
BEGIN
	update Cliente set PuntosConfianza=@pconfianza
	where ID_Cliente=@id;
END;


	--2.3. Asignar hora de llegada y asistencia a una reservacion--
CREATE PROCEDURE Asignar_asistencia(
	@id int,

	@horallegada time,
	@asistencia bit)
AS
BEGIN
	Update Reservacion set HoraLlegada=@horallegada, Asistencia=@asistencia
	where FK_ID_Cliente=@id;
END;

	--2.4 --
CREATE PROCEDURE ActualizarOcupamiento_Mesa(
	@id int,
	@ocupamiento bit)
AS
BEGIN
	update Mesa set Ocupado=@ocupamiento where ID_Mesa=@id;
END;

--3. ELIMINAR DATOS--

	--3.1. Eliminar Reservacion--
Create PROCEDURE Eliminar_Reservacion(
	@idreservacion int)
AS
BEGIN
	DELETE FROM Reservacion where ID_Reservacion=@idreservacion;
END;

	--3.2. Eliminar Usuario--					--7.3. Transaccion 3--
CREATE PROCEDURE Eliminar_Usuario(
	@id int)
AS
BEGIN
	begin transaction
	begin try
		
		DELETE FROM Reservacion where FK_ID_Cliente=@id;
		DELETE FROM Cliente where ID_Cliente=@id;
		DELETE FROM DireccionCliente where ID_Direccion_Cliente=@id;
		DELETE FROM Usuario where ID_Usuario=@id;
		
	commit transaction
	end try
		begin catch
			ROLLBACK TRANSACTION
		end catch;	
END;

	--3.3. Eliminar Especie Raza--					--7.4. Transaccion 4--
CREATE PROCEDURE Eliminar_EspecieRaza(
	@idER int)
AS
BEGIN

	begin transaction
	begin try
		
		DELETE FROM Mascota where FK_ID_EspecieRaza=@idER;
		DELETE FROM EspecieRaza where ID_EspecieRaza=@idER;
		
	commit transaction
	end try
		begin catch
			ROLLBACK TRANSACTION
		end catch;	
	
END;

	--3.4. Eliminar Mascota--

CREATE PROCEDURE Eliminar_Mascota(
	@id int)
AS
BEGIN
	DELETE FROM Mascota where ID_Mascota=@id;
END;

	--3.5. Eliminar Empleado--

CREATE PROCEDURE Eliminar_Empleado(
	@id int)
AS
BEGIN
	DELETE FROM Empleado where ID_Empleado=@id;
END;

	--3.6. Eliminar Mesa--

CREATE PROCEDURE Eliminar_Mesa(
	@id int)
AS
BEGIN
	DELETE FROM Mesa where ID_Mesa=@id;
END;



--4. CONSULTAS--

	--4.1. Regresa el ID del usuario con el Email--
CREATE PROCEDURE Regresar_IDUsuario(
	@email nvarchar(20),
	@id int output)
AS
	declare @idBD as int
	declare @emailBD as nvarchar(20)
BEGIN
	select @idBD=ID_Usuario, @emailBD=Email from Usuario where Email=@email;
	if @emailBD=@email
		begin
			set @id=@idBD;
			select @id;
		end
	else
		begin
			set @id=0;
			select @id;
		end
END;
	select* from Usuario;
	declare @id41 as int
	execute Regresar_IDUsuario 'angel@angel.com',@id41;


	--4.2. Regreso de todos los datos del usuario con el ID del usuario--
CREATE PROCEDURE Regresar_DatosCliente(
	@id int,
	
	@email nvarchar(20) output,
	@nombre nvarchar(20) output,
	@apellidop nvarchar(20) output,
	@apellidom nvarchar(20) output,
	@celular bigint output,
	@fnacimiento date output,
	@pconfianza int output)
AS
	declare @emailBD as nvarchar(20)
	declare @nombreBD as nvarchar(20)
	declare @apellidopBD as nvarchar(20)
	declare @apellidomBD as nvarchar(20)
	declare @celularBD as bigint
	declare @fnacimientoBD as date
	declare @pconfianzaBD as int
BEGIN
	select @emailBD=Usuario.Email, @nombreBD=Cliente.Nombre, @apellidopBD=Cliente.ApellidoP, @apellidomBD=Cliente.ApellidoM, 
	@celularBD=Cliente.Celular, @fnacimientoBD=Cliente.FechaNacimiento, @pconfianzaBD=Cliente.PuntosConfianza 
	from Usuario, Cliente 
	where ID_Usuario=FK_ID_Usuario and ID_Usuario=@id;

			set @email=@emailBD;
			select @email
			set @nombre=@nombreBD;
			select @nombre
			set @apellidop=@apellidopBD;
			select @apellidop
			set @apellidom=@apellidomBD;
			select @apellidom
			set @celular=@celularBD;
			select @celular
			set @fnacimiento=@fnacimientoBD;
			select @fnacimiento
			set @pconfianza=@pconfianzaBD;
			select @pconfianza
END;

select * from Usuario, Cliente;
declare @emailBD1 as nvarchar(20)
declare @nombreBD1 as nvarchar(20)
declare @apellidopBD1 as nvarchar(20)
declare @apellidomBD1 as nvarchar(20)
declare @celularBD1 as bigint
declare @fnacimientoBD1 as date
declare @pconfianzaBD1 as int
execute Regresar_DatosCliente 1, @emailBD1, @nombreBD1, @apellidopBD1, @apellidomBD1, @celularBD1, @fnacimientoBD1, @pconfianzaBD1

	--4.3.Regresa la contraseña encriptada--
CREATE PROCEDURE Validar_Usuario(
	@email nvarchar(20),
	@ContraEn nvarchar(20) output)
AS
	Declare @emailBD as nvarchar(20)
	Declare @ContraBD as nvarchar(20)
BEGIN
	
	select @emailBD=Email, @ContraBD=Clave from Usuario where Email=@email;

	if	@emailBD=@email
		BEGIN
			set @ContraEn=@ContraBD;
			select @ContraEn
		END
	else
		BEGIN
			set @ContraEn=null;
			select @ContraEn
		END
END;

	select * from Usuario
	declare @contra43 as nvarchar(20)
	execute Validar_Usuario 'angel@angel.com',@contra43

	--4.4. Comprobar que los datos esten registrados--
CREATE PROCEDURE Comprobacion_Datos_Registrados(
	@id int,
	@resultado bit output)
AS
	declare @FechaNacimientoBD as date;
BEGIN
		
	select @FechaNacimientoBD=FechaNacimiento from Cliente where FK_ID_Usuario=@id

	if @FechaNacimientoBD is null
		begin
			set @resultado=0;
			select @resultado
		end
	else
		begin
			set @resultado=1;
			select @resultado
		end
END;

	select * from Cliente
	declare @resultado44 as bit
	execute Comprobacion_Datos_Registrados 1,@resultado44

	--4.5. Regresar Direccion del cliente--
CREATE PROCEDURE Regresar_Direccion_Cliente(
	@id int,
	
	@estado nvarchar(20) output,
	@municipio nvarchar(20) output,
	@colonia nvarchar(20) output,
	@calle nvarchar(20) output,
	@ne nvarchar(5)	output,
	@ni nvarchar(5) output)
AS
	declare @estadoBD as nvarchar(20)
	declare @municipioBD as nvarchar(20)
	declare @coloniaBD as nvarchar(20)
	declare @calleBD as nvarchar(20)
	declare @neBD as nvarchar(5)
	declare @niBD as nvarchar(5)
BEGIN
	select @estadoBD=Estado, @municipioBD=Municipio, @coloniaBD=Colonia, @calleBD=Calle, @neBD=NumExt, @niBD=NumInt
	from Usuario, Cliente, DireccionCliente
	where ID_Direccion_Cliente=FK_ID_DireccionCliente and ID_Usuario=FK_ID_Usuario and ID_Cliente=@id

	set @estado=@estadoBD;
	select @estado
	set @municipio=@municipioBD;
	select @municipio
	set @colonia=@coloniaBD;
	select @colonia
	set @calle=@calleBD;
	select @calle
	set @ne=@neBD;
	select @ne
	set @ni=@niBD
	select @ni
END;
	
	select * from DireccionCliente
	declare @estado45 as nvarchar(20)
	declare @municipio45 as nvarchar(20)
	declare @colonia45 as nvarchar(20)
	declare @calle45 as nvarchar(20)
	declare @ne45 as nvarchar(5)
	declare @ni45 as nvarchar(5)
	Execute Regresar_Direccion_Cliente 1,@estado45,@municipio45, @colonia45, @calle45, @ne45, @ni45

--4.6 o	Regresar los id del cliente, empleado, mesa y mascota asignados a una reservación (Fase 2)--
CREATE PROCEDURE RegresarIDS_Reservacion(
	@id int,
	@idC int output,
	@idE int output,
	@idM int output,
	@idMa int output)
AS
	declare @idCBD as int
	declare @idEBD as int
	declare @idMBD as int
	declare @idMaBD as int
BEGIN
	select @idCBD=FK_ID_Cliente, @idEBD=FK_ID_Empleado, @idMBD=FK_ID_Mesa, @idMaBD=FK_ID_Mascota from Reservacion where ID_Reservacion=@id;

	set @idC=@idCBD
	select @idC
	set @idE=@idEBD
	Select @idE
	set @idM=@idMBD
	select @idM
	set @idMa=@idMaBD
	select @idMa
END;

	select * from Reservacion
	declare @idC46 as int
	declare @idE46 as int
	declare @idM46 as int
	declare @idMa46 as int
	Execute RegresarIDS_Reservacion 1, @idC46, @idE46, @idM46, @idMa46
--4.7 Ver cuantos asientos tiene una mesa (Fase 2)--

CREATE PROCEDURE RegresarNAsientos_Mesa(
	@id int,
	@nasiento int output)
AS
	declare @nasientosBD as int
BEGIN
	select @nasientosBD=NumAsientos from Mesa where ID_Mesa=@id

	set @nasiento=@nasientosBD
	select @nasiento
END;
	
	select * from Mesa
	declare @nasientos47 as int
	execute	RegresarNAsientos_Mesa 3, @nasientos47

--4.8 Ver que Datos de Masctoa incluidos Especie y Raza es una mascota--

CREATE PROCEDURE RegresarDatos_Mascota(
	@id int,
	@Nombre nvarchar(20) output,
	@FechaC date output,
	@Especie nvarchar(30) output,
	@Raza nvarchar(30) output,
	@Alimentacion nvarchar(30) output,
	@EsperanzaVida int output)
AS
	declare @idFKBD as int
	declare @NombreBD as nvarchar(20)
	declare @FechaCBD as date
	declare @EspecieBD as nvarchar(30)
	declare @RazaBD as nvarchar(30)
	declare @AlimentacionBD as nvarchar(30)
	declare @EsperanzaVidaBD as int
BEGIN
	select @idFKBD=FK_ID_EspecieRaza from Mascota where ID_Mascota=@id

	select @NombreBd=Mascota.Nombre, @FechaCBD=Mascota.FechaCumpleanos, @EspecieBD=EspecieRaza.Especie, 
	@RazaBD=EspecieRaza.Raza, @AlimentacionBD=EspecieRaza.Alimentacion, @EsperanzaVidaBD=EspecieRaza.EsperanzaVida 
	from Mascota, EspecieRaza where ID_Mascota=@id and FK_ID_EspecieRaza=@idFKBD

	set @Nombre=@NombreBD
	select @Nombre
	set @FechaC=@FechaCBD
	select @FechaC
	set @Especie=@EspecieBD
	select @Especie
	set @Raza=@RazaBD
	select @Raza
	set @Alimentacion=@AlimentacionBD
	select @Alimentacion
	set @EsperanzaVida=@EsperanzaVidaBD
	select @EsperanzaVida
END;

	select * from Mascota, EspecieRaza
	declare @Nombre48 as nvarchar(20)
	declare @FechaC48 as date
	declare @Especie48 as nvarchar(30)
	declare @Raza48 as nvarchar(30)
	declare @Alimentacion48 as nvarchar(30)
	declare @EsperanzaVida48 as int
	execute RegresarDatos_Mascota 3,@Nombre48, @FechaC48, @Especie48, @Raza48, @Alimentacion48, @EsperanzaVida48

--4.9 Consultar Hora de reservación de un cliente y su nombre en un día especifico.--
CREATE PROCEDURE RegresarHora_Reservacion(
	@id int,
	@fechaReservacion date,
	@nombre nvarchar(20) output,
	@apellidop nvarchar(20) output,
	@horaInicio time output,
	@horaFin time output)
AS
	declare @nombreBD as nvarchar(20)
	declare @apellidopBD as nvarchar(20)
	declare @horaInicioBD as time
	declare @horaFinBD as time
BEGIN
	select @nombreBD=Cliente.Nombre, @apellidopBD=Cliente.ApellidoP, @horaInicioBD=Reservacion.HoraInicio, @horaFinBD=Reservacion.HoraFin
	from Cliente, Reservacion where ID_Cliente=@id and (FK_ID_Cliente=@id and FechaReservacion=@fechaReservacion)

	set @nombre=@nombreBD
	select @nombre
	set @apellidop=@apellidopBD
	select @apellidop
	set @horaInicio=@horaInicioBD
	select @horaInicio
	set @horaFin=@horaFinBD
	select @horaFin
END;

	select * from Reservacion
	declare @nombre49 as nvarchar(20)
	declare @apellidop49 as nvarchar(20)
	declare @horaInicio49 as time
	declare @horaFin49 as time
	execute RegresarHora_Reservacion 1, '2021/10/13',@nombre49, @apellidop49, @horaInicio49, @horaFin49

--4.10 Consultar nombre cliente, dirección de cliente y mascota para una reservación--

CREATE PROCEDURE RegresarClienteDireccionMascota(
	@idR int,
	@nombreC nvarchar(20) output,
	@apellidoP nvarchar(20) output,
	@municipio nvarchar(20) output,
	@colonia nvarchar(20) output,
	@calle nvarchar(20) output,
	@nombreM nvarchar(20) output)
AS
	declare @idCBD as int
	declare @idDCBD as int
	declare @idMBD as int
	declare @nombreCBD as nvarchar(20)
	declare @apellidoPBD as nvarchar(20)
	declare @municipioBD as nvarchar(20)
	declare @coloniaBD as nvarchar(20)
	declare @calleBD as nvarchar(20)
	declare @nombreMBD as nvarchar(20)
BEGIN
	select @idCBD=FK_ID_Cliente, @idMBD=FK_ID_Mascota from Reservacion where ID_Reservacion=@idR;
	select @idDCBD=FK_ID_DireccionCliente from Cliente where ID_Cliente=@idCBD;

	select @nombreCBD=Cliente.Nombre, @apellidoPBD=Cliente.ApellidoP, @municipioBD=DireccionCliente.Municipio, 
	@coloniaBD=DireccionCliente.Colonia, @calleBD=DireccionCliente.Calle, @nombreMBD=Mascota.Nombre
	from DireccionCliente, Cliente, Mascota
	where ID_Mascota=@idMBD and ID_Cliente=@idCBD and ID_Direccion_Cliente=@idDCBD

	set @nombreC=@nombreCBD
	select @nombreC
	set @apellidoP=@apellidoPBD
	select @apellidoP
	set @municipio=@municipioBD
	select @municipio
	set @colonia=@coloniaBD
	select @colonia
	set @calle=@calleBD
	select @calle
	set @nombreM=@nombreMBD
	select @nombreM
END;

	select * from DireccionCliente
	declare @nombreC410 as nvarchar(20)
	declare @apellidoP410 as nvarchar(20)
	declare @municipio410 as nvarchar(20)
	declare @colonia410 as nvarchar(20)
	declare @calle410 as nvarchar(20)
	declare @nombreM410 as nvarchar(20)
	execute RegresarClienteDireccionMascota 1, @nombreC410, @apellidoP410, @municipio410, @colonia410, @calle410, @nombreM410

--4.11 Cuantas reservaciones incluyen la misma mascota--

CREATE PROCEDURE SumMismaMascota(
	@id int,
	@num int output)
AS
	declare @numSUM as int
BEGIN
	select @numSUM=count(ID_Reservacion) from Reservacion where FK_ID_Mascota=@id

	set @num=@numSUM
	select @num
END;

	select * from Reservacion
	declare @numSUM411 as int
	Execute SumMismaMascota 1, @numSUM411

--4.12 Cuantas reservaciones tiene un cliente--
CREATE PROCEDURE SumMismoCliente(
	@id int,
	@num int output)
AS
	declare @numSUM as int
BEGIN
	select @numSUM=count(ID_Reservacion) from Reservacion where FK_ID_Cliente=@id

	set @num=@numSUM
	select @num
END;

	select * from Reservacion
	declare @numSUM412 as int
	Execute SumMismoCliente 1, @numSUM412

--4.13 En cuantas reservaciones aparece el mismo empleado--
CREATE PROCEDURE SumMismoEmpleado(
	@id int,
	@num int output)
AS
	declare @numSUM as int
BEGIN
	select @numSUM=count(ID_Reservacion) from Reservacion where FK_ID_Empleado=@id

	set @num=@numSUM
	select @num
END;

	select * from Reservacion
	declare @numSUM413 as int
	Execute SumMismoEmpleado 1, @numSUM413

--4.14 Cuantos animales de la misma especie se tienen--
CREATE PROCEDURE SumMismaEspecie(
	@Especie nvarchar(30),
	@num int output)
AS
	declare @numSUM as int
BEGIN
	select @numSUM=count(ID_EspecieRaza) from EspecieRaza where Especie=@Especie

	set @num=@numSUM
	select @num
END;

	select * from EspecieRaza
	declare @numSUM414 as int
	Execute SumMismaEspecie 'perro', @numSUM414

--4.15 Cuantos animales de la misma Especie y raza se tienen--
CREATE PROCEDURE SumMismaRaza(
	@id int,
	@num int output)
AS
	declare @numSUM as int
BEGIN
	select @numSUM=count(ID_Mascota) from Mascota where FK_ID_EspecieRaza=@id

	set @num=@numSUM
	select @num
END;

	select * from Mascota
	declare @numSUM415 as int
	Execute SumMismaRaza 14, @numSUM415

--4.16 Comprobar si reservacion ya esta registrada--

CREATE PROCEDURE Comprobar_Reservacion(
	@id_Mascota int,
	@id_Mesa int,
	@fechaReservacion date,
	@horaInicio time,
	@result bit output)
AS
	declare @ID_ReservacionBD as int
BEGIN

	select @ID_ReservacionBD=ID_Reservacion
	from Reservacion
	where FK_ID_Mascota=@id_Mascota and FK_ID_Mesa=@id_Mesa and FechaReservacion=@fechaReservacion and 
	(HoraInicio=@horaInicio or (@horaInicio between HoraInicio and HoraFin))

	if (@ID_ReservacionBD is NULL)
		BEGIN
			set @result=0;
			select @result;
		END
	else
		BEGIN
			set @result=1;
			select @result
		END
END;

	declare @resultado as bit
	exec Comprobar_Reservacion 1,1,'2021-10-12','13:30:00', @resultado

--4.16 Mejorado--

CREATE PROCEDURE Comprobar_ReservacionB(
	@id_Mascota int,
	@id_Mesa int,
	@fechaReservacion date,
	@horaInicio time,
	@result int output)
AS
	declare @ID_ReservacionBD as int
BEGIN
	select @ID_ReservacionBD=ID_Reservacion
	from Reservacion
	where FK_ID_Mascota=@id_Mascota and FK_ID_Mesa=@id_Mesa and FechaReservacion=@fechaReservacion and 
	(HoraInicio=@horaInicio or (@horaInicio between HoraInicio and HoraFin))

	--Si Mascota y mesa ya estan registradas manda 1--
	if (@ID_ReservacionBD is not NULL)
		BEGIN
			set @result=1;
			select @result;
		END
	else
		BEGIN
			select @ID_ReservacionBD=ID_Reservacion
			from Reservacion
			where FK_ID_Mascota=@id_Mascota and FechaReservacion=@fechaReservacion and 
			(HoraInicio=@horaInicio or (@horaInicio between HoraInicio and HoraFin))

			--Si solo Mascota ya esta registrado manda 2--
			if (@ID_ReservacionBD is not null)
				BEGIN
					set @result=2;
					select @result;
				END
			else
				BEGIN
					select @ID_ReservacionBD=ID_Reservacion
					from Reservacion
					where FK_ID_Mesa=@id_Mesa and FechaReservacion=@fechaReservacion and 
					(HoraInicio=@horaInicio or (@horaInicio between HoraInicio and HoraFin))


					--Si solo Mesa ya esta registrada manda 3--
					if (@ID_ReservacionBD is not null)
						BEGIN
							set @result=3;
							select @result
						END
					--Si no es ninguna entonces regresa 4 y es posible registrarlo--
					else
						BEGIN
							set @result=4;
							select @result;
						END
				END
		END
END;
	
	select * from Reservacion
	declare @resultado as int
	exec Comprobar_ReservacionB 1, 1, '2021-10-13','13:30:00', @resultado

--5. Subconsultas--

--5.1 Regresar el número de mascotas que hay de la misma raza--

CREATE PROCEDURE SubC_MascotaMismaRaza(
	@Raza nvarchar(30),
	@num int output)
AS
	declare @NumBD as int
BEGIN
	SELECT @NumBD=COUNT(ID_Mascota)
	FROM Mascota
	WHERE FK_ID_EspecieRaza=(select ID_EspecieRaza 
							from EspecieRaza
							where Raza=@Raza)
	set @num=@NumBD
	select @num
END;

declare @NumBD51 as int
execute SubC_MascotaMismaRaza 'Persa',@NumBD51

--5.2 Regresar el número de veces que un cliente ha hecho una reservación--

CREATE PROCEDURE SubC_NumReservacionesCliente(
	@Nombre nvarchar(20),
	@ApellidoP nvarchar(20),
	@num int output)
AS
	declare @NumBD as int
BEGIN

	SELECT @NumBD=COUNT(ID_Reservacion) 
	FROM Reservacion
	WHERE FK_ID_Cliente=(select ID_Cliente
						from Cliente
						where Nombre=@Nombre and ApellidoP=@ApellidoP)

	set @num=@NumBD
	select @num
END;

declare @NumBD52 as int
execute SubC_NumReservacionesCliente 'Angel','Gutierrez',@NumBD52

--5.3 Regresar el número de veces que una mascota está en una reservación--

CREATE PROCEDURE SubC_NumReservacionesMascota(
	@Nombre nvarchar(20),
	@num int output)
AS
	declare @NumBD as int
BEGIN
	SELECT @NumBD=COUNT(ID_Reservacion) 
	FROM Reservacion
	WHERE FK_ID_Mascota=(select ID_Mascota
						from Mascota
						where Nombre=@Nombre)

	set @num=@NumBD
	select @num
END;

declare @NumBD53 as int
execute SubC_NumReservacionesMascota 'Minnie',@NumBD53

--5.4. Regresar el número de veces que un empleado está en una reservación--

CREATE PROCEDURE SubC_NumReservacionesEmpleado(
	@Nombre nvarchar(20),
	@ApellidoP nvarchar(20),
	@ApellidoM nvarchar(20),
	@num int output)
AS
	declare @NumBD as int
BEGIN
	SELECT @NumBD=COUNT(ID_Reservacion) 
	FROM Reservacion
	WHERE FK_ID_Empleado=(select ID_Empleado
						from Empleado
						where Nombre=@Nombre and ApellidoP=@ApellidoP and ApellidoM=@ApellidoM)

	set @num=@NumBD
	select @num
END;

declare @NumBD54 as int
execute SubC_NumReservacionesEmpleado 'Daniel','Flores','Rodriguez',@NumBD54

--5.5 Conocer la dirección dependiendo del nombre del cliente--


CREATE PROCEDURE SubC_DireccionCliente(
	@Nombre nvarchar(20),
	@ApellidoP nvarchar(20),
	@Estado nvarchar(20) output,
	@Municipio nvarchar(20) output,
	@Colonia nvarchar(20) output,
	@Calle nvarchar(20) output,
	@NumExt nvarchar(5) output,
	@NumInt nvarchar(5) output)
AS
	DECLARE @EstadoBD AS nvarchar(20)
	DECLARE @MunicipioBD AS nvarchar(20)
	DECLARE @ColoniaBD AS nvarchar(20)
	DECLARE @CalleBD AS nvarchar(20)
	DECLARE @NumExtBD AS nvarchar(5)
	DECLARE @NumIntBD AS nvarchar(5)
BEGIN
	select @EstadoBD=Estado, @MunicipioBD=Municipio, @ColoniaBD=Colonia, @CalleBD=Calle, @NumExtBD=NumExt, @NumIntBD=NumInt
	from DireccionCliente
	where ID_Direccion_Cliente = (select FK_ID_DireccionCliente
								from Cliente
								where Nombre=@Nombre and ApellidoP=@ApellidoP)
	set @Estado=@EstadoBD
	select @Estado
	set @Municipio=@MunicipioBD
	select @Municipio
	set @Colonia=@ColoniaBD
	select @Colonia
	set @Calle=@CalleBD
	select @Calle
	set @NumExt=@NumExtBD
	select @NumExt
	set @NumInt=@NumIntBD
	select @NumInt

END

DECLARE @EstadoBD55 AS nvarchar(20)
DECLARE @MunicipioBD55 AS nvarchar(20)
DECLARE @ColoniaBD55 AS nvarchar(20)
DECLARE @CalleBD55 AS nvarchar(20)
DECLARE @NumExtBD55 AS nvarchar(5)
DECLARE @NumIntBD55 AS nvarchar(5)
execute SubC_DireccionCliente 'Angel','Gutierrez',@EstadoBD55,@MunicipioBD55, @ColoniaBD55, @CalleBD55, @NumExtBD55, @NumIntBD55

--6. VISTAS--

--6.1 Mostrar información de la reservación (Reservación-Mascota)--

CREATE VIEW VMis_Reservaciones AS
		SELECT ID_Reservacion, FK_ID_Cliente,FK_ID_Mascota, FK_ID_Mesa, ServicoLocal,  FechaReservacion, HoraInicio, HoraFin, Nombre 
		from Reservacion, Mascota
		where ID_Mascota=FK_ID_Mascota;

CREATE PROCEDURE Mis_Reservaciones(
	@id_cliente int, 
	@id_mascota  int)
AS
BEGIN
	select ID_Reservacion as 'Numero de reservación', FK_ID_Mascota as 'Numero de Mascota', 
	FK_ID_Mesa as 'Numero de Mesa', ServicoLocal as 'Tipo de Servicio',  FechaReservacion as 'Fecha de Reservación', 
	HoraInicio as 'Hora de Inicio', HoraFin as 'Hora de Fin', Nombre as 'Nombre de la Mascota'
	from VMis_Reservaciones
	where FK_ID_Cliente=@id_cliente and FK_ID_Mascota=@id_mascota
END;

execute Mis_Reservaciones 1, 1

--6.2 Mostrar información de la Mascota (Mascota-EspecieRaza)--

CREATE VIEW VMis_Mascotas AS
		SELECT ID_Mascota,Nombre,Especie,Raza, FechaCumpleanos, EsperanzaVida, Alimentacion
		from Mascota, EspecieRaza
		where FK_ID_EspecieRaza=ID_EspecieRaza;

select * from VMis_Mascotas

CREATE PROCEDURE Mis_Mascotas( 
	@id_mascota  int)
AS
BEGIN
	select *
	from VMis_Mascotas
	where ID_Mascota=@id_mascota
END;

execute Mis_Mascotas 13

--6.3 Mostrar información del Cliente (Cliente-Dirección)--

CREATE VIEW VMis_Clientes AS
		SELECT ID_Cliente,Nombre, ApellidoP, ApellidoM, Estado, Municipio, Colonia, Calle, NumExt, NumInt
		from Cliente, DireccionCliente
		where FK_ID_DireccionCliente=ID_Direccion_Cliente;

CREATE PROCEDURE Mis_Clientes( 
	@id_cliente  int)
AS
BEGIN
	select *
	from VMis_Clientes
	where ID_Cliente=@id_cliente
END;

execute Mis_Clientes 1

--6.4 Mostrar Empleado-Reservacion-Mesa--

CREATE VIEW VMis_ERM AS
		SELECT ID_Reservacion,Nombre, ApellidoP, ApellidoM, ServicoLocal, FechaReservacion, HoraInicio, HoraFin, NumPersonas, ID_Mesa, NumAsientos
		from Empleado, Reservacion, Mesa
		where FK_ID_Empleado=ID_Empleado and FK_ID_Mesa=ID_Mesa;

CREATE PROCEDURE Mis_ERM( 
	@id_reservacion  int)
AS
BEGIN
	select *
	from VMis_ERM
	where ID_Reservacion=@id_reservacion
END;

execute Mis_ERM 1

--6.5 Mostrar Vista General--

CREATE VIEW VMis_VGeneral AS
		SELECT ID_Cliente,Cliente.Nombre as 'Nombre Cliente', Cliente.ApellidoP as 'Apellido Cliente', Reservacion.ServicoLocal as 'Tipo de Servicio', 
		Reservacion.FechaReservacion as 'Fecha de Reservacion', Reservacion.HoraInicio as 'Hora de Inicio', Reservacion.HoraFin as 'Hora de Fin', 
		Reservacion.NumPersonas as 'Numero de Personas', Mascota.Nombre as 'Nombre Mascota', Empleado.Nombre as 'Nombre Empleado', 
		Empleado.ApellidoP as 'Apellido Empleado', Mesa.ID_Mesa as 'Numero de Mesa', Mesa.NumAsientos as 'Numero de Asientos'
		from Cliente, Reservacion, Mascota, Empleado, Mesa
		where FK_ID_Cliente=ID_Cliente and FK_ID_Mascota=ID_Mascota and FK_ID_Empleado=ID_Empleado and FK_ID_Mesa=ID_Mesa;

CREATE PROCEDURE Mis_VGeneral( 
	@ID_Cliente  int)
AS
BEGIN
	select *
	from VMis_VGeneral
	where ID_Cliente=@ID_Cliente
END;

execute Mis_VGeneral 1;

--7. Triggers--

--7.1 Insertar Mesa--

CREATE TRIGGER T_InsertarMesa
	ON Mesa
after insert
as
	declare @ID_MesaBD as int
begin

	update Mesa set Ocupado=0 
	from Mesa.INSERTED
	where ID_Mesa=INSERTED.ID_MESA;

end;

--7.2 Eliminar Reservacion y modificar Mesa--

CREATE TRIGGER T_EliminarReservacion
	ON Reservacion
after delete
as
begin

	UPDATE Mesa set Ocupado=0
	from Reservacion.DELETED
	where ID_Mesa=DELETED.FK_ID_MESA
end;

--7.3 Modificar--

CREATE TRIGGER T_ModificarReservacion
	ON Reservacion
after update
as
begin

	update Mesa set Ocupado=1 
	from Reservacion.UPDATED
	where ID_Mesa=UPDATED.FK_ID_MESA

end;