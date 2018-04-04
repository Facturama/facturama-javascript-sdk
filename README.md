# Facturama-Javascript-SDK
Libreria para consumir la API Web de Facturama.

Basic Usage
-----------

See https://www.api.facturama.com.mx/

Dependencies
------------
* jQuery http://jquery.com/

## CFDI 3.3
Creacion de CFDI 3.3
```javascript
var cfdi = new Cfdi
{
    Serie = "R",
    Currency = "MXN",
    ExpeditionPlace = "78116",
    PaymentConditions = "CREDITO A SIETE DIAS",
    CfdiType = CfdiType.Ingreso,
    PaymentForm = "03",
    PaymentMethod = "PUE",
    Receiver = new Receiver
    {
        Rfc = "RSS2202108U5",
        Name = "RADIAL SOFTWARE SOLUTIONS",
        CfdiUse = "P01"
    },
    Items = new List<Item>
    {
        new Item
        {
            ProductCode = "10101504",
            IdentificationNumber = "EDL",
            Description = "Estudios de viabilidad",
            Unit = "NO APLICA",
            UnitCode = "MTS",
            UnitPrice = 50.00m,
            Quantity = 2.00m,
            Subtotal = 100.00m,
            Taxes = new List<Tax>
            {
                new Tax
                {

                    Total = 16.00m,
                    Name = "IVA",
                    Base = 100.00m,
                    Rate = 0.160000m,
                    IsRetention = false
                }
            },
            Total = 116.0m
        }
    }
};

Facturama.Cfdi.Create(cfdi, function(result){...}, function(error) {...});
```
Cancelación
```javascript
Facturama.Cfdi.Cancel(cfdi.Id + "?type=issued", function(result){...}, function(error) {...});
```
Descarga en el formato deseado xml, html ó pdf
```javascript
Facturama.Cfdi.Download("pdf", "issued", cfdi.Id, function(result){...}, function(error) {...});
Facturama.Cfdi.Download("xml", "issued", cfdi.Id, function(result){...}, function(error) {...});
```
Consulta tus facturas en cualquier momento mediante una palabra clave ó algun atributo en específico
```javascript
var rfc = "XEXX010101000";
Facturama.Cfdi.List("?type=issued&keyword=" + rfc, function(result){);
```

## Otras Operaciones
* Consultar Perfil y Suscripción actual,
* Carga de Logo y Certificados Digitales
* CRUD de Productos, Clientes, Sucursales y Series.
