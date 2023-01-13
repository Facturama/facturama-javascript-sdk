var newCfdi = {
  Serie: "B",
  Currency: "MXN",
  ExpeditionPlace: "99999",
  PaymentConditions: "CREDITO A SIETE DIAS",
  CfdiType: "I",
  PaymentForm: "03",
  PaymentMethod: "PUE",
  Obervations:"Observaciones en PDF",
  OrderNumber:"ABC123",
  Receiver: {
    Rfc: "ZUÑ920208KL4",
    Name: "ZAPATERIA URTADO ÑERI",
    CfdiUse: "G03",
  },
  Items: [
    {
      ProductCode: "10101504",
      IdentificationNumber: "EDL",
      Description: "Estudios de viabilidad",
      Unit: "NO APLICA",
      UnitCode: "MTS",
      UnitPrice: 50.0,
      Quantity: 2.0,
      Subtotal: 100.0,
      Taxes: [
        {
          Total: 16.0,
          Name: "IVA",
          Base: 100.0,
          Rate: 0.16,
          IsRetention: false,
        },
      ],
      Total: 116.0,
    },
    {
      ProductCode: "10101504",
      IdentificationNumber: "001",
      Description: "SERVICIO DE COLOCACION",
      Unit: "NO APLICA",
      UnitCode: "E49",
      UnitPrice: 100.0,
      Quantity: 15.0,
      Subtotal: 1500.0,
      Discount: 0.0,
      Taxes: [
        {
          Total: 240.0,
          Name: "IVA",
          Base: 1500.0,
          Rate: 0.16,
          IsRetention: false,
        },
      ],
      Total: 1740.0,
    },
  ],
};

var clientUpdate;

function testCRUDCfdi() 
{
  var cfdi;
  //creacion de un CFDI con error

  Facturama.Cfdi.Create(
    newCfdi,
    function (result) {
      cfdi = result;
      console.log("creacion", result);
    },
    function (error) {
      if (error && error.responseJSON) {
        console.log("errores", error.responseJSON);
      }
    }
  );

  //creacion de un cfdi
  newCfdi.ExpeditionPlace = "78140";
  Facturama.Cfdi.Create(
    newCfdi,
    function (result) {
      cfdi = result;
      console.log("creacion", result);

      //enviar el cfdi al cliente
      var email = "ejemplo@ejemplo.com";
      var type = "issued";
      Facturama.Cfdi.Send(
        "?cfdiType=" + type + "&cfdiId=" + cfdi.Id + "&email=" + email,
        function (result) {
          console.log("envio", result);
        }
      );

      //descargar el PDF del cfdi
      Facturama.Cfdi.Download("pdf", "issued", cfdi.Id, function (result) {
        console.log("descarga", result);

        blob = converBase64toBlob(result.Content, "application/pdf");

        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      });

      //descargar el XML del cfdi
      Facturama.Cfdi.Download("xml", "issued", cfdi.Id, function (result) {
        console.log("descarga", result);

        blob = converBase64toBlob(result.Content, "application/xml");

        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      });

      // //obtener todos los cfdi con cierto rfc
      var rfc = "EKU9003173C9";
      Facturama.Cfdi.List("?type=issued&keyword=" + rfc, function (result) {
        clientUpdate = result;
        console.log("todos", result);
      });

      //eliminar el cfdi creado
      var _type = "issued"; //Valores posibles (issued | payroll)
      var _motive = "02"; //Valores Posibles (01|02|03|04)
      var _uuidReplacement = "null"; //(uuid | null)
      Facturama.Cfdi.Cancel(
        cfdi.Id +
          "?type=" +
          _type +
          "&motive=" +
          _motive +
          "&uuidReplacement=" +
          _uuidReplacement,
        function (result) {
          console.log("eliminado", result);
        }
      );
    },
    function (error) {
      if (error && error.responseJSON) {
        console.log("errores", error.responseJSON);
      }
    }
  );
}

function converBase64toBlob(content, contentType) {
  contentType = contentType || "";
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

  var blob = new Blob(byteArrays, { type: contentType }); //statement which creates the blob
  return blob;
}
