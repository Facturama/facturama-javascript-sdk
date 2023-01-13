var newProduct = 
{
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

var productUpdate;

function testCRUDProducts() 
{
try {

            var product;
            //Creación de un producto
            Facturama.Products.Create(newProduct, function(result, textStatus, status)
            { 
                product = result;
                console.log("creacion",result);
                console.log("Estado =>", status.status);
            
                //Editar el producto
                product.Description = "CONCEPTO EDITADO";
                Facturama.Products.Update(product.Id, product, function(result, textStatus, status)
                { 
                    console.log("edicion", result);
                    if (status.status == 204) {alert("Datos Actualizados");}
                    console.log("Estado =>", status.status);

                    //obtener el producto editado
                    Facturama.Products.Get(product.Id, function(result, textStatus, status)
                    {
                        product = result;
                        console.log("obtener",result);
                        console.log("Estado =>", status.status);

                        //eliminar el producto creado
                        Facturama.Products.Remove(product.Id, function(rresult, textStatus, status)
                        { 
                            console.log("Eliminado", result);
                            console.log("Estado =>", status.status);
                        });
                    });

                    //obtener todos los productos
                    Facturama.Products.List(function(result){ 
                        productUpdate = result;
                        console.log("todos",result);
                    });
                },
                function (error) {
                    console.log("Código de respuesta: " + error.status);
                    console.log("Mensaje: " + error.messege);
                });

            },
                function (error) {
                    console.log("Código de respuesta: " + error.status);
                    console.log("Mensaje: " + error.messege);
                }); 
            }
    catch (e) {
		console.log("Mensaje de error: " + e.messege);
	}

}

function testListProduct()
{
    try
    {
        var search= "";
        var start=0;
        var length=100;
        Facturama.Products.List2("start="+start+"&lenght="+length +"&search="+search,function (result) {
            console.log(result);
            console.log(Object.values(result.data)[0].Id);
            console.log(Object.values(result.data)[0].Rfc);
            console.log(Object.values(result.data)[0].Name);
            console.log(Object.values(result.data)[0].Address);
            console.log(Object.values(result.data)[0].CfdiUse);
            console.log(Object.values(result.data)[0].Email);
            console.log(Object.values(result.data)[0].FiscalRegime);
        }); 

    }
    catch (e) 
    {
		console.log("Mensaje de error: " + e.messege);
    }    

}