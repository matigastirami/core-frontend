import React from "react";
import DataTable from "../../components/DataTable";

const RoleComponent = () => {
  const verRol = () => {
    alert("PRUEBA ACCION ADICIONAL");
  };

  return (
    <div>
      <h1>Consulta de roles</h1>
      <DataTable
        //crudTitle="Gestión de roles"
        class={""}
        controller={"role"}
        pk={"_id"}
        clickCallback={() => console.log("Prueba Click Callback")}
        enableSelect={false} //Pendiente implementar (checkbox a la izquierda de las columnas)
        enableCreate={true}
        enableUpdate={true}
        enableDelete={true}
        enableCache={false} //Pendiente implementar
        //enableExport={[false, ["csv", "xml", "json"]]} //Pendiente implementar
        //enablePrint={false} //Pendiente implementar
        //enableSorting={false} //Pendiente implementar
        //enableColumnFilter={false} //Pendiente implementar
        //itemsPerPage={[10, 15, 20, 25]}
        filter={[
          {
            parameterName: "code",
            parameterValue: "",
            parameterContainer: "query",
          },
          {
            parameterName: "description",
            parameterValue: "",
            parameterContainer: "query",
          },
        ]} //Pendiente implementar
        columns={[
          { columnName: "code", title: "Código" },
          { columnName: "description", title: "Descripción" },
        ]}
        additionalActions={[
          {
            tooltip: "Información",
            icon: "fas fa-info-circle",
            callback: () => verRol(),
          },
        ]}
      />
    </div>
  );
};

export default RoleComponent;
