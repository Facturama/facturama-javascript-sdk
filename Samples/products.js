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

var productUpdate;

function testCRUDProducts() {
	var product;
	//creacion de un producto
	Facturama.Products.Create(newProduct, function(result){ 
		product = result;
		console.log("creacion",result);
    
	    //editar el producto
	    product.Description = "CONCEPTO EDITADO";
	    Facturama.Products.Update(product.Id, product, function(result){ 
			console.log("edicion", result);

			//obtener el producto editado
			Facturama.Products.Get(product.Id, function(result){
				product = result;
				console.log("obtener",result);

				//eliminar el producto creado
				Facturama.Products.Remove(product.Id, function(result){ 
					console.log("eliminado",result);
				});
			});

			//obtener todos los productos
			Facturama.Products.List(function(result){ 
				productUpdate = result;
				console.log("todos",result);
			});
		});

	});
}




