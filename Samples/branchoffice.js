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

var branchUpdate;

function testCRUDBranchOffice() {
	var branch;
	//creacion de una sucursal
	Facturama.BranchOffice.Create(newBranch, function(result){ 
		branch = result;
		console.log("creacion",result);
    
	    //editar la sucursal
	    branch.Description = "CUALQUIER DESCRIPCION";
	    Facturama.BranchOffice.Update(branch.Id, branch, function(result){ 
			console.log("edicion", result);

			//obtener la sucursal editada
			Facturama.BranchOffice.Get(branch.Id, function(result){
				branch = result;
				console.log("obtener",result);

				//eliminar la sucursal creada
				Facturama.BranchOffice.Remove(branch.Id, function(result){ 
					console.log("eliminado",result);
				});
			});

			//obtener todas las sucursales
			Facturama.BranchOffice.List(function(result){ 
				branchUpdate = result;
				console.log("todos",result);
			});
		});

	});
}




