import React, { useState, useEffect } from "react";
//import HashHistory from "../../history/HashHistory";
//import http from "../../http/genericComunication";

import moment from "moment";

//import AdvancedSearch from "../../components/AdvancedSearchField";

const RoleCreate = () => {
  let [action, setAction] = useState("");
  let [_id, setId] = useState("");
  let [code, setCode] = useState("");
  let [description, setDescription] = useState("");
  let [appId, setAppId] = useState("");
  let [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    //let location = HashHistory.location.pathname.split("/");
    // let action = location[location.length - 1] == "new" ? "Crear" : "Modificar";
    // setAction(action);
    // setId(location[location.length - 1]);

    if (action == "Modificar") getRoleInfo();
  }, []);

  const getRoleInfo = () => {
    /*http.patch("role", null, { _id: _id }, null).then(
      (role) => {
        setCode(role.data.code);
        setDescription(role.data.description);
        role.data.expirationDate &&
          setExpirationDate(
            moment(role.data.expirationDate).format("YYYY-MM-DD")
          );
        role.data.appId && setAppId(role.data.appId);
      },
      (err) => {
        //UIkit.modal.alert(err.response.data.message);
      }
    );*/
  };

  const handleSubmit = () => {
    /*if (action == "Crear") {
      http
        .post(
          "role",
          {
            code: code,
            description: description,
            expirationDate: expirationDate != "" ? expirationDate : undefined,
            appId: appId,
          },
          null,
          null
        )
        .then(
          (resp) => {
            //alert(resp.data.message)
            UIkit.modal.alert(resp.data.message);
            HashHistory.push("/roles");
          },
          (err) => {
            if (!err.response.data.err_code) {
              //alert(err.response.data.message)
              UIkit.modal.alert(err.response.data.message);
            } else {
              if (err.response.data.err_code == 11000) {
                UIkit.modal.alert("Código duplicado");
              }
            }
          }
        );
    } else {
      http
        .put(
          "role",
          {
            code: code,
            description: description,
            expirationDate: expirationDate != "" ? expirationDate : undefined,
            appId: appId,
          },
          { _id: _id },
          null
        )
        .then(
          (resp) => {
            UIkit.modal.alert(resp.data.message);
            HashHistory.push("/roles");
          },
          (err) => {
            if (!err.response.data.err_code) {
              UIkit.modal.alert(err.response.data.message);
            } else {
              if (err.response.data.err_code == 11000) {
                UIkit.modal.alert("Código duplicado");
              }
            }
          }
        );
    }*/
  };

  const getAppSelection = (app) => {
    setAppId(app);
  };

  return (
    <div>
      <h1>{action} rol</h1>
      <form onSubmit={handleSubmit} className="uk-form-horizontal">
        <div className="uk-margin">
          <label className="uk-form-label">Código</label>
          <div className="uk-form-controls">
            <input
              id="code"
              placeholder="Código"
              className="uk-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              //margin="normal"
              required
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Descripción</label>
          <div className="uk-form-controls">
            <input
              id="description"
              placeholder="Descripción"
              className="uk-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              //margin="normal"
              required
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Fecha expiración</label>
          <div className="uk-form-controls">
            <input
              id="expirationDate"
              placeholder="Fecha de expiración"
              className="uk-input"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              //margin="normal"
              //variant="outlined"
              type="date"
              required
            />
          </div>
        </div>
        <div className="uk-margin">
          {/* <AdvancedSearch
            disabled={false}
            pkFieldValue={appId}
            //rellabel="App"
            controller="app"
            pk="_id"
            onSelection={getAppSelection}
            columns={[{ columnName: "code", title: "Código" }]}
            filter={[]} 
          />*/}
        </div>
      </form>
      <div>
        <a className="uk-button uk-button-default uk-width-1-2" href="/#/roles">
          Volver
        </a>
        <button
          className="uk-button uk-button-primary uk-width-1-2"
          onClick={handleSubmit}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default RoleCreate;
