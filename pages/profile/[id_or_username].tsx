import React, { useState, useEffect } from "react";
//import service from "../../services/userService";
//import userService from "../Users/Users.service"; //Sacar este user service duplicado, quedó mal, meter todo en ../../services/userService

import ProfileImageComponent from "./ProfileImage/ProfileImageComponent";
import PermissionsListComponent from "./PermissionsList/PermissionsListComponent";

const MyProfile = (props) => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("XXXXXXXX");
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  let [open, setOpen] = useState(false);
  let [action, setAction] = useState(null);
  let [editProfileMode, setEditProfileMode] = useState(false);
  let [permissions, setPermissions] = useState([]);

  useEffect(() => {
    setUsername(localStorage.username);
    setEmail(localStorage.email);
    //setName('')
    //setSurname('')
    async function fetchData() {
      /*try {
        let response = await userService.getMyProfileInfo(localStorage._id);
        let user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setName(user.name);
        setSurname(user.surname);
        setPermissions(user.permissions);
      } catch (ex) {
        console.log(ex);
      }*/
    }

    fetchData();
  }, []);

  const showModalPasswordChange = () => {
    setOpen(true);
    setAction("CHANGE_PASSWORD");
  };

  const handleClose = () => {
    setOpen(false);
    setAction(null);
  };

  const handleSubmit = async () => {
    try {
      /*let res = await service.update(localStorage._id, {
        username,
        email,
        name,
        surname,
      });

      alert("Sus datos han sido modificados exitosamente.");

      setEditProfileMode(!editProfileMode);*/
    } catch (err) {
      console.error("Todo mal: ", err);
    }
  };

  const handleModalAccept = async () => {
    if (action == "CHANGE_PASSWORD") {
      if (
        newPassword != "" &&
        newPasswordConfirm != "" &&
        newPassword != newPasswordConfirm
      ) {
        alert("Las contraseñas ingresadas deben coincidir");
        return;
      }

      /*try {
        let res = await userService.changePassword(
          localStorage._id,
          newPassword
        );
        alert(res.data.message);
        setOpen(false);
        setAction(null);
        setNewPassword("");
        setNewPasswordConfirm("");
      } catch (err) {
        alert(err.response.data.message);
      }*/
    }
  };

  return (
    <>
      <div className="uk-card uk-card-default uk-card-body uk-width-3-6">
        <form className="uk-form-horizontal">
          <h1>Mis datos personales</h1>
          <ProfileImageComponent disabled={!editProfileMode} />
          <div className="uk-margin">
            <label className="uk-form-label">Nombre de usuario</label>
            <div className="uk-form-controls">
              <input
                id="username"
                className="uk-input"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={!editProfileMode}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Nombre</label>
            <div className="uk-form-controls">
              <input
                id="name"
                placeholder="Nombre"
                className="uk-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={!editProfileMode}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Apellido</label>
            <div className="uk-form-controls">
              <input
                id="surname"
                placeholder="Apellido"
                className="uk-input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                disabled={!editProfileMode}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Email</label>
            <div className="uk-form-controls">
              <input
                id="email"
                placeholder="email"
                className="uk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!editProfileMode}
              />
            </div>
          </div>
          {editProfileMode == true ? (
            <div>
              <button
                className="uk-button uk-button-default uk-width-1-2"
                onClick={() => setEditProfileMode(!editProfileMode)}
              >
                <span uk-icon="icon: close"></span>
                Cancelar
              </button>
              <button
                className="uk-button uk-button-primary uk-width-1-2"
                onClick={() => handleSubmit()}
              >
                <span uk-icon="icon: check"></span>
                Aceptar
              </button>
            </div>
          ) : (
            <div>
              <button
                className="uk-button uk-button-primary uk-width-1-1"
                onClick={() => setEditProfileMode(!editProfileMode)}
              >
                <span uk-icon="icon: pencil"></span>
                Editar
              </button>
            </div>
          )}
        </form>
      </div>
      <br />
      <div className="uk-card uk-card-default uk-card-body uk-width-3-6">
        <PermissionsListComponent
          //title="Roles y permisos"
          items={permissions || []}
          //getSelectedFile={() => {}}
        />
      </div>
    </>
  );
};

export default MyProfile;
