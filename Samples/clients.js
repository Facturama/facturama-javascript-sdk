var newClient = {
    "Email": "pruebas@gmail.com",
    "Address": {
        "Street": "Av Seguridad Soc",
        "ExteriorNumber": "123",
        "InteriorNumber": "",
        "Neighborhood": "Fidel Velazquez",
        "ZipCode": "78436",
        "Locality": "",
        "Municipality": "Soledad de Graciano Sánchez",
        "State": "San Luis Potosí",
        "Country": "Mex"
    },
    "Rfc": "ROAM861021459",
    "Name": "Manuel Romero Alva",
    "CfdiUse": "P01",
};

var clientUpdate;

function testCRUDClients() {
	var client;
	//creacion de un cliente
	Facturama.Clients.Create(newClient, function(result){ 
		client = result;
		console.log("creacion",result);
    
	    //editar el cliente
	    client.Rfc = "XAXX010101000";
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