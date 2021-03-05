import React, { useState, useEffect } from 'react'
//import HashHistory from '../../history/HashHistory'
//import http from '../../http/genericComunication'
import PropTypes from 'prop-types';
import AdvancedSearch from '../../components/AdvancedSearchField';
//import UIkit from 'uikit'

//import ComboComponent from '../ComboComponent/ComboComponent'

const UserCreateComponent = (props) => {

    let [action, setAction] = useState('')
    let [_id, setId] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [appId, setAppId] = useState('')
    let [roleId, setRoleId] = useState('')

    useEffect(() => {
        /*let location = HashHistory.location.pathname.split('/')
        let act = location[location.length - 1] == 'new' ? 'Crear' : 'Modificar'
        setAction(act)
        setId(location[location.length - 1])
        if (act === 'Modificar')
            getUserInfo(location[location.length - 1])*/
    }, [])

    const getUserInfo = (p_id) => {
        /*http.patch('user', null, { _id: p_id }, null)
            .then(
                resp => {
                    console.log("resp: ", resp.data)
                    setUsername(resp.data.username)
                    setEmail(resp.data.email)
                    setPassword(resp.data.password)
                    setAppId(resp.data.appId)
                    setRoleId(resp.data.roleId)
                    setName(resp.data.name)
                    setSurname(resp.data.surname)
                },
                err => {
                    alert(err.response.data.message)
                }
            )*/
    }

    const handleSubmit = () => {

        console.log(action)
        /*if (action == 'Crear') {
            http.post('user', 
                { 
                    username: username, 
                    password: password, 
                    email: email, 
                    appId: appId, 
                    roleId: roleId,
                    name: name,
                    surname: surname
                }, 
                null, 
                null)
                .then(
                    resp => {
                        //alert(resp.data.message)
                        UIkit.modal.alert(resp.data.message)
                        HashHistory.push('/users')
                    },
                    err => {
                        if (!err.response.data.err_code) {
                            //alert(err.response.data.message)
                            UIkit.modal.alert(err.response.data.message)
                        }
                        else {
                            if (err.response.data.err_code == 11000) {
                                //alert("Registro duplicado")
                                UIkit.modal.alert('Registro duplicado')
                            }
                        }
                    }
                )
        }
        else {
            http.put('user',
                { 
                    username: username, 
                    email: email, 
                    password: password, 
                    appId: appId, 
                    roleId: roleId,
                    name: name,
                    surname: surname
                },
                { _id: _id },
                null)
                .then(
                    resp => {
                        //alert(resp.data.message)
                        UIkit.modal.alert(resp.data.message)
                        HashHistory.push('/users')
                    },
                    err => {
                        if (!err.response.data.err_code) {
                            //alert(err.response.data.message)
                            UIkit.modal.alert(err.response.data.message)
                        }
                        else {
                            if (err.response.data.err_code == 11000) {
                                //alert("Registro duplicado")
                                UIkit.modal.alert("Registro duplicado")
                            }
                        }
                    }
                )
        }*/
    }

    const getRoleSelection = (roleId) => {
        setRoleId(roleId)
    }

    const getAppSelection = (appId) => {
        setAppId(appId)
    }

    return (

        <div >
            <h1 >{action} usuario</h1>

            <form onSubmit={handleSubmit} autoComplete="off" className="uk-form-horizontal">
                <div className="uk-margin">
                    <label className="uk-form-label">Usuario</label>
                    <div className="uk-form-controls">
                        <input
                            id="username"
                            className="uk-input"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">Email</label>
                    <div className="uk-form-controls">
                        <input
                            id="email"
                            className="uk-input"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">Nombre</label>
                    <div className="uk-form-controls">
                    <input
                        id="name"
                        className="uk-input"
                        placeholder="Nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">Apellido</label>
                    <div className="uk-form-controls">
                    <input
                        id="surname"
                        className="uk-input"
                        placeholder="Apellido"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">Contraseña</label>
                    <div className="uk-form-controls">
                    <input
                        id="password"
                        className="uk-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        disabled={action == 'Modificar'}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                </div>
                <AdvancedSearch 
                    pkFieldValue={appId}
                    disabled={false}
                    //rellabel="Aplicación"
                    controller="app"
                    pk="_id"
                    onSelection={getAppSelection}
                    columns={[
                        { 'columnName': 'code', 'title': 'Código' },
                        { 'columnName': 'description', 'title': 'Descripción' }
                    ]}
                    filter={[
                        {'parameterName': 'code', 'parameterValue': '', 'parameterContainer': 'query'},
                        {'parameterName': 'description', 'parameterValue': '', 'parameterContainer': 'query'}
                    ]}
                />

                <AdvancedSearch 
                    pkFieldValue={roleId}
                    disabled={!appId || appId.trim() == ''}
                    //rellabel="Rol"
                    //fullWidth
                    controller="role"
                    pk="_id"
                    onSelection={getRoleSelection}
                    columns={[
                        { 'columnName': 'code', 'title': 'Código' }
                    ]}
                    filter={[
                        {'parameterName': 'code', 'parameterValue': '', 'parameterContainer': 'query'},
                        {'parameterName': 'description', 'parameterValue': '', 'parameterContainer': 'query'},
                        {'parameterName': 'appId', 'parameterValue': appId || '', 'parameterContainer': 'query'},
                    ]}
                />

            </form>
            <a className="uk-button uk-button-default uk-width-1-2" href="/#/users" >
                Volver
            </a>
            <button className="uk-button uk-button-primary uk-width-1-2" onClick={handleSubmit} >
                Guardar
            </button>
        </div>
    )
}

UserCreateComponent.propTypes = {

};

export default UserCreateComponent;