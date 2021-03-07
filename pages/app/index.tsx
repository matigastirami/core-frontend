import React from "react";
import DataTable from "../../components/DataTable";

export default () => {
  return (
    <div>
      <h1>Consulta de aplicaciones</h1>
      <DataTable
        //crudTitle="Gestión de apps"
        class={""}
        service={"AppService.getApps"}
        pk={"code"}
        clickCallback={() => console.log("Prueba Click Callback")}
        enableSelect={true} //Pendiente implementar (checkbox a la izquierda de las columnas)
        selectionType={"single"} // Single or multiple
        enableCreate={true}
        enableUpdate={true}
        enableDelete={true}
        enableCache={false} //Pendiente implementar
        enableExport={false}//{[false, ['csv','xml','json']]} //Pending validate correctly with prop types
        enablePrint={false} //Pendiente implementar
        enableSorting={false} //Pendiente implementar
        enableColumnFilter={false} //Pendiente implementar
        itemsPerPage={[10, 15, 20, 25]}
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
          { columnName: "url", title: "URL" },
        ]}
        additionalActions={[
          {
            tooltip: "Información",
            icon: "fas fa-info-circle",
            callback: () => console.log("OK"),
          },
        ]}
      />
    </div>
  );
};
