import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import Logo from "../Logo/Logo";
import * as adminAuth from "../../../../adminAuth";
import { createClassName } from "../../../../utils/createClassName";
import "./Login.scss";

function Login({ handleLogin }) {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const createCn = (element, modifier) =>
    createClassName("login", element, modifier);

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
    <div className={createCn()}>
      <Logo text="Need for drive" />
      <div className={createCn("container")}>
        <h3 className={createCn("title")}>Вход</h3>
        <form className={createCn("form")} onSubmit={handleSubmit}>
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
          <div className={createCn("button-container")}>
            <p className={createCn("text")}>Запросить доступ</p>
            <AdminButton text="Войти" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
