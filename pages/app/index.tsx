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
        enableSelect={true} 
        selectionType={"multiple"} // Single or multiple (Validate with propTypes)
        enableCreate={true}
        enableUpdate={true}
        enableDelete={true}
        enableCache={false} //Pending to implement. IDK how I'll implement it yet
        enableExport={true}//{[false, ['csv','xml','json']]} //Pending validate correctly with prop types
        enableImport={true}
        enablePrint={false} //Pending to implement
        enableSorting={true}
        enableColumnFilter={true}
        itemsPerPage={[10, 15, 20, 25]}
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
