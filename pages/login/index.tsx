import { useState } from "react";
import classNames from 'classnames';

export default () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  //Form error handling
  let [usernameError, setUsernameError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(true);
    }

    if (password === "") {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    
    // TODO: Call login service
  };

  return (
    <div className="uk-card uk-card-default" style={{ padding: 25 }}>
      <h1 className="uk-heading-small">Bienvenido</h1>
      <form
        onSubmit={handleSubmit}
        className="uk-flex uk-flex-center uk-flex-column"
      >
        <div>
          <input
            id="username"
            className={classNames("uk-align-center uk-input", {
              "uk-form-danger": usernameError,
            })}
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            id="password"
            className={classNames("uk-align-center uk-input", {
              "uk-form-danger": passwordError,
            })}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="uk-button uk-button-primary">Ingresar</button>
      </form>
    </div>
  );
};
