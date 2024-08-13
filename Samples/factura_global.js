var newCfdi= 
{
    //"Serie": "C",
    "Currency": "MXN",
    "ExpeditionPlace": "78000",
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "CfdiType": "I",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
	"GlobalInformation": 
    {
        "Periodicity": "04",
        "Months": "04",
        "Year": "2024"
    },
	"Receiver": 
    {
        "Rfc": "XAXX010101000",
        "Name": "PUBLICO EN GENERAL",
        "CfdiUse": "S01",
        "FiscalRegime": "616",
        "TaxZipCode": "78000"
    },
    "Items": 
	[{
        "ProductCode": "10101504",
        "IdentificationNumber": "EDL",
        "Description": "Estudios de viabilidad",
        "Unit": "NO APLICA",
        "UnitCode": "MTS",
        "UnitPrice": 50.0,
        "Quantity": 2.0,
        "Subtotal": 100.0,
		"TaxObject": "02",  	// Nuevos elementos para CFDi 4.0
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
		"TaxObject":"01",        
        "Total": 1500.0
    }

]
};


var clientUpdate;

function testfactura_global() {
	var cfdi;

	//creación de un cfdi 4.0 FacturaGlobal
	Facturama.Cfdi.Create3(newCfdi, function(result){ 
		cfdi = result;
		console.log("creacion",result);
    
	}, function(error) {
		if (error && error.responseJSON) {
            console.log("Errores", error.responseJSON);
        }		
	});
	
	//creación de un cfdi 4.0
	newCfdi.ExpeditionPlace = "78000";
	Facturama.Cfdi.Create3(newCfdi, function(result)
	{ 
		cfdi = result;
		Cfdi_Id=cfdi.Id;
		console.log("Creación",result);
    

		//descargar el PDF del cfdi
		Facturama.Cfdi.Download("pdf", "issued", Cfdi_Id, function(result){
			console.log("Descarga",result);

			blob = converBase64toBlob(result.Content, 'application/pdf');

			var blobURL = URL.createObjectURL(blob);
			window.open(blobURL);
		});

		//descargar el XML del cfdi
		Facturama.Cfdi.Download("xml", "issued", Cfdi_Id, function(result){
			console.log("Descarga",result);

			blob = converBase64toBlob(result.Content, 'application/xml');

			var blobURL = URL.createObjectURL(blob);
			window.open(blobURL);
		});

        //enviar el cfdi al cliente
		var email = "ejemplo@ejemplo.mx";
	    var type = "issued";
        //console.log("Id del la factura: ",Cfdi_Id);
	    Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + Cfdi_Id + "&email=" + email, function(result){ 
			console.log("envio", result);
		});

		//eliminar el cfdi creado
		var _type="issued";			//Valores posibles (issued | payroll)
		var _motive="02"; 			//Valores Posibles (01|02|03|04)
		var _uuidReplacement="null";	//(uuid | null)
		Facturama.Cfdi.Cancel(Cfdi_Id + "?type=" + _type + "&motive=" + _motive + "&uuidReplacement=" +_uuidReplacement , function(result){ 
			console.log("Eliminado",result);
		});		

	}, function(error) {
		if (error && error.responseJSON) {
            console.log("Errores", error.responseJSON);
        }
		
	});
}

function converBase64toBlob(content, contentType) {
	contentType = contentType || '';
	var sliceSize = 512;
	var byteCharacters = window.atob(content); //method which converts base64 to binary
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);
		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
	  		byteNumbers[i] = slice.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {type: contentType}); //statement which creates the blob
	return blob;
}