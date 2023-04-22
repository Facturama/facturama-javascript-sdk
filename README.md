# Facturama JavaScript SDK

[NOTE] This document is also available in [English]

Librería para consumir la API Web y API Multiemisor de [Facturama](https://api.facturama.mx/)
>
>Puedes consultar la guía completa de la [API](https://apisandbox.facturama.mx/guias)


## Crear cuenta de usuario

> Crear una cuenta de usuario en el ambiente de pruebas [Sandbox](https://dev.facturama.mx/api/login) 
>
> Para API Web, realiza la configuración básica usando RFC de pruebas **"EKU9003173C9"**, más información [aquí](https://apisandbox.facturama.mx/guias/perfil-fiscal)
>
> Consulta los Sellos Digitales de prueba (CSD) [aquí](https://apisandbox.facturama.mx/guias/conocimientos/sellos-digitales-pruebas)


## Crear una cuenta en producción

>Crear una cuenta en ambiente de producción, [Producción](https://app.facturama.mx/api/registro)


## Generar Token de autenticación

>Para realizar cualquier llamada a nuestra api deberá generar su token de autentificación basic a partir de su usuario y contraseña
>
><credenciales>
>
>Las credenciales son construidas de esta forma:
>
>El usuario y la contraseña se combinan con dos puntos (pruebas:pruebas2011).
>
>El string resultante está basado en la codificación base64 (cHJ1ZWJhczpwcnVlYmFzMjAxMQ==).

```bash
"Authorization: cHJ1ZWJhczpwcnVlYmFzMjAxMQ=="''
```

Coloca tu token y nombre de usuario en el script facturama.api.js o facturama.api.multiemisor.js

```javascript
var valuesFacturama = {
    token: "cHJ1ZWJhczpwcnVlYmFzMjAxMQ==", 
    url: "https://apisandbox.facturama.mx/",
    useragent: "tu_usuario"

};
```

## Inicio Rápido

### Dependencias

* jQuery http://jquery.com/

# API Web

> Creación de CFDIs con un único emisor, (el propietario de la cuenta, cuyo Perfil Fiscal se tiene configurado)
> 
> *Todas las operaciones son reflejadas en la plataforma web.*

## Operaciones Web API

Facturas
>Crear
> 
>Consultar
>
>Cancelar
> 
>Descargar (XML y PDF)
>
>Enviar por correo
> 

Perfil Fiscal
- Consultar Perfil
- Suscripción actual
- Carga de Logo
- Certificados Digitales
- Catalogos de clientes y productos
- CRUD de Productos, Clientes, Sucursales y Series


### Crear Nuevo Cliente

```javascript
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

Facturama.Clients.Create(newClient, function (result, textStatus, status)
{
    console.log("Nuevo =>", result);
    console.log("Estado =>", status.status);
    },
    function (error) 
    {
        console.log("Código de respuesta: " + error.status);
        console.log("Mensaje: " + error.messege);
    }
); 
    
```

### Eliminar Cliente

```javascript

Facturama.Clients.Remove(client.Id, function (rresult, textStatus, status) 
{
    console.log("Eliminado", result);
    console.log("Estado =>", status.status);
});

```

### Editar Cliente

```javascript

var UpdateClient = 
{
     "Id":"GJ5YJi5rz_-uCcFbfOATDQ2",
    "Rfc": "URE180429TM6",
    "Name": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
    "FiscalRegime": "601",
    "Email": "test_email@test.mx",
    "CfdiUse": "G03",
    "TaxResidence": "65000",
    "NumRegIdTrib": "9999999999",
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


cliente_id="GJ5YJi5rz_-uCcFbfOATDQ2";
Facturama.Clients.Update(client_Id, client, function (result, textStatus, status)
{
    console.log("Edición", result);
    if (status.status == 204){alert("Datos Actualizados");}
    console.log("Estado =>", status.status);
}, function (error) 
{
    console.log("Código de respuesta: " + error.status);
    console.log("Mensaje: " + error.messege);
});

```
### Obtener todos los clientes

```javascript

Facturama.Clients.List(function (result) 
{
    clientUpdate = result;
    console.log("Todos", result);
});

```

### Lista paginada de clientes

```javascript

var search="";
var start=0;
var length=100;
acturama.Clients.List2("start="+start+"&lenght="+length +"&search="+search,function (result) 
{
console.log(result);
};

```

### Obtener Cliente Filtrado por RFC

```javascript
client_Rfc="URE180429TM6";
Facturama.Clients.Get(client.Rfc, function(result)
{console.log("Obtener",result); });

```

### Obtener Ciente Filtrado por ID

```javascript
client_Id="GJ5YJi5rz_-uCcFbfOATDQ2";
Facturama.Clients.Get(client.Id, function(result)
{console.log("Obtener",result); });
```

## Productos
### Agregar Producto

```javascript
var newProduct = {
    "Unit": "Servicio",
    "UnitCode": "E48",
    "IdentificationNumber": "WEB003",
    "Name": "Sitio Web CMS",
    "Description": "Desarrollo e implementación de sitio web empleando un CMS",
    "Price": 6500.0,
    "CodeProdServ": "43232408",
    "CuentaPredial": "123",
    "Taxes": [
    {
        "Name": "IVA",
        "Rate": 0.16,
        "IsRetention": false,
        "IsFederalTax": true
    },
    {
        "Name": "ISR",
        "IsRetention": true,
        "IsFederalTax": true,
        "Total": 0.1
    },
    {
        "Name": "IVA",
        "IsRetention": true,
        "IsFederalTax": true,
        "Total": 0.106667
    }
  ]
};

Facturama.Products.Create(newProduct, function(result, textStatus, status)
{ 
    console.log("Nuevo",result);
    console.log("Estado =>", status.status);
}, function (error) 
   {
        console.log("Código de respuesta: " + error.status);
        console.log("Mensaje: " + error.messege);
   }); 

```

### Listar Productos

```javascript
Facturama.Products.List(function(result)
{ console.log("Todos",result);});
```

### Lista paginada de productos 

```javascript
var search= "";
var start=0;
var length=100;
Facturama.Products.List2("start="+start+"&lenght="+length +"&search="+search,function (result) 
{ 
console.log(result);
};
```

### Obtener Productos por ID

```javascript
product_Id="yogmRnclhMckG5tlFmtAlg2",
Facturama.Products.Get(product_Id, function(result)
{ console.log("Obtener",result); });
```

### Actualizar un producto

```javascript
var producto=
{
    "Id": "yogmRnclhMckG5tlFmtAlg2",
    "Unit": "Servicio",
    "UnitCode": "E48",
    "IdentificationNumber": "WEB003",
    "Name": "Sitio Web CMS",
    "Description": "Desarrollo e implementación de sitio web empleando un CMS",
    "Price": 6500.0,
    "CodeProdServ": "43232408",
    "CuentaPredial": "123",
    "Taxes": [
    {
        "Name": "IVA",
        "Rate": 0.16,
        "IsRetention": false,
        "IsFederalTax": true
    },
    {
        "Name": "ISR",
        "IsRetention": true,
        "IsFederalTax": true,
        "Total": 0.1
    },
    {
        "Name": "IVA",
        "IsRetention": true,
        "IsFederalTax": true,
        "Total": 0.106667
    }
  ]
};
}
product_Id="yogmRnclhMckG5tlFmtAlg2",
Facturama.Products.Remove(product_Id, function(rresult, textStatus, status)
{ 
    console.log("Eliminado", result);
    console.log("Estado =>", status.status);
});
```

### Eliminar Producto

```javascript

product_Id="yogmRnclhMckG5tlFmtAlg2",
Facturama.Products.Remove(product_Id, function(rresult, textStatus, status)
{ 
    console.log("Eliminado", result);
    console.log("Estado =>", status.status);
});

```

## Lugares de Expedición 
### Crear Nueva Sucursal (Branch Office)

```javascript

var newBranch = {
    "Name": "El sauce",
    "Description": "Sucursal del sauce, enfocada en la distribución de agua en garrafón",
    "Address": {
        "Street": "Av. del Sauce",
        "ExteriorNumber": "120",
        "InteriorNumber": "",
        "Neighborhood": "Las Flores",
        "ZipCode": "78116",
        "Locality": "",
        "Municipality": "San Luis Potosi",
        "State": "San Luis Potosi",
        "Country": "México"
    }
};
Facturama.BranchOffice.Create(newBranch,function (result, textStatus, status) 
{
  console.log("Nuevo =>", result);
  console.log("Estado =>", status.status);
},function (error) 
{
  console.log("Código de respuesta: " + error.status);
  console.log("Mensaje: " + error.messege);
});

```

### Listar Sucursales

```javascript
Facturama.BranchOffice.List(function(result)
{ console.log("Todos",result); });
```


## CFDI 4.0
### Tipo Ingreso

```javascript
var newCfdi40= 
{
    "NameId":"1",
    "Folio": "100",
    "CfdiType": "I",
    "Serie": "FAC",
    "Currency": "MXN",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
    "Exportation": "01",
    "OrderNumber": "TEST-001",
    "Date": "2023-04-01T12:00:00-06:00",
    "ExpeditionPlace": "99999",
    //"CurrencyExchangeRate": 20.55,
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "Observations": "Elemento Observaciones solo visible en PDF",
	"Receiver": 
    {
        "Rfc": "ZUÑ920208KL4",
        "Name": "ZAPATERIA URTADO ÑERI",
        "CfdiUse": "G03",
        "FiscalRegime": "601",
        "TaxZipCode": "77060"
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
		"TaxObject":"01",        
        "Total": 1500.0
    }
]
};

Facturama.Cfdi.Create3(newCfdi40, function(result)
{ console.log("Creación",result); });

```

### Complemento Pago 2.0

```javascript
var cfdiInicial = 
{
    "NameId":"1",
    "Folio": "100",
    "CfdiType": "I",
    "Serie": "FAC",
    "Currency": "MXN",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
    "Exportation": "01",
    "OrderNumber": "TEST-001",
    "Date": "2023-04-01T12:00:00-06:00",
    "ExpeditionPlace": "99999",
    //"CurrencyExchangeRate": 20.55,
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "Observations": "Elemento Observaciones solo visible en PDF",
    "Receiver": 
    {
        "Rfc": "ZUÑ920208KL4",
        "Name": "ZAPATERIA URTADO ÑERI",
        "CfdiUse": "G03",
        "FiscalRegime": "601",
        "TaxZipCode": "77060"
    },
    "Items": [
    {
        "ProductCode": "10101504",
        "IdentificationNumber": "EDL",
        "Description": "Estudios de viabilidad",
        "Unit": "NO APLICA",
        "UnitCode": "MTS",
        "UnitPrice": 1281.69,
        "Quantity": 1.0,
        "Subtotal": 1281.69,
        "Discount": 0,
        "TaxObject":"02",
        "Taxes":
        [
            {
                "Total": 205.07,
                "Name": "IVA",
                "Base": 1281.69,
                "Rate": 0.16,
                "IsRetention": false
            }
        ],
            "Total": 1486.76
    }
  ]
};

var complementoPago = 
{	

    "NameId": "14",
    "Folio": "CP-100",
    "Currency": "MXN",
    "ExpeditionPlace": "99999",
    "CfdiType": "P",
    "PaymentForm": null,
    "PaymentMethod": null,
    "PaymentConditions": null,
    "Receiver": 
    {
        "Rfc": "ZUÑ920208KL4",
        "Name": "ZAPATERIA URTADO ÑERI",
        "CfdiUse": "CP01",
        "FiscalRegime": "601",
        "TaxZipCode": "77060"
    },    
	"Complemento": 
    {
	"Payments": 
        [
            {
                "Date": "2019-06-20",       // Fecha del pago
                "PaymentForm": "03",        // Forma  en que se ha recibido el pago (no tiene que ver el CFDI Inicial)
                "Amount": "1486.76", // Monto de la factura oroginal
                "RelatedDocuments": 
                [
                    {
                        "TaxObject": "01", 
                        "Uuid": "C94C8AF3-C774-4D4C-802E-781411934A6E",
                        "Serie": "C",
                        "Folio": "300",
                        "Currency": "MXN",      // Se ejempifica pagando en dolares, (en el caso de que el pago sea con la misma moneda que el cfdi inicial, no lleva ExchangeRate)				
                        "PaymentMethod": "PUE",
                        "PartialityNumber": "1", // Número de Parcialidad
                        "PreviousBalanceAmount": "1486.76", // Lo que faltaba por pagar
                        "AmountPaid": "1486.76",            // Lo que se paga
                        "ImpSaldoInsoluto": "0.00"          // Lo que resta por pagar
                        "Taxes": [
                            {
                                "Name": "IVA",
                                "Rate": "0.16",
                                "Total": 205.07,
                                "Base": 1281.69,
                                "IsRetention": "false"
                            }
                        ]
		
        }]
	 }]
     }
};
var cfdi;
Facturama.Cfdi.Create3(cfdiInicial, function(result)
{       cfdi = result;
        console.log("Creacion de cfdi inicial",result);
});

// Creacion del CFDI "Complemento de pago", referencía al CFDI Inicial (mediante el UUID) y representa uno  de los pagos realizados.                       
omplementoPago.Complemento.Payments[0].RelatedDocuments[0].Uuid = cfdi.Complement.TaxStamp.Uuid;   // Relacionado con el UUID del cfdi inicial 

Facturama.Cfdi.Create3(complementoPago, function(complemento)
{ console.log("creacion de complemento de pago: ",complemento); });

```

## Cancelar CFDI sin UUID

```javascript

//eliminar el cfdi creado
var Cfdi_Id="4DvIUITxTOngiXUsxC28nA2";
var _type="issued";			//Valores posibles (issued | payroll)
var _motive="02"; 			//Valores Posibles (01|02|03|04)
Facturama.Cfdi.Cancel(Cfdi_Id + `?type=${_type}&motive=${_motive}`, function(result, textStatus, status)
{ 
    console.log("Eliminado", result);
    console.log("Estado =>", status.status);
});

```

## Cancelar CFDI con UUID de remplazo

```javascript

//eliminar el cfdi creado
var Cfdi_Id="4DvIUITxTOngiXUsxC28nA2";
var _type="issued";			//Valores posibles (issued | payroll)
var _motive="01"; 			//Valores Posibles (01|02|03|04)
var _uuidReplacement="C94C8AF3-C774-4D4C-802E-781411934A6E";	//(uuid | null)
Facturama.Cfdi.Cancel(Cfdi_Id +`?type=${_type}&motive=${_motive}&uuidReplacement=${_uuidReplacement}` +_uuidReplacement , function(result)
{ console.log("Eliminado",result);});

```

## Descargar Factura

```javascript
Facturama.Cfdi.Download("pdf", "issued", cfdi.Id, function(result){...});
Facturama.Cfdi.Download("xml", "issued", cfdi.Id, function(result){...});
```

## Obtener CFDI con keyword
```javascript
var rfc = "XEXX010101000";
Facturama.Cfdi.List("?type=issued&keyword=" + rfc, function(result){...});
```

## Enviar CFDI por email
```javascript
var email = "ejemplo@ejemplo.mx";
var type = "issued";
var Cfdi_Id="4DvIUITxTOngiXUsxC28nA2";
//console.log("Id del la factura: ",Cfdi_Id);
Facturama.Cfdi.Send("?cfdiType=" + type + "&cfdiId=" + Cfdi_Id + "&email=" + email, function(result)
{console.log("envio", result); });
```


# API Multiemisor

> Creación de CFDIs con múltiples emisores.
>
> *Las operaciones NO se reflejan en la plataforma web.*

## Operaciones API Multiemisor

- Crear, Consultar, Cancelar descarga de XML
- CRUD de CSD (Certificados de los Sellos Digitales).

## Cargar CSD
```javascript
var newCsd = {
    "Rfc": "EKU9003173C9",
    "Certificate": "MIIFuzCCA6OgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0MzQwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MTk0NDE0WhcNMjMwNjE3MTk0NDE0WjCB4jEnMCUGA1UEAxMeRVNDVUVMQSBLRU1QRVIgVVJHQVRFIFNBIERFIENWMScwJQYDVQQpEx5FU0NVRUxBIEtFTVBFUiBVUkdBVEUgU0EgREUgQ1YxJzAlBgNVBAoTHkVTQ1VFTEEgS0VNUEVSIFVSR0FURSBTQSBERSBDVjElMCMGA1UELRMcRUtVOTAwMzE3M0M5IC8gWElRQjg5MTExNlFFNDEeMBwGA1UEBRMVIC8gWElRQjg5MTExNk1HUk1aUjA1MR4wHAYDVQQLExVFc2N1ZWxhIEtlbXBlciBVcmdhdGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCN0peKpgfOL75iYRv1fqq+oVYsLPVUR/GibYmGKc9InHFy5lYF6OTYjnIIvmkOdRobbGlCUxORX/tLsl8Ya9gm6Yo7hHnODRBIDup3GISFzB/96R9K/MzYQOcscMIoBDARaycnLvy7FlMvO7/rlVnsSARxZRO8Kz8Zkksj2zpeYpjZIya/369+oGqQk1cTRkHo59JvJ4Tfbk/3iIyf4H/Ini9nBe9cYWo0MnKob7DDt/vsdi5tA8mMtA953LapNyCZIDCRQQlUGNgDqY9/8F5mUvVgkcczsIgGdvf9vMQPSf3jjCiKj7j6ucxl1+FwJWmbvgNmiaUR/0q4m2rm78lFAgMBAAGjHTAbMAwGA1UdEwEB/wQCMAAwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBCwUAA4ICAQBcpj1TjT4jiinIujIdAlFzE6kRwYJCnDG08zSp4kSnShjxADGEXH2chehKMV0FY7c4njA5eDGdA/G2OCTPvF5rpeCZP5Dw504RZkYDl2suRz+wa1sNBVpbnBJEK0fQcN3IftBwsgNFdFhUtCyw3lus1SSJbPxjLHS6FcZZ51YSeIfcNXOAuTqdimusaXq15GrSrCOkM6n2jfj2sMJYM2HXaXJ6rGTEgYmhYdwxWtil6RfZB+fGQ/H9I9WLnl4KTZUS6C9+NLHh4FPDhSk19fpS2S/56aqgFoGAkXAYt9Fy5ECaPcULIfJ1DEbsXKyRdCv3JY89+0MNkOdaDnsemS2o5Gl08zI4iYtt3L40gAZ60NPh31kVLnYNsmvfNxYyKp+AeJtDHyW9w7ftM0Hoi+BuRmcAQSKFV3pk8j51la+jrRBrAUv8blbRcQ5BiZUwJzHFEKIwTsRGoRyEx96sNnB03n6GTwjIGz92SmLdNl95r9rkvp+2m4S6q1lPuXaFg7DGBrXWC8iyqeWE2iobdwIIuXPTMVqQb12m1dAkJVRO5NdHnP/MpqOvOgLqoZBNHGyBg4Gqm4sCJHCxA1c8Elfa2RQTCk0tAzllL4vOnI1GHkGJn65xokGsaU4B4D36xh7eWrfj4/pgWHmtoDAYa8wzSwo2GVCZOs+mtEgOQB91/g==",
    "PrivateKey": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS8AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbucRFLOMmsAaFNkyWR0dXIAh0CMjE6NpQIMZhQ0HH/4tHgmwh4kCawGjIwERoG6/IH3mCt7u19J5+m6gUEGOJdEMXj976E5lKCd/EG6t6lCq66GE3rgux/nFmeQZvsjLlzPyhe2j+X81LrGudITTjDdgLI0EdbdV9CUJwWbibzrVxjuAVShRh07XPL/DiEw3Wk2+kdy4cfWmMvh0U55p0RKZopNkWuVVSvr3ai7ZNCwHZWDVqkUDpwDDGdyt0kYQ7qoKanIxv/A9wv6ekq0LQ/yLlOcelkxQeb8Glu4RXe+krRvrASw1eBAQ3mvNKpngwF8vtlyoil41PjHUOKALMJtNpywckRRYOk4703ylWIzTfdBlrZ6VmDBjdC5723G1HAx3R/x+o+08++RNiFaN06Ly5QbZZvjnealDfSKz1VKRHWeXggaW87rl4n0SOOWnvabKs4ZWRXTS0dhWK+KD/yYYQypTslDSXQrmyMkpc1Zcb4p9RTjodXxGCWdsR5i5+Ro/RiJvxWwwaO3YW6eaSavV0ROqANQ+A+GizMlxsVjl6G5Ooh6ORdA7jTNWmK44Icgyz6QFNh+J3NibxVK2GZxsQRi+N3HXeKYtq5SDXARA0BsaJQzYfDotA9LFgmFKg9jVhtcc1V3rtpaJ5sab8tdBTPPyN/XT8fA0GxlIX+hjLd3E9wB7qzNR6PZ84UKDxhCGWrLuIoSzuCbr+TD9UCJprsfTu8kr8Pur4rrxm7Zu1MsJRR9U5Ut+O9FZfw4SqGykyTGGh0v1gDG8esKpTW5MKNk9dRwDNHEmIF6tE6NeXDlzovf8VW6z9JA6AVUkgiFjDvLUY5MgyTqPB9RJNMSAZBzrkZgXyHlmFz2rvPqQGFbAtukjeRNS+nkVayLqfQnqpgthBvsgDUgFn03z0U2Svb094Q5XHMeQ4KM/nMWTEUC+8cybYhwVklJU7FBl9nzs66wkMZpViIrVWwSB2k9R1r/ZQcmeL+LR+WwgCtRs4It1rNVkxXwYHjsFM2Ce46TWhbVMF/h7Ap4lOTS15EHC8RvIBBcR2w1iJ+3pXiMeihArTELVnQsS31X3kxbBp3dGvLvW7PxDlwwdUQOXnMoimUCI/h0uPdSRULPAQHgSp9+TwqI0Uswb7cEiXnN8PySN5Tk109CYJjKqCxtuXu+oOeQV2I/0knQLd2zol+yIzNLj5a/HvyN+kOhIGi6TrFThuiVbbtnTtRM1CzKtFGuw5lYrwskkkvenoSLNY0N85QCU8ugjc3Bw4JZ9jNrDUaJ1Vb5/+1GQx/q/Dbxnl+FK6wMLjXy5JdFDeQyjBEBqndQxrs9cM5xBnl6AYs2Xymydafm2qK0cEDzwOPMpVcKU8sXS/AHvtgsn+rjMzW0wrQblWE0Ht/74GgfCj4diCDtzxQ0ggi6yJD+yhLZtVVqmKS3Gwnj9RxPLNfpgzPP01eYyBBi/W0RWTzcTb8iMxWX52MTU0oX9//4I7CAPXn0ZhpWAAIvUmkfjwfEModH7iwwaNtZFlT2rlzeshbP++UCEtqbwvveDRhmr5sMYkl+duEOca5156fcRy4tQ8Y3moNcKFKzHGMenShEIHz+W5KE=",
    "PrivateKeyPassword": "12345678a"
};

    Facturama.Certificates.Create(newCsd, function (result, textStatus, status) 
    {
        certif = result;
        console.log("Se agrega nuevo RFC y CSD,", result);
        console.log("Estado =>", status.status);
    }, function (error) {
        if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
        }
    });
```

## Listar Certificados cargados
```javascript

    Facturama.Certificates.List(function (result) {
        console.log("Todos los CSD ", result);
    });

```

## Obtener Certificado de un RFC
```javascript

    Facturama.Certificates.Get("EKU9003173C9", function (result) {
        certif = result;
        console.log("Obtener CSD de un RFC ", result);
    });


```

## Eliminar un  Certificado
```javascript

    Facturama.Certificates.Remove("EKU9003173C9", function (result) {
        console.log("se elimino", result);
    }, function (error) {
        if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
        }
    });


```


## Actualizar un Certificado
```javascript

    newCsd.PrivateKeyPassword = "12345678";
    Facturama.Certificates.Update("EKU9003173C9", newCsd, function (result) {
        certif = result;
        console.log("actualizacion csd", result);
    }, function (error) {
        if (error && error.responseJSON) {
            console.log("errores", error.responseJSON);
        }
    });
}

```


## Crear un CFDI 4.0
```javascript
var newCfdi = {
    "NameId":"1",
    "Folio": "100",
    "CfdiType": "I",
    "Serie": "FAC",
    "Currency": "MXN",
    "PaymentForm": "03",
    "PaymentMethod": "PUE",
    "Exportation": "01",
    "OrderNumber": "TEST-001",
    "Date": "2023-04-01T12:00:00-06:00",
    "ExpeditionPlace": "99999",
    //"CurrencyExchangeRate": 20.55,
    "PaymentConditions": "CREDITO A SIETE DIAS",
    "Observations": "Elemento Observaciones solo visible en PDF",
    "Issuer":{
        "Rfc": "URE180429TM6",
        "Name": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
        "FiscalRegime": "601"        
    },
    "Receiver": 
    {
        "Rfc": "EKU9003173C9",
        "Name": "ESCUELA KEMPER URGATE",
        "CfdiUse": "P01",
        "FiscalRegime": "603", 	
        "TaxZipCode": "26015"	
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

Facturama.Cfdi.Create3(newCfdi, function(result, textStatus, status)
{
    cfdi = result;
    console.log("Creación =>", result);
	console.log("Estado =>", status.status);
}, function(error) 
{
    if (error && error.responseJSON) 
    {
        console.log("errores", error.responseJSON);
    }
});        

```

[English]: ./README-en.md
