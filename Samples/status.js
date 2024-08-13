function testValidar_cfdi()
{
var uuid="eabbe5a3-b80d-486a-bbc3-7eec6bab5c6d";
var issuerRfc="EKU9003173C9";
var receiverRfc="ZUÑ920208KL4";
var total="5916.00";   


    Facturama.Cfdi.Status(
        "?uuid=" + uuid + 
        "&issuerRfc=" + issuerRfc + 
        "&receiverRfc=" + receiverRfc +
        "&total=" + total,
        function (result, textStatus, status) {
            console.log("Obtener =>", result);
            console.log("Estado =>", status.status);
        },
        function (error) 
        {
          console.log("Código de respuesta: " + error.status);
			    console.log("Mensaje: " + error.messege);
          if (error && error.responseJSON) 
          {
            console.log("errores", error.responseJSON);
          }
        }
      );
}

var datos = 
{
  "Rfc": "EKU9003173C9",
  "Name": "ESCUELA KEMPER URGATE",
  "ZipCode":"26015",
  "FiscalRegime": "601"
}
function testValidarCustomer_cfdi()
{
    Facturama.customers.validate(datos,
        function (result, textStatus, status) {
            console.log("Obtener =>", result);
            console.log("Estado =>", status.status);
        },
        function (error) 
        {
          console.log("Código de respuesta: " + error.status);
			    console.log("Mensaje: " + error.messege);
          if (error && error.responseJSON) 
          {
            console.log("errores", error.responseJSON);
          }
        }
      );
}