var newClient =
{
	"Id": "",
	"Rfc": "URE180429TM6",
	"Name": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
	"FiscalRegime": "601",
	"Email": "test_email@test.mx",
	"CfdiUse": "G03",
	"TaxResidence": "86991",
	"NumRegIdTrib": "131494-1055",
	"TaxZipCode": "86991",
	"Address":
	{
		"Street": "Calle de Pruebas",
		"ExteriorNumber": "123",
		"InteriorNumber": "456",
		"Neighborhood": "COLOMBIA",
		"ZipCode": "86991",
		"Locality": "NUEVO LEON",
		"Municipality": "ANAHUAC",
		"State": "NUEVO LEON",
		"Country": "Mex"
	},
};

var clientUpdate;

function NuevoCliente() {
	var client;
	try {
		Facturama.Clients.Create(newClient, function (result, testStatus, status) {
			client = result;
			console.log("Creación =>", result);
			console.log("Estado =>", status.status);

		}, function (error) {
			console.log("Código de respuesta: " + error.status);
			console.log("Mensaje: " + error.messege);
		});
	}
	catch (e) {
		console.log("Mensaje de error: " + e.message);
	}

}

function EditarCliente() {

	try {
		var client;
		var IdClient = "1CMATRSzNovIpge-mkzwFw2";
		client = Facturama.Clients.Get(IdClient, function (result, textStatus, status) {
			client = result;
			console.log("Obtener", result);
			console.log("Estado =>", status.status);
			client.Rfc = "URE180429TM6";
			client.Email = "update_email@test.com";

			Facturama.Clients.Update(IdClient, client, function (result, testStatus, status) {
				onsole.log("Edición", result);
				if (status.status == 204) { alert("Datos Actualizados"); }
				console.log("Estado =>", status.status);

			}, function (error) {
				console.log("Código de respuesta: " + error.status);
				console.log("Mensaje: " + error.message);
			});
		});
	}
	catch (e) {
		console.log("Mensaje de error: " + e.message);
	}
}

function EliminarCliente() {
	var IdClient = "1CMATRSzNovIpge-mkzwFw2";
	Facturama.Clients.Remove(IdClient, function (result, textStatus, status) {
		console.log("Eliminado", result);
		console.log("Estado =>", status.status);

	});
};


function ListarCliente() {
	Facturama.Clients.List(function (result) {
		clientUpdate = result;
		console.log("Todos", result);
	});
}

function ListaPaginada() {

	var search = "XAXX010101000";
	var start = 0;
	var length = 100;
	Facturama.Clients.List2("start=" + start + "&lenght=" + length + "&search=" + search, function (result) {
		console.log(result);
		console.log(result.recordsTotal);
		console.log(result.recordsFiltered);

		console.log(Object.values(result.data));
		console.log(Object.values(result.data).length)
		console.log(Object.values(result.data).forEach(element => console.log(element)));


		console.log(Object.values(result.data)[0].Id);
		console.log(Object.values(result.data)[0].Rfc);
		console.log(Object.values(result.data)[0].Name);
		console.log(Object.values(result.data)[0].Address);
		console.log(Object.values(result.data)[0].CfdiUse);
		console.log(Object.values(result.data)[0].Email);
		console.log(Object.values(result.data)[0].FiscalRegime);
	});
}
