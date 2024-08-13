var newCfdi40 = {
    //"Serie": "B",
    "Currency": "MXN",
    "ExpeditionPlace": "78000",
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "Folio": "100",
    "CfdiType": "I",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
    "Issuer":{
        "Rfc": "EKU9003173C9",
        "Name": "ESCUELA KEMPER URGATE",
        "FiscalRegime": "601"        
    },
    "Receiver": 
    {
        "Rfc": "EKU9003173C9",
        "Name": "ESCUELA KEMPER URGATE",
        "CfdiUse": "G03",
        "FiscalRegime": "603", 	
        "TaxZipCode": "42501"	
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
        "TaxObject": "02",
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
        "TaxObject":"02",
        "Taxes": [{
            "Total": 240.0,
            "Name": "IVA",
            "Base": 1500.0,
            "Rate": 0.16,
            "IsRetention": false
        }],
        "Total": 1740.0
    }
  ]
};

var clientUpdate;
function testCRUDCfdiMultiEmisor40() {
    var cfdi;

    //creacion de un CFDI MULTIEMISOR
    Facturama.Cfdi.Create3(newCfdi40, function(result){ 
        cfdi = result;
        console.log("creacion multiemisor",result);
    
        //descargar el XML del cfdi
        
    Facturama.Cfdi.Download("xml", "issuedLite", cfdi.Id, function(result)
    {
        console.log("descarga multiemisor",result);

        var blob = converBase64toBlob(result.Content, 'application/xml');
        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
    });
    
    //cancelar el cfdi creado
	var _motive="02"; 			//Valores Posibles (01|02|03|04)
	var _uuidReplacement="null";	//(uuid | null)
    Facturama.Cfdi.Cancel(cfdi.Id + "?motive=" +_motive + "&uuidReplacement=" +_uuidReplacement , function(result){ 
        console.log("eliminado",result);
    });

    //obtener todos los cfdi con cierto rfc
    
    var rfc = "EKU9003173C9";
    Facturama.Cfdi.List("?rfc=" + rfc, function(result)
    { 
        clientUpdate = result;
        console.log("todos",result);
    });
    
      //enviar el cfdi al cliente con correo alternativo
      var email = "Correo_destinatario@ejemplo.com";
      var type = "issuedLite";
      var subject = "";
      var comments = "";
      var issuerEmail = "correo_cliente_emisor@ejemplo.com";
      Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + cfdi.Id + "&email=" + email + "&subject=" + subject + "&comments=" + comments + "&issuerEmail=" + issuerEmail,function (result) 
      {
          console.log("envio", result);
      });
       
   

  	}, function(error) {
        if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
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