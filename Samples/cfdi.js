var newCfdi = {
    "Serie": "R",
    "Currency": "MXN",
    "ExpeditionPlace": "99999",
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "CfdiType": "I",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
    "Receiver": {
        "Rfc": "RSS2202108U5",
        "Name": "RADIAL SOFTWARE SOLUTIONS",
        "CfdiUse": "P01"
    },
    "Items": [
    {
        "ProductCode": "10101504",
        "IdentificationNumber": "EDL",
        "Description": "Estudios de viabilidad",
        "Unit": "NO APLICA",
        "UnitCode": "MTS",
        "UnitPrice": 50.0,
        "Quantity": 2.0,
        "Subtotal": 100.0,
        "Taxes": [{
            "Total": 16.0,
            "Name": "IVA",
            "Base": 100.0,
            "Rate": 0.16,
            "IsRetention": false
        }],
        "Total": 116.0
    },
    {
        "ProductCode": "10101504",
        "IdentificationNumber": "001",
        "Description": "SERVICIO DE COLOCACION",
        "Unit": "NO APLICA",
        "UnitCode": "E49",
        "UnitPrice": 100.0,
        "Quantity": 15.0,
        "Subtotal": 1500.0,
        "Discount": 0.0,
        "Taxes": [{
            "Total": 240.0,
            "Name": "IVA",
            "Base": 1500.0,
            "Rate": 0.16,
            "IsRetention": false
        }],
        "Total": 1740.0
    }]
};

var clientUpdate;

function testCRUDCfdi() {
	var cfdi;
	//creacion de un CFDI con error
	Facturama.Cfdi.Create(newCfdi, function(result){ 
		cfdi = result;
		console.log("creacion",result);
    
	}, function(error) {
		if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
        }		
	});


	//creacion de un cfdi
	newCfdi.ExpeditionPlace = "78220";
	newCfdi.Serie = null;
	Facturama.Cfdi.Create(newCfdi, function(result){ 
		cfdi = result;
		console.log("creacion",result);
    
	    //enviar el cfdi al cliente
	    var email = "norma@facturama.com.mx";
	    var type = "issued";
	    Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + cfdi.Id + "&email=" + email, function(result){ 
			console.log("envio", result);
		});

		//descargar el PDF del cfdi
		Facturama.Cfdi.Download("pdf", "issued", cfdi.Id, function(result){
			console.log("descarga",result);
			window.open("data:application/pdf;base64," + Base64.encode(result));
		});

		//eliminar el cliente creado
		// Facturama.Cfdi.Remove(client.Id, function(result){ 
		// 	console.log("eliminado",result);
		// });

		// //obtener todos los clientes
		// var res = Facturama.Cfdi.List(function(result){ 
		// 	clientUpdate = result;
		// 	console.log("todos",result);
		// });

	}, function(error) {
		if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
        }
		
	});
}