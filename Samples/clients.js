var newClient = {
	"Id":"",
    "Address": {
        "Street": "Calle de Pruebas",
        "ExteriorNumber": "123",
        "InteriorNumber": "456",
        "Neighborhood": "Santa Teresa",
        "ZipCode": "10740",
        "Locality": "Ciudad de México",
        "Municipality": "La Magdalena Contreras",
        "State": "DISTRITO FEDERAL",
        "Country": "Mex"
    },
    "Rfc": "CACX7605101P8",
    "Name": "XOCHILT CASAS CHAVEZ",
    "FiscalRegime": "605",
    "Email": "pruebas@facturama.mx",
    "CfdiUse": "P01",
    "TaxResidence": "10740",
    "NumRegIdTrib": "",
    "TaxZipCode": "10740"
};

var clientUpdate;

function testCRUDClients() {
	var client;
	//creacion de un cliente
	Facturama.Clients.Create(newClient, function(result){ 
		client = result;
		console.log("creacion",result);
    
	    //editar el cliente
	    client.Rfc = "CACX7605101P8";
	    Facturama.Clients.Update(client.Id, client, function(result){ 
			console.log("edicion", result);

			//obtener el cliente editado
			Facturama.Clients.Get(client.Id, function(result){
				client = result;
				console.log("obtener",result);

				//eliminar el cliente creado
				Facturama.Clients.Remove(client.Id, function(result){ 
					console.log("eliminado",result);
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