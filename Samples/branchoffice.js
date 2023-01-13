var Branch = {
	Name: "El sauce",
	Description: "Sucursal del sauce, enfocada en la distribución de agua en garrafón",
	Address: {
		Street: "Av. del Sauce",
		ExteriorNumber: "120",
		InteriorNumber: "",
		Neighborhood: "Las Flores",
		ZipCode: "78116",
		Locality: "",
		Municipality: "San Luis Potosi",
		State: "San Luis Potosi",
		Country: "México",
	},
};
var newBranch = {
	Name: "El sauce",
	Description: "Sucursal del sauce, enfocada en la distribución de agua en garrafón",
	Address: {
		Street: "Av. del Sauce",
		ExteriorNumber: "120",
		InteriorNumber: "",
		Neighborhood: "Las Flores",
		ZipCode: "78116",
		Locality: "",
		Municipality: "San Luis Potosi",
		State: "San Luis Potosi",
		Country: "México",
	},
};

var branchUpdate;

function testCRUDBranchOffice() 
{
	try 
	{
		var branch;
		//Creación de una sucursal
		Facturama.BranchOffice.Create(Branch,function (result, textStatus, status) 
		{
			branch = result;
			console.log("Creación =>", result);
			console.log("Estado =>", status.status);

			//editar la sucursal
			branch.Description = "CUALQUIER DESCRIPCION";
			Facturama.BranchOffice.Update(branch.Id,branch,function (result, textStatus, status) 
				{
					console.log("Edición =>", result);
					if (status.status == 204) {alert("Datos Actualizados");	}
					console.log("Estado =>", status.status);

					//obtener la sucursal editada
					Facturama.BranchOffice.Get(branch.Id,function (result, textStatus, status) 
					{
						branch = result;
						console.log("Obtener =>", result);
						console.log("Estado =>", status.status);

						//eliminar la sucursal creada
						Facturama.BranchOffice.Remove(branch.Id, function (result, textStatus, status) 
						{
							console.log("Eliminado =>", result);
							console.log("Estado =>", status.status);
						},
							function (error) 
							{
								console.log("Código de respuesta: " + error.status);
								console.log("Mensaje: " + error.messege);
							});
					});

					//obtener todas las sucursales
					Facturama.BranchOffice.List(function (result) 
					{
						branchUpdate = result;
						console.log("todos", result);
					});
					},function (error) 
					{
						console.log("Código de respuesta: " + error.status);
						console.log("Mensaje: " + error.messege);
					});
			},function (error) 
			{
				console.log("Código de respuesta: " + error.status);
				console.log("Mensaje: " + error.messege);
			}
		);
	} catch (e) {
		console.log("Mensaje de error: " + e.messege);
	}
}

