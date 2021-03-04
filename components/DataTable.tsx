import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
//import serviceCommunication from '../../http/genericComunication'
//import HashHistory from '../../history/HashHistory'
//import { trackPromise } from 'react-promise-tracker';
import classNames from 'classnames';
//import { isMobile } from 'react-device-detect'

//import './CRUD.component.css';

const CRUDComponent = (props) => {

    let [activePage, setActivePage] = useState(0)
    let [queryFilters, setQueryFilters] = useState({})
    let [bodyFilters, setBodyFilters] = useState({})
    let [currentItems, setCurrentItems] = useState([])
    let [items, setItems] = useState([])
    let [searchTerm, setSearchTerm] = useState('')
    let [showModalDelete, setShowModalDelete] = useState(false)
    let [rowToDelete, setRowToDelete] = useState(null)
    let [SnackbarOpen, setSnackBarOpen] = useState(false)
    let [SnackbarMessage, setSnackbarMessage] = useState(null)
    let [selected, setSelected] = useState([])
    //const isFirstRun = useRef(true);

    useEffect(() => {
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
    }, [props.columns])

    const isColumnToShow = (colName) => {
        return props.columns.filter(col => col.columnName === colName).length !== 0;
    }

    /* Deprecated */
    const getColumnsToShow = () => {
        return Promise.resolve((props.columns ?? []).map(item => item["columnName"]))
    }

    const processFilters = () => {
        return new Promise((resolve) => {
            var body = {}
            var query = {}

            var filters = props.filter

            filters.forEach((filter) => {
                if (filter.parameterValue && filter.parameterValue != '') {
                    if (filter.parameterContainer == 'query')
                        query[filter.parameterName] = filter.parameterValue
                    else
                        body[filter.parameterName] = filter.parameterValue
                }
            })

            setQueryFilters(query)
            setBodyFilters(body)

            //resolve()
        })
    }

    const getData = () => {
        

            /*serviceCommunication.get(props.controller, queryFilters, bodyFilters, null)
                .then(resp => {

                    let filteredFields = []
                    let data = resp.data
                    for(let item of data){
                        let filteredField = []
                        for (let propertyName in item) {
                            if (propertyName == props.pk) {
                                filteredField.splice(0, 0, item[propertyName])
                            }
                            else if (isColumnToShow(propertyName)) {
                                filteredField.push(item[propertyName])
                            }
                        }
                        filteredFields.push({
                            filteredField
                        })
                        
                    }

                    setItems(filteredFields)
                    //console.log("items en getData: ", filteredFields)
                    setCurrentItems(filteredFields.slice(0, props.itemsPerPage[0]))
                },
                err => {
                    //console.log("Ocurrió un error al recuperar los datos: ", err.response)
                    alert(err.response.data.message)
                })*/
        

    }

    const handleDelete = (pk) => {
        var cfm = confirm("¿Desea eliminar el registro seleccionado?");
        if (cfm) {
            setShowModalDelete(true)
            setRowToDelete(pk)
        }
        else {
            onCancelDelete()
        }

    }

    const handleEdit = (pk) => {
        //HashHistory.push('/' + props.controller + '/' + pk)
    }

    const handleNewAction = () => {
        //HashHistory.push('/' + props.controller + '/new')
    }

    const onCancelDelete = () => {
        setShowModalDelete(false)
        setRowToDelete(null)
    }

    const onConfirmDelete = () => {
        /*serviceCommunication.delete(props.controller, rowToDelete)
            .then(
                resp => {
                    getData()
                    setShowModalDelete(false)
                    setRowToDelete(null)
                    setSnackBarOpen(true)
                    setSnackbarMessage(resp.data.message)
                },
                err => {
                    setSnackBarOpen(true)
                    setSnackbarMessage(err.response.data.message)
                }
            )*/
    }

    const handleSearchTermChange = (ev) => {

        setSearchTerm(ev.target.value)

        let currItems = []

        if (ev.target.value.length >= 3 && items) {
            var re = new RegExp(ev.target.value, 'gi')

            /*items.filter(item => {
                for (let i = 0; i < item.filteredField.length && !match; i++) {
                    var match = false
                    if (item.filteredField[i].match(re)) {
                        currItems.push(item)
                        match = 1
                    }
                }
            })*/

            setCurrentItems(currItems)
        }
        else {
            setCurrentItems(items.slice((activePage) * props.itemsPerPage[0], (activePage) * props.itemsPerPage[0] + props.itemsPerPage[0]))
        }


    }

    const handleSnackbarClose = () => {
        setSnackBarOpen(false)
    }

    /*onSort(event, sortKey) {
        const data = data;
        data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        setItems(data)
    }*/

    const isSelected = id => selected.indexOf(id) !== -1;

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected)
    };

    const handleSelectAllClick = event => {

        if (event.target.checked) {
            setSelected((items ?? []).map(n => n.filteredField[0]))
            return;
        }
        setSelected([])
    };

    const changePage = (pgCode) => {
        let page = 0;
        let init = 0;
        let totalPages = Math.ceil(items.length / props.itemsPerPage[0]);
        switch(pgCode){
            case "pgFirst":
                page = 0
                init = 0
                break;
            case "pgPrevious":
                page = activePage > 0 ? activePage - 1 : 0;
                init = (page) * props.itemsPerPage[0]
                break;
            case "pgNext":
                page = activePage < totalPages - 1 ? activePage + 1 : totalPages - 1;
                init = (page) * props.itemsPerPage[0]
                break;
            case "pgLast":
                page = totalPages - 1;
                init = (page) * props.itemsPerPage[0]

                break;
        }
        setShowModalDelete(false)
        setActivePage(page)
        setCurrentItems(items.slice(init, init + props.itemsPerPage[0]))
        setSearchTerm('')
    }

    const changeItemsPerPage = (ev) => {
        //console.log(ev.target.id, ev.target.value)
    }

    return (
        <div className="uk-flex uk-flex-column">
            <div className="uk-flex uk-flex-row">
                {
                    <div className="uk-margin uk-width-1-1">
                        <div className="uk-search uk-search-default uk-width-1-1">
                            <input
                                id={"searchTerm" + props.controller}
                                className="uk-search-input"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                        </div>
                    </div>
                }
                {
                    props.enableCreate &&
                    <button className="uk-button uk-button-primary uk-align-right" title="Nuevo" onClick={handleNewAction}>
                        Nuevo
                    </button>
                }
            </div>
            <div className="uk-overflow-auto">
            <table className="uk-table uk-table-divider">
                <thead>
                    <tr>
                        {
                            props.enableSelect &&
                            <td>
                                <input
                                    type="checkbox"
                                    className="uk-checkbox"
                                    checked={selected.length === items.length}
                                    onChange={handleSelectAllClick}
                                />
                            </td>
                        }
                        {
                            (props.columns ?? []).map((col, colIndex) => {
                                return <td key={colIndex}>{col.title}</td>
                            })
                        }
                        {props.additionalActions && props.additionalActions.length > 0 && <td>Acciones</td>}
                    </tr>
                </thead>
                <tbody>
                    {
                        (currentItems ?? []).map((row, rowIndex) => {
                            const selected = isSelected(row.filteredField[0]);
                            return <tr
                                //hover
                                onClick={() => props.clickCallback(row.filteredField) /*event => handleClick(event, row.filteredField[0])*/}
                                //role="checkbox"
                                aria-checked={selected}
                                //tabIndex={-1}
                                //selected={selected}
                                key={rowIndex}
                            >
                                {
                                    props.enableSelect &&
                                    <td /*padding="checkbox"*/>
                                        <input
                                            type="checkbox"
                                            className="uk-checkbox"
                                            //checked={selected}
                                        />
                                    </td>
                                }
                                {
                                    (row.filteredField ?? []).slice(1).map((cell, cellIndex) => {
                                        return (
                                            <td key={cellIndex} /*component="th" scope="row"*/>
                                                {cell}
                                            </td>
                                        )
                                    })
                                }
                                {
                                    ((props.additionalActions && props.additionalActions.length != 0) || props.enableDelete || props.enableUpdate) &&
                                    <td>
                                        <div /*className={classNames({"uk-button-group": true, "uk-align-right": !isMobile})}*/>
                                            {
                                                props.enableDelete &&
                                                <button 
                                                    className="uk-button uk-button-danger" 
                                                    //uk-tooltip="Eliminar" 
                                                    //uk-icon={"icon: trash" + (isMobile ? ";ratio: 2" : "")} 
                                                    aria-label="Delete" 
                                                    onClick={() => handleDelete(row.filteredField[0])}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            }
                                            {
                                                props.enableUpdate &&
                                                <button 
                                                    className="uk-button uk-button-default" 
                                                    //uk-tooltip="Editar" 
                                                    //uk-icon="icon: pencil" 
                                                    aria-label="Edit" 
                                                    onClick={() => handleEdit(row.filteredField[0])}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                            }
                                            {
                                                (props.additionalActions ?? []).map((act, actIndex) => {
                                                    return (
                                                        <button className="uk-button uk-button-default" uk-tooltip={act.tooltip} key={actIndex} onClick={() => act.callback(row.filteredField[0])}>
                                                            <i className={act.icon}></i>
                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </td>
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            <div className="uk-column-1-2">
                <ul className="uk-pagination uk-flex-left uk-form-horizontal">
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-horizontal-select">Cantidad de filas por página</label>
                            <div className="uk-form-controls">
                                <select className="uk-select" id="inpItemsPerPage" disabled={/*!props.itemsPerPage.length*/ true} onChange={changeItemsPerPage}>
                                    {(props.itemsPerPage ?? []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                </ul>
                <ul className="uk-pagination uk-flex-right">
                    <li><a onClick={() => changePage("pgFirst")}><span uk-icon="chevron-double-left"></span></a></li>
                    <li><a onClick={() => changePage("pgPrevious")}><span uk-icon="chevron-left"></span></a></li>
                    <span className="uk-text-lighter">Página { activePage + 1 } de { Math.ceil(items.length / (props.itemsPerPage ? props.itemsPerPage[0] : 1)) }</span>
                    <li><a onClick={() => changePage("pgNext")}><span uk-icon="chevron-right"></span></a></li>
                    <li><a onClick={() => changePage("pgLast")}><span uk-icon="chevron-double-right"></span></a></li>
                </ul>
            </div>
            
        </div>
    )
}

CRUDComponent.propTypes = {
    //classes: PropTypes.object.isRequired,
    class: PropTypes.string,
    controller: PropTypes.string.isRequired,
    pk: PropTypes.string.isRequired,
    clickCallback: PropTypes.func,
    enableSelect: PropTypes.bool.isRequired,
    enableCreate: PropTypes.bool.isRequired,
    enableUpdate: PropTypes.bool.isRequired,
    enableDelete: PropTypes.bool.isRequired,
    enableCache: PropTypes.bool.isRequired,
    filter: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    additionalActions: PropTypes.array,
    onConfirmRegSelection: PropTypes.func
}

export default CRUDComponent;