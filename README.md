# Facturama-Javascript-SDK
Librería para consumir la API Web de Facturama.

Uso Básico
-----------
See https://api.facturama.mx/

Dependencias
------------
* jQuery http://jquery.com/

## CFDI 3.3
Creación de CFDI 3.3
```javascript
var cfdi = {
  "Serie": "R",
  "Currency": "MXN",
  "ExpeditionPlace": "78116",
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
      "Taxes": [
        {
          "Total": 16.0,
          "Name": "IVA",
          "Base": 100.0,
          "Rate": 0.16,
          "IsRetention": false
        }
      ],
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
      "Taxes": [
        {
          "Total": 240.0,
          "Name": "IVA",
          "Base": 1500.0,
          "Rate": 0.16,
          "IsRetention": false
        }
      ],
      "Total": 1740.0
    }
  ]
};

Facturama.Cfdi.Create(cfdi, function(result){...}, function(error) {...});
```
Cancelación
```javascript
Facturama.Cfdi.Cancel(cfdi.Id + "?type=issued", function(result){...}, function(error) {...});
```
Descarga en el formato deseado xml, html ó pdf
```javascript
Facturama.Cfdi.Download("pdf", "issued", cfdi.Id, function(result){...});
Facturama.Cfdi.Download("xml", "issued", cfdi.Id, function(result){...});
```
Consulta tus facturas en cualquier momento mediante una palabra clave ó algun atributo en específico
```javascript
var rfc = "XEXX010101000";
Facturama.Cfdi.List("?type=issued&keyword=" + rfc, function(result){...});
```

## Otras Operaciones
* Consultar Perfil y Suscripción actual,
* Carga de Logo y Certificados Digitales
* CRUD de Productos, Clientes, Sucursales y Series.
