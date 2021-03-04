import React, { useState, useEffect } from "react";
//import http from '../../http/genericComunication'
//import HashHistory from '../../history/HashHistory'

const AppCreateComponent = (props) => {
  let [action, setAction] = useState("");
  let [_id, setId] = useState("");
  let [code, setCode] = useState("");
  let [description, setDescription] = useState("");
  let [url, setUrl] = useState("");

  useEffect(() => {
    /*var location = HashHistory.location.pathname.split('/')
        setAction(location[location.length - 1] == 'new' ? 'Crear' : 'Modificar')
        if (action == 'Modificar')
            getAppInfo()*/
  }, []);

  const getAppInfo = () => {
    /*http.patch('app', null, { _id: _id }, null)
        .then(app => {
            setCode(app.data.code)
            setDescription(app.data.description)
            setUrl(app.data.description)
        },
            err => {
                alert(err.response.data.message)
            })*/
  };

  const handleSubmit = () => {
    /*if (action == "Crear") {
      http.post("app", { code, description, url }, null, null).then(
        (resp) => {
          UIkit.modal.alert(resp.data.message);
          HashHistory.push("/apps");
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
    } else {
      http
        .put(
          "app",
          { code: code, description: description, url: url },
          { _id: _id },
          null
        )
        .then(
          (resp) => {
            console.log("salio OK", resp);
            UIkit.modal.alert(resp.data.message);
            HashHistory.push("/apps");
          },
          (err) => {
            console.log("Salio mal", err.response.data.message);
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

  return (
    <div>
      <h1>{action} aplicación</h1>
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
              //variant="outlined"
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
              //variant="outlined"
              required
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">URL</label>
          <div className="uk-form-controls">
            <input
              id="url"
              placeholder="URL"
              className="uk-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              //margin="normal"
              //variant="outlined"
              type="text"
              required
            />
          </div>
        </div>
      </form>
      <div>
        <button className="uk-button uk-button-default uk-width-1-2">
          Volver
        </button>
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

export default AppCreateComponent;
