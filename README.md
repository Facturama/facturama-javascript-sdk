# Facturama JavaScript SDK

[NOTE] This document is also available in [English]

Librería para consumir la API Web y API Multiemisor de [Facturama](https://api.facturama.mx/)

Puedes consultar la guía completa de la [API](https://apisandbox.facturama.mx/guias)


## Crear cuenta de usuario  

> Crear una cuenta de usuario en el ambiente de pruebas [Sandbox](https://dev.facturama.mx/api/login) 
>
> Para API Web, realiza la configuración básica usando RFC de pruebas **"EKU9003173C9"**, más información [aquí](https://apisandbox.facturama.mx/guias/perfil-fiscal)
>
> Consulta los Sellos Digitales de prueba (CSD) [aquí](https://apisandbox.facturama.mx/guias/conocimientos/sellos-digitales-pruebas)


## Crear una cuenta en producción

>Crear una cuenta en ambiente de [Producción](https://app.facturama.mx/api/registro)


## Generar Token de autenticación

>Para realizar cualquier llamada a la API deberá generar su token de autentificación basic a partir de su usuario y contraseña
>
>Las credenciales son construidas de esta forma:
>
>El usuario y la contraseña se combinan uniendo con dos puntos ( **pruebas:pruebas2011** ) y posteriomente se debe conbertir en formato **base64**
>
>Este es el resultado despues de la conversión (**cHJ1ZWJhczpwcnVlYmFzMjAxMQ==**)

```bash
"Authorization: Basic cHJ1ZWJhczpwcnVlYmFzMjAxMQ=="
```

Coloca en ednpoint,tu token y nombre de usuario en el script **facturama.api.js** o **facturama.api.multiemisor.js**

### Endpoints 
>Sandbox = https://apisandbox.facturama.mx/   
>Producción = https://apisandbox.facturama.mx/

```javascript
var valuesFacturama = 
{
    token: "cHJ1ZWJhczpwcnVlYmFzMjAxMQ==", 
    url: "https://apisandbox.facturama.mx/",
    useragent: "tu_usuario",
};
```

## Inicio Rápido

### Dependencias

* jQuery http://jquery.com/

# API Web

> Creación de CFDI con un único emisor, (el propietario de la cuenta, cuyo Perfil Fiscal se tiene configurado)
> 
> *Todas las operaciones son reflejadas en la plataforma web.*

## Operaciones Web API

### Facturas
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


### Perfil Fiscal  

>Consultar Perfil
>
>Suscripción actual
>
>Carga de Logo
>
>Certificados Digitales
>
>Catalogos de clientes y productos
>
>CRUD de Productos, Clientes, Sucursales y Series

___   

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
Facturama.Clients.List(function (result, textStatus, status) 
{
    clientUpdate = result;
    console.log("Todos", result);
    console.log("Estado =>", status.status);
});

```

### Lista paginada de clientes

```javascript

var search="";
var start=0;
var length=100;
Facturama.Clients.List2("start="+start+"&lenght="+length +"&search="+search,function (result) 
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
Facturama.Products.Update(product_Id, producto, function(result, textStatus, status)
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
### Crear nueva sucursal (Branch Office)

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

## Perfil Fiscal
``` javascript
Facturama.TaxEntity.Get(function(result, textStatus, status)
{ 
    console.log("Datos cuenta ",result);
    console.log("Estado =>", status.status);
    });
```

### Cargar Logo

### Subir CSD

```javascript
var newCsd = {
	"Certificate": "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",
	"PrivateKey": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS9AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbucRBAKNQXH8tz2zJ7hdZaOZx7PEfMiWh5Nh6e8G8kxY+GW4YCSbLxslkhBtfTR6v5JYv3vhgH7XzMCwJPOfX6gxeeCYZ4HTdDNAyBVCjTbJpqbo778ri33o+I4yx7zgMqA3mzVE61re6MPrGXh1YT/K9zZeEdmwvXQfPs9VnioKUhiswoMcJ3kc3FxGLrEAsjQqv/ZVOHPY3NrbcfpQUyprsCKv3rRdxkIRdMPY4eiA720mffzvDqyzeQ8xfwHTE8Xjunja4KXvW/mV7ItTH0vRXHc3HJQ0dNnyawXmbC1FiYbCVdswoYuVQmslvq3QEXUGwP3KYfxQzKatnU7nprkmsipPqPBqDrzqc6NSN/8rxIc5zTAL4bFul+CEKz9VybwdavgewEy7u3fPnKPN+y4HilNgmlbtS7seWpbIgVPA+woG2Ph5hsgREXZCjGKSRuI77/FLcI5CMrZR+FvbnaqG+gXDBTz2lWhK9pmWlVawT2pvfiHOLzYRf2YyuVbJ79D2EgbUKyp3kCQ6fddMzspPhD/pvLQizExeyIxImb/kQXs2mmtDnyFIsj4Hcn5wCcs+SDIj+FJnwRiKB6YfdzjIig/ZMfpgMpl0u69LX649uL318o+Hy3d5t3wxgSkTaJ5McKhWyh9x9vlHZhYyM6HArBNfP9cGF86M3GwAMHAiJQl9UevyKe6rlvAIDlop6l3M02m5hHUXUpPjz4j7inFXZzvSv0tFoSbEqGgno0Pa+0gWHqRwBEGLGEwHVfyEy+Of8g4+0jzo0jNPIcurA5xRh9HSRSAd3kdEhx75eeVL7lBdLjRUkbtRtg7nelSjqAX7tQZK6Awp5C/17W96+f/vtjB+Y+ZgrSUjnQDADnZCnapIrzHgE3ZanhGAtnMMl+o4aLd1+74inG4jht/GJB60raSQfYrDrM3kBs0oyfpbEk5TI8ISzRlRmejv+mqpTogJaAqhnLP7rAli3d4pRhUjbACn/xQSFKxl2OURdmnMlvlbb6pleXviJHRxzPPQ25NVdWvmCYWrDfAZYn8X1sABOdyrth38BfmAVsyyPATYFB+5cXuNIZkPz1swz3859iZWTn5JRfPEAGICu5G6w6nrgOLYM9UqOPmxofzEdiEPafLQ5orMxdSWF6+3mD2Yw/VP+B43B/oYehgfrYjBUJt2D04VU/v8XK1ZUVgX/Co0odcdcszAP+ljQ7UVhW+uxVMd2sEprwepPPjYT3HvdI6RBB94yYBWfkoCSo/jsrrRpw2DVEyvoDp/hOXKyt8Y/8UGLCxJUhhv5fEiezYnlUAmwAGjgZfzfAErx0gkQFBgNKglEA7jz0Dqc2Z92pGVGTyPtXqRsqX3IYX5WsZVUoJim0wI7+LNmKpu147ePC0G4Sf4AGoZyPWVXq2SZSPpN261pIKSoLEDeA8WIKj2U5JG2DMMYokV0bZ1TsabrwHvwsp3muLnaP8L+n2fBplbhAEE2buBXvsATixMGu57ZI5WKFLnHn4KIBrZzALCtGehfFbCsdf1nBR6aAt+BpWhhZki54fZTurgMr6zuC5hAaP4rExW+LCc3upHMW7R9DcHWaZuZIfwnVDImnAQ9UOsz+A=",
	"PrivateKeyPassword": "12345678a"
  };

  			  Facturama.TaxEntity.UploadCsd(newCsd, function(result)
			  { 
				  clientUpdate = result;
				  console.log("Carga de CSD",result);
  
				  Facturama.TaxEntity.Get(function(result)
				  { 
					  taxentity = result;
					  console.log("Datos cuenta modif",result);
				  });
  
			  }, 
			  function(error) 
			  {
				  if (error && error.responseJSON) 
				  {
					  console.log("errores", error.responseJSON);
				  }
					  
			  });
```

### Obtener Informacion Fiscal

### Actualizar Informacion Fiscal

### Plan de Subscripcion

``` javascript
Facturama.SuscriptionPlan.Get(function (result, textStatus, status) 
{
    console.log("Obtener =>", result);
    console.log("Estado =>", status.status);
});
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

## Descargar CFDI  


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
