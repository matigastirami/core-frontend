import React, {useState, useEffect, useRef} from 'react'
import DataTable from './DataTable';
import PropTypes from 'prop-types'
//import HashHistory from '../../history/HashHistory'
//import http from '../../http/genericComunication'

const ComboComponent = (props) => {

    let [fieldValue, setFieldValue] = useState('')
    let [fieldId, setFieldId] = useState(null)
    let [open, setOpen] = useState(false)
    const isFirstRun = useRef(true);

    useEffect(() => {
        //UIkit.modal('#optionsModal' + props.controller, {});
        /* Skip first run just like componentWillReceiveProps */
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        async function fetchData() {
            // let resp = await http.patch(props.controller, null, { _id: props.pkFieldValue }, null)

            // if (resp.status != 200) {
            //     return;
            // }
            // else {
            //     setFieldId(resp.data._id)
            //     setFieldValue(resp.data.code)
            // }
        }
        
        fetchData()        
        
    }, [ props.pkFieldValue ])

    const handleChange = (ev) => {
        setFieldValue(ev.target.value)
    }

    const handleFocus = (ev) => {
        if (!props.disabled || props.disabled == false) {
            if (!ev.target.value || ev.target.value.trim() == '') {
                // UIkit.modal('#optionsModal' + props.controller).show();
            }
            else {
                //HashHistory.push('/' + props.controller + '/' + fieldId)
                window.open('#/' + props.controller + '/' + fieldId)
            }
        }
    }

    const getSelectedRegister = (reg) => {
        setFieldId(reg[0])
        setFieldValue(reg[1])
        props.onSelection(reg[0])
        // UIkit.modal('#optionsModal' + props.controller).hide();
    }

    const clearField = () => {
        setFieldId('')
        setFieldValue('')
    }

    return (
        <div>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <label className="uk-form-label">{props.rellabel || 'No-name'}</label>
                    <div className="uk-form-controls">
                        <a className="uk-form-icon uk-form-icon-flip" onClick={clearField} uk-icon="icon: close"></a>
                        <input
                            id={props.controller + 'Input'}
                            className="uk-input"
                            placeholder={props.rellabel || 'No-name'}
                            value={fieldValue}
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            onClick={handleFocus}
                            disabled={props.disabled}
                        />
                    </div>
                </div>
            </div>
            <div id={"optionsModal" + props.controller} className="uk-modal-container">
                <div className="uk-modal-dialog">
                    <button className="uk-modal-close-default" type="button" uk-close=""></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Seleccione una opción...</h2>
                    </div>
                    <div className="uk-modal-body">
                        <DataTable
                            //tabIndex={-1}
                            //crudTitle="Búsqueda avanzada"
                            controller={props.controller}
                            pk={props.pk}
                            clickCallback={getSelectedRegister}
                            enableSelect={false}
                            enableCreate={false}
                            enableUpdate={false}
                            enableDelete={false}
                            enableCache={false}
                            //enableExport={[false, ['csv', 'xml', 'json']]}
                            //enablePrint={false}
                            //enableSorting={false}
                            //enableColumnFilter={false}
                            //itemsPerPage={[10, 15, 20, 25]}
                            filter={props.filter}
                            columns={props.columns}
                        />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-button-default uk-modal-close" type="button">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ComboComponent.propTypes = {
    class: PropTypes.string,
    controller: PropTypes.string.isRequired,
    pk: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pkFieldValue: PropTypes.string,
    disabled: PropTypes.bool.isRequired
}

export default ComboComponent;