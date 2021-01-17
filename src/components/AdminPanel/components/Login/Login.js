import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import Logo from "../Logo/Logo";
import * as adminAuth from "../../../../adminAuth";
import "./Login.scss";

function Login({ handleLogin }) {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValues.username || !inputValues.password) {
      return;
    }
    adminAuth
      .authorize(inputValues.username, inputValues.password)
      .then((data) => {
        if (data.access_token) {
          setInputValues({ username: "", password: "" });
          handleLogin();
          history.push("/admin/content");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <Logo text="Need for drive" />
      <div className="login__container">
        <h3 className="login__title">Вход</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <AdminInput
            label="Почта"
            id="username"
            type="text"
            value={inputValues.username}
            onChange={handleChange}
            placeholder="Введите электронную почту"
            kind="login"
          />
          <AdminInput
            label="Пароль"
            id="password"
            type="password"
            value={inputValues.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            kind="login"
          />
          <div className="login__button-container">
            <p className="login__text">Запросить доступ</p>
            <AdminButton text="Войти" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
