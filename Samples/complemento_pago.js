/**
 * Ejemplo del Complemento de pago API Web
 * 
 * puedes ver mas información en: https://apisandbox.facturama.mx/guias/api-web/cfdi/complemento-pago
 */


// El cfdi incial, es un CFDI regular, con la variante del "Método de pago"
var cfdiInicial = {
    "Serie": "R",
    "Currency": "MXN",
    "ExpeditionPlace": "78116",
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "Folio": "101",
    "CfdiType": "I",
    "NameId" : "1",                 // Nombre factura
    // "PaymentForm": "01",         // No es necesario especificar la forma de pago
    "PaymentMethod": "PPD",         // El método de pago es "Por definir"
    "Issuer": {
        "FiscalRegime": "601",
        "Rfc": "AAA010101AAA",
        "Name": "EXPRESION EN SOFTWARE"
    },
    "Receiver": {
        "Rfc": "XAXX010101000",
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
    }
  ]
};



var complementoPago = 
{	
	"Receiver": {
		"Rfc": "XAXX010101000",
        "Name": "RADIAL SOFTWARE SOLUTIONS",
        "CfdiUse": "P01"
    },
    "NameId" : "14",                 // Nombre Complemento de pago
    "CfdiType": "P",                    // El tipo de CFDI es "P"	    
	"Folio": "102",
	"ExpeditionPlace": "51873",
	"Complemento": {
		"Payments": [{
			"Date": "2019-06-20",       // Fecha del pago
			"PaymentForm": "03",        // Forma en que se ha recibido el pago (no tiene que ver el CFDI Inicial)
			"Amount": "1856.00",
			"RelatedDocuments": [{
				"Uuid": "C94C8AF3-C774-4D4C-802E-781411934A6E",
				"Serie": "R",
				"Folio": "102",
				"Currency": "MXN",      // Se ejempifica pagando en dolares, (en el caso de que el pago sea con la misma moneda que el cfdi inicial, no lleva ExchangeRate)				
				"PaymentMethod": "PUE",
				"PartialityNumber": "1",
				"PreviousBalanceAmount": "1856.00", // Lo que faltaba por pagar
				"AmountPaid": "1856.00",            // Lo que se paga
				"ImpSaldoInsoluto": "0.00"          // Lo que resta por pagar
			}]
		}]
	}
}





var clientUpdate;
function testPaymentComplement() {
    var cfdi;

    //creacion de un CFDI Inicial, (Tiene el método de pago en 'por definir') 
    Facturama.Cfdi.Create(cfdiInicial, function(result){ 
        cfdi = result;
        console.log("creacion de cfdi inicial",result);
    
        //enviar el cfdi al cliente		
		var email = "chucho@facturama.mx";
	    var type = "issued";            // Las emitidas en Multiemisor son: issuedLite
	    Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + cfdi.Id + "&email=" + email, function(result){ 
			console.log("envio", result);
        });
        


        // Creacion del CFDI "Complemento de pago", referencía al CFDI Inicial (mediante el UUID) y representa uno  de los pagos realizados.                       
        complementoPago.Complemento.Payments[0].RelatedDocuments[0].Uuid = cfdi.Complement.TaxStamp.Uuid;   // Relacionado con el UUID del cfdi inicial        

        Facturama.Cfdi.Create(complementoPago, function(complemento){             
            console.log("creacion de complemento de pago: ",complemento);
        
            //enviar el complemento de pago al cliente            
            var email = "chucho@facturama.mx";
            var type = "issued";            // Las emitidas en Multiemisor son: issuedLite
            Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + complemento.Id + "&email=" + email, function(result){ 
                console.log("envio", result);
            });            
    
          }, function(error) {
            if (error && error.responseJSON) {
                console.log("errores", error.responseJSON);
            }
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