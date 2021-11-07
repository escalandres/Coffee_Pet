var  consultQuery = function(query){
	var connection =  new  sql.ConnectionPool(config);
	connection.connect(function(err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
		}
		else {
			var request = new sql.Request(connection);
			request.query(query, function (err, recordset) {
				if (err) {
					console.log("Error while querying database :- " + err);
				}
				else {
					console.log("Aqui vamosss");
					resultIDs = recordset.rowsAffected;
					console.log("resultID: "+resultIDs);
				}
				connection.close();
			});
		}
	});
}

function consultIDs(table){
	
	const queryID = 'SELECT * FROM '+table;
	consultQuery(queryID);
	setTimeout(async () => {
		numIDs = parseInt(resultIDs);
		console.log("numID: "+numIDs);
		numIDs = numIDs+1000;
		console.log("numID2: "+numIDs);
    }, 3000);
}

var  executeQuery = function(res, query){
	var connection =  new  sql.ConnectionPool(config);
	connection.connect(function(err) {
    // ...
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request(connection);
			// query to the database
			request.query(query, function (err, recordset) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
    				console.log(recordset);
				}
				connection.close();
			});
		}
	});
}
let userEmail = async (email) => { // función tipo async devolverá una Promesa
	try {
		await sql.connect(config); // conectamos a la DB
		let db = new sql.Request();
		let n=39;
		let m = String.fromCharCode(n)
		console.log("email: "+email);
		let Email = "Select _Password from Usuarios where Email="+m+email+m+'';
		let result = await db.query(Email); // almacenamos el resultado de la Promesa
		console.log(result);
		let id = result.recordset[0]._Password; // Obtenemos el id
		return id; // devolvemos el resultado
	} catch (err) {
		console.log(err.message);
		throw err;
	}
}