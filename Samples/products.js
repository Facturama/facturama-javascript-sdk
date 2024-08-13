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

function NuevoProducto() {
    var product;
    try {
        Facturama.Products.Create(newProduct, function (result, textStatus, status) {
            product = result;
            console.log("creacion", result);
            console.log("Estado =>", status.status);

        }, function (error) {
            console.log("Código de respuesta: " + error.status);
            console.log("Mensaje: " + error.messege);
        });
    }
    catch (e) {
        console.log("Mensaje de error: " + e.message);
    }
}

function EditarProducto() {
    try {
        var product;
        var IdProduct = "bXrFIAy0uREN7JBOf1V6MQ2";
        prodcut = Facturama.Products.Get(IdProduct, function (result, textStatus, status) {
            product = result;
            console.log("obtener", result);
            console.log("Estado =>", status.status);

            product.Description = "CONCEPTO EDITADO";
            Facturama.Products.Update(IdProduct, product, function (result, textStatus, status) {
                console.log("edicion", result);
                if (status.status == 204) { alert("Datos Actualizados"); }
                console.log("Estado =>", status.status);

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
        console.log("Mensaje de error: " + e.message);
    }
}

function EliminarProducto() {
    try {

        Facturama.Products.List(function (result, textStatus, status) {
            productUpdate = result;
            console.log("resultado", result);
            console.log("Estado =>", status.status);

            Facturama.Products.Remove(result[0].Id, function (result, textStatus, status) {
                console.log("Eliminado", result);
                console.log("Estado =>", status.status);
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
        console.log("Mensaje de error: " + e.message);
    }
}

function ListarProductos() {
    try {
        Facturama.Products.List(function (result) {
            productUpdate = result;
            console.log("todos", result);
        });

    }
    catch (e) {
        console.log("Mensaje de error: " + e.message);
    }
}
function testListProduct() {
    try {
        var search = "";
        var start = 0;
        var length = 100;
        Facturama.Products.List2("start=" + start + "&lenght=" + length + "&search=" + search, function (result) {
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
    catch (e) {
        console.log("Mensaje de error: " + e.messege);
    }

}