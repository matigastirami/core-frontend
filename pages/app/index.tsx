import React from "react";
import DataTable from "../../components/DataTable";

export default () => {
  return (
    <div>
      <h1>Consulta de aplicaciones</h1>
      <DataTable
        //crudTitle="Gestión de apps"
        class={""}
        service={"AppService"}
        methods={{
          list: 'getApps',
          get: 'getApp',
          post: 'createApp',
          put: 'editApp',
          delete: 'deleteApp',
          import: 'importApps'
        }}
        pk={"code"}
        clickCallback={() => console.log("Test click callback")}
        enableSelect={true} 
        selectionType={"multiple"}
        enableCreate={true}
        enableUpdate={true}
        enableDelete={true}
        enableCache={false} //Pending to implement. IDK how I'll implement it yet
        enableExport={true}
        enableImport={true}
        //enablePrint={false} //Pending to implement
        enableSorting={true}
        enableColumnFilter={true}
        itemsPerPage={[10, 15, 20, 25]}
        columns={[
          { columnName: "_id", show: false, editable: false, type: 'text' },
          { columnName: "code", title: "Código", show: true, editable: true, type: 'text' },
          { columnName: "description", title: "Descripción", show: true, editable: true, type: 'text' },
          { columnName: "url", title: "URL", show: true, editable: true, type: 'text' },
        ]}
        additionalActions={[
          {
            tooltip: "Información",
            icon: "pi pi-info-circle",
            callback: () => console.log("OK"),
            type: "Info"
          },
        ]}
      />
    </div>
  );
};
