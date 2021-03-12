import React, { useState, useEffect } from 'react';
//import './Users.styles.css'
import DataTable from '../../components/DataTable';

const UsersComponent = (props) => {

    /*const [usersList, setUsersList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [actionTitle, setActionTitle] = useState('');
    const [modalBodyText, setModalBodyText] = useState('');
    const [actionDescription, setActionDescription] = useState('');*/

    useEffect(() => {
        //if (!localStorage.loggedIn || localStorage.loggedIn == false)
        //this.props.history.push('/signin')
    }, [])

    const verUsuario = (_id) => {
        alert("Acción adicional usuario " + _id)
    }

    const getSelectedRows = (rows) => {
        console.log(rows)
    }

    return (
        <div>
            <h1>Consulta de usuarios</h1>
            {/* <DataTable
                //crudTitle="Gestión de usuarios"
                class={''}
                service={'UserService.'}
                pk={'_id'}
                clickCallback={() => console.log('Prueba Click Callback')}
                enableSelect={true} //Implementado, pero todavia no hago nada con los seleccionados
                enableCreate={true}
                enableUpdate={true}
                enableDelete={true}
                enableCache={false} //Pendiente implementar
                // enableExport={[false, ['csv', 'xml', 'json']]} //Pendiente implementar
                // enablePrint={false} //Pendiente implementar
                // enableSorting={false} //Pendiente implementar
                // enableColumnFilter={false} //Pendiente implementar
                // itemsPerPage={[10, 15, 20, 25]}
                filter={[
                    { 'parameterName': 'username', 'parameterValue': '', 'parameterContainer': 'query' }
                ]}
                columns={[
                    { 'columnName': 'username', 'title': 'Nombre de usuario' },
                    { 'columnName': 'email', 'title': 'Email' },
                    { 'columnName': 'name', 'title': 'Nombre' },
                    { 'columnName': 'surname', 'title': 'Apellido' }
                ]}
                additionalActions={[
                    { tooltip: 'Información', icon: "fas fa-info-circle", callback: verUsuario },
                    { tooltip: 'Resetear contraseña y enviar por email', icon: "fas fa-envelope", callback: verUsuario }
                ]}
            /> */}
        </div>
    )
}

export default UsersComponent;