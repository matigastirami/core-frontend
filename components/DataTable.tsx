import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
//import serviceCommunication from '../../http/genericComunication'
//import HashHistory from '../../history/HashHistory'
//import { trackPromise } from 'react-promise-tracker';
import classNames from "classnames";
//import { isMobile } from 'react-device-detect'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

//import './CRUD.component.css';

const CRUDComponent = (props) => {

  let [item, setItem] = useState(null);
  let [items, setItems] = useState([]);
  const [itemDialog, setItemDialog] = useState(false);

  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);

  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    const { service } = props;

    let [svcName, method] = service.split(".");

    Service(svcName)
      .then((Serv) => {
        let dataFetcher = new Serv();
        return dataFetcher[method]();
      })
      .then((data) => setItems(data));

    /*if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }*/

    //console.log('filter changed', props.filter);

    /*async function fetchAll(){
            let processedFilters = await processFilters()
            let dataLoaded = await getData()
        }*/

    //fetchAll()
  }, [props.columns]);

  const Service = async (service) => {
    let instance = (await import(`../services/${service}`)).default;

    return instance;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );

  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const header = (
    <div style={{ textAlign: "left" }}>
      <Button
        type="button"
        icon="pi pi-external-link"
        label="Export"
        onClick={exportCSV}
      ></Button>
    </div>
  );

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} /*label="Import"*/ chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setItem({});
    //setSubmitted(false);
    setItemDialog(true);
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedItems || !selectedItems.length}
        />
      </React.Fragment>
    );
  };

  const confirmDeleteSelected = () => {
    setDeleteItemsDialog(true);
}

  const editItem = (item) => {
    setItem({ ...item });
    setItemDialog(true);
  };

  const confirmDeleteItem = (Item) => {
    setItem(Item);
    setItemDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteItem(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <Toast ref={toast} />

      <Toolbar
        className="p-mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        value={items}
        //header={header}
        ref={dt}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Items"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        dataKey={props.pk}
        resizableColumns
        columnResizeMode="fit"
      >
        {props.enableSelect && (
          <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        )}
        {props.columns.map((col, i) => (
          <Column
            key={`col-config-${i}`}
            field={col.columnName}
            header={col.title}
            sortable
            filter
            filterPlaceholder={`Search by ${col.title}`}
          />
        ))}
        <Column body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

CRUDComponent.propTypes = {
  //classes: PropTypes.object.isRequired,
  class: PropTypes.string,
  service: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
  clickCallback: PropTypes.func,
  enableSelect: PropTypes.bool.isRequired,
  enableCreate: PropTypes.bool.isRequired,
  enableUpdate: PropTypes.bool.isRequired,
  enableDelete: PropTypes.bool.isRequired,
  enableCache: PropTypes.bool.isRequired, // Pending checking out when converting to PWA
  filter: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  additionalActions: PropTypes.array,
  onConfirmRegSelection: PropTypes.func,
  enableExport: PropTypes.bool,
  enablePrint: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableColumnFilter: PropTypes.bool,
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  selectionType: PropTypes.string,
};

export default CRUDComponent;
