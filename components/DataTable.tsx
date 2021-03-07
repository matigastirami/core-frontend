import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

//import './CRUD.component.css';

const CRUDComponent = (props) => {
  let [item, setItem] = useState(null);
  let [items, setItems] = useState([]);
  const [itemDialog, setItemDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
        {
          props.enableImport &&
          <FileUpload
            mode="basic"
            accept="image/*"
            maxFileSize={1000000}
            /*label="Import"*/ chooseLabel="Import"
            className="p-mr-2 p-d-inline-block"
          />
        }
        {
          props.enableExport &&
          <Button
            label="Export"
            icon="pi pi-upload"
            className="p-button-help"
            onClick={exportCSV}
          />
        }
      </React.Fragment>
    );
  };

  const openNew = () => {
    setItem({});
    //setSubmitted(false);
    setItemDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {props.enableCreate && (
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
            onClick={openNew}
          />
        )}
        {props.enableDelete && props.enableSelect && props.selectionType === 'multiple' && (
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedItems || !selectedItems.length}
          />
        )}
      </React.Fragment>
    );
  };

  const confirmDeleteSelected = () => {
    setDeleteItemsDialog(true);
  };

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
        {props.enableUpdate && (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => editItem(rowData)}
          />
        )}
        {props.enableDelete && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => confirmDeleteItem(rowData)}
          />
        )}
      </React.Fragment>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setItemDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...item };
    _product[`${name}`] = val;

    setItem(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...item };
    _product[`${name}`] = val;

    setItem(_product);
  };

  const saveProduct = () => {
    setSubmitted(true);

    // TODO: call item service method

    alert("Pending implement");
  };

  const itemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const hideDeleteItemsDialog = () => {
    setDeleteItemsDialog(false);
  };

  const deleteItem = () => {
    let _products = items.filter((val) => val.id !== item.id);
    setItem(_products);
    setDeleteItemDialog(false);
    setItem({}); //Find the way to create a generic empty object (Perhaps asking for a mandatory fields config)
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const deleteSelectedItems = () => {
    let _products = items.filter((val) => !selectedItems.includes(val));
    setItems(_products);
    setDeleteItemsDialog(false);
    setSelectedItems(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteItemDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteItem}
      />
    </React.Fragment>
  );

  const deleteItemsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteItemsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedItems}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />

      <Toolbar
        className="p-mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      />

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
          <Column
            selectionMode={props.selectionType}
            headerStyle={{ width: "3em" }}
          />
        )}
        {props.columns.map((col, i) => (
          <Column
            key={`col-config-${i}`}
            field={col.columnName}
            header={col.title}
            sortable={props.enableSorting}
            filter={props.enableColumnFilter}
            filterPlaceholder={`Search by ${col.title}`}
          />
        ))}
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <Dialog
        visible={itemDialog}
        style={{ width: "450px" }}
        header="Item Details"
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        {/* TODO: Replace the form below for a dynamic form */}
      </Dialog>

      <Dialog
        visible={deleteItemDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteItemDialogFooter}
        onHide={hideDeleteItemDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {item && (
            <span>
              Are you sure you want to delete <b>{item.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteItemsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteItemsDialogFooter}
        onHide={hideDeleteItemsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {item && (
            <span>Are you sure you want to delete the selected Items?</span>
          )}
        </div>
      </Dialog>
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
  columns: PropTypes.array.isRequired,
  additionalActions: PropTypes.array,
  onConfirmRegSelection: PropTypes.func,
  enableExport: PropTypes.bool,
  enableImport: PropTypes.bool,
  enablePrint: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableColumnFilter: PropTypes.bool,
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  selectionType: PropTypes.string,
};

export default CRUDComponent;
