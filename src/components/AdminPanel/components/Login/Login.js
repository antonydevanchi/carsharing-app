import React from "react";
import { withRouter } from "react-router-dom";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import Logo from "../Logo/Logo";
import * as adminAuth from "../../../../adminAuth";
import "./Login.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      return;
    }
    adminAuth
      .authorize(this.state.username, this.state.password)
      .then((data) => {
        if (data.access_token) {
          this.setState({ username: "", password: "" }, () => {
            this.props.handleLogin();
            this.props.history.push("/admin/content");
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="login">
        <Logo text="Need for drive" />
        <div className="login__container">
          <h3 className="login__title">Вход</h3>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <AdminInput
              label="Почта"
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Введите электронную почту"
              kind="login"
            />
            <AdminInput
              label="Пароль"
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
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
}

export default withRouter(Login);
