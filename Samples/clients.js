var newClient = 
{
	"Id":"",
	"Rfc": "URE180429TM6",
    "Name": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
    "FiscalRegime": "601",
    "Email": "pruebas@facturama.mx",
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

function testCRUDClients() 
{
	var client;
	//creacion de un cliente
	Facturama.Clients.Create(newClient, function(result)
	{ 
		client = result;
		console.log("Creación",result);
    
	    //editar el cliente
	    client.Rfc = "URE180429TM6";
	    Facturama.Clients.Update(client.Id, client, function(result)
		{ 
			console.log("Edición", result);

			//obtener el cliente editado
			Facturama.Clients.Get(client.Id, function(result)
			{
				client = result;
				console.log("Obtener",result);

				//eliminar el cliente creado
				Facturama.Clients.Remove(client.Id, function(result){ 
					console.log("Eliminado",result);
				});
			});

			//obtener todos los clientes
			Facturama.Clients.List(function(result){ 
				clientUpdate = result;
				console.log("todos",result);
			});
		});

	});
}