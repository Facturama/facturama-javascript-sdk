var newClient =
{
	"Id": "",
	"Rfc": "URE180429TM6",
	"Name": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
	"FiscalRegime": "601",
	"Email": "test_email@test.mx",
	"CfdiUse": "G03",
	"TaxResidence": "65000",
	"NumRegIdTrib": "131494-1055",
	"TaxZipCode": "65000",
	"Address":
	{
		"Street": "Calle de Pruebas",
		"ExteriorNumber": "123",
		"InteriorNumber": "456",
		"Neighborhood": "COLOMBIA",
		"ZipCode": "65000",
		"Locality": "NUEVO LEON",
		"Municipality": "ANAHUAC",
		"State": "NUEVO LEON",
		"Country": "Mex"
	},
};

var clientUpdate;

function testCRUDClients() {
	var client;

	try {

		//Creación de un cliente
		Facturama.Clients.Create(newClient, function (result, textStatus, status)
		{
			client = result;
			console.log("Creación =>", result);
			console.log("Estado =>", status.status);

			//Editar el cliente
			client.Rfc = "URE180429TM6";
			client.Email = "update_email@test.com";
			Facturama.Clients.Update(client.Id, client, function (result, textStatus, status)
			{
				console.log("Edición", result);
				if (status.status == 204){alert("Datos Actualizados");}
				console.log("Estado =>", status.status);

				//Obtener el cliente editado
				Facturama.Clients.Get(client.Id, function (result, textStatus, status) 
				{
					client = result;
					console.log("Obtener", result);
					console.log("Estado =>", status.status);

					//Eliminar el cliente creado
					Facturama.Clients.Remove(client.Id, function (rresult, textStatus, status) 
					{
						console.log("Eliminado", result);
						console.log("Estado =>", status.status);
					});
				});

				//Obtener todos los clientes
				Facturama.Clients.List(function (result) 
				{
					clientUpdate = result;
					console.log("Todos", result);
				});
			},  function (error) 
				{
					console.log("Código de respuesta: " + error.status);
					console.log("Mensaje: " + error.messege);
				});

		},	function (error) 
			{
				console.log("Código de respuesta: " + error.status);
				console.log("Mensaje: " + error.messege);
			}); 

		Facturama.Clients.List(function (result) 
		{
			clientUpdate = result;
			console.log("todos", result);
		});

	}	catch (e) 
		{
			console.log("Mensaje de error: " + e.messege);
		}
}

function testListClients()
{

		var search= "XAXX010101000";
		var start=0;
		var length=100;
		Facturama.Clients.List2("start="+start+"&lenght="+length +"&search="+search,function (result) {
			console.log(result);
			console.log(result.recordsTotal);
			console.log(result.recordsFiltered);

			console.log(Object.values(result.data));
			console.log(Object.values(result.data).length)
			console.log(Object.values(result.data).forEach(element=> console.log(element)));
		

			console.log(Object.values(result.data)[0].Id);
			console.log(Object.values(result.data)[0].Rfc);
			console.log(Object.values(result.data)[0].Name);
			console.log(Object.values(result.data)[0].Address);
			console.log(Object.values(result.data)[0].CfdiUse);
			console.log(Object.values(result.data)[0].Email);
			console.log(Object.values(result.data)[0].FiscalRegime);  
		}); 

}
