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

const CRUDComponent = (props) => {
  let [item, setItem] = useState(null);
  let [items, setItems] = useState([]);
  const [itemDialog, setItemDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  let [operation, setOperation] = useState(null);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);

  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    const { service, methods } = props;

    callServiceMethod(service, methods.list).then((data) => setItems(data));

    setItem(getEmptyItem());

  }, [props.columns]);

  const callServiceMethod = async (service: string, method: string, data?: any) => {
    let instance = new ((await import(`../services/${service}`)).default)();

    return data ? instance[method](data) : instance[method]();
  };

  const getEmptyItem = () => {
    
    let emptyObj = {};

    for(let itemField of props.columns) {
      emptyObj[itemField.columnName] = '';
    }

    return emptyObj;
  }

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

  const handleUpload = async (event) => {
    
    console.log(event.files);

    const { service, methods } = props;

    try {

      let response = await callServiceMethod(service, methods.import, event.files);

      console.log("Success: ", response);

    } catch (error) {

      console.error("There was an error importing the file: ", error);

    }
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {
          props.enableImport &&
          <FileUpload
            mode="basic"
            accept="text/csv"
            maxFileSize={1000000}
            /*label="Import"*/ chooseLabel="Import"
            className="p-mr-2 p-d-inline-block"
            customUpload
            uploadHandler={handleUpload}
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
    setOperation('Create');
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
    setOperation('Edit');
  };

  const confirmDeleteItem = (Item) => {
    setItem(Item);
    setDeleteItemDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {props.enableUpdate && (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => editItem(rowData)}
            tooltip="Edit item"
          />
        )}
        {props.enableDelete && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-mr-2"
            onClick={() => confirmDeleteItem(rowData)}
            tooltip="Delete item"
          />
        )}
        {
          (props.additionalActions ?? []).map((act, i) => 
            <Button
              key={`additional_act_${i}`}
              icon={act.icon}
              className={`p-button-rounded p-mr-2 ${act.type && act.type != 'primary' ? `p-button-${act.type}` : ''}`}
              onClick={act.callback}
              tooltip={act.tooltip}
            />
          )
        }
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

  const saveItem = async () => {
    setSubmitted(true);

    let { service, methods: { post, put } } = props;

    try {

      let savedOrUpdated = await callServiceMethod(service, operation === 'Create' ? post : put, { ...item });

      console.log("Called method: ", item);
      
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: `Successfully ${operation === 'Create' ? 'saved' : 'edited'}!`,
        life: 3000,
      });
    } 
    catch (error) {
      console.error("There was an error while trying to save the item: ", error);  
    }
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
        onClick={saveItem}
      />
    </React.Fragment>
  );

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const hideDeleteItemsDialog = () => {
    setDeleteItemsDialog(false);
  };

  const deleteItem = async () => {

    //state.item contains the item to delete

    let { service, methods } = props;

    try {

      let deleted = await callServiceMethod(service, methods.delete);

      console.log(item);

      let _items = items.filter((val) => val[props.pk] !== item[props.pk]);
      setItems(_items);
      setDeleteItemDialog(false);
      setItem(getEmptyItem()); //Find the way to create a generic empty object (Perhaps asking for a mandatory fields config)
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
      
    } 
    catch (error) {
      console.error("There was an error while trying to save the item: ", error);  
    }

    
  };

  const deleteSelectedItems = async () => {

    let { service, methods } = props;

    try {

      let deleted = await callServiceMethod(service, methods.delete);

      console.log(deleted);

      //let _items = items.filter((val) => val.id !== item.id);
      let _items = items.filter((val) => !selectedItems.includes(val));

      setItems(_items);
      setDeleteItemsDialog(false);
      setSelectedItems(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    } 
    catch (error) {
      console.error("There was an error while trying to save the item: ", error);  
    }
    
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
        onRowClick={props.clickCallback ?? null}
        //header={header}
        ref={dt}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        paginator
        rows={props.itemsPerPage ? props.itemsPerPage[0] : 10} 
        rowsPerPageOptions={props.itemsPerPage}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
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
        {props.columns.filter(col => col.show === true).map((col, i) => 
          <Column
            key={`col-config-${i}`}
            field={col.columnName}
            header={col.title}
            sortable={props.enableSorting}
            filter={props.enableColumnFilter}
            filterPlaceholder={`Search by ${col.title}`}
          />
        )}
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <Dialog
        visible={itemDialog}
        style={{ width: "450px" }}
        header={`${operation} item`}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        {
          props.columns.map(field => 
            field.show === true && item &&
            <div className="p-field" key={`crud-field-${field.columnName}`}>
              <label htmlFor="name">{field.title}</label>
              <InputText 
                value={item[field.columnName]} 
                onChange={(e) => setItem({ ...item, [field.columnName]: e.target["value"] })} 
                label={field.title}
                placeholder={field.title}
              />
            </div>
          )
        }
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
              Are you sure you want to delete the selected item?
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
  methods: PropTypes.shape({
    list: PropTypes.string.isRequired,
    get: PropTypes.string,
    post: PropTypes.string,
    put: PropTypes.string,
    delete: PropTypes.string, 
    import: PropTypes.string
  }),
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
  //enablePrint: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableColumnFilter: PropTypes.bool,
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  selectionType: PropTypes.oneOf(['single', 'multiple'])
};

export default CRUDComponent;
