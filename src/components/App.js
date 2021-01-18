import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import TitlePage from "./TitlePage/TitlePage";
import OrderForm from "./OrderForm/OrderForm";
import Login from "./AdminPanel/components/Login/Login";
import AdminPanel from "./AdminPanel/AdminPanel";
import * as adminAuth from "../adminAuth";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.tokenCheck = this.tokenCheck.bind(this);
  }
  componentDidMount() {
    this.tokenCheck();
  }
  handleLogin() {
    this.setState({
      loggedIn: true,
    });
  }

  tokenCheck() {
    if (localStorage.getItem("tokenData")) {
      const isTokenActual = Date.now() < localStorage.getItem("controlDate");
      const token = JSON.parse(localStorage.getItem("tokenData")).access_token;

      if (token && isTokenActual) {
        adminAuth.getContent(token).then((res) => {
          if (res) {
            this.setState(
              {
                loggedIn: true,
              },
              () => {
                this.props.history.push("/admin/content");
              }
            );
          }
        });
      }
      if (token && !isTokenActual) {
        const refreshToken = JSON.parse(localStorage.getItem("tokenData"))
          .refresh_token;
        const refreshKey = localStorage.getItem("refreshKey");
        adminAuth
          .refreshToken(refreshToken, refreshKey)
          .then((data) => {
            if (data) {
              this.setState(
                {
                  loggedIn: true,
                },
                () => {
                  this.props.history.push("/admin/content");
                }
              );
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  render() {
    return (
      <div className="start-screen">
        <Switch>
          <Route path="/carsharing-app">
            <Navbar />
            <TitlePage />
          </Route>
          <Route path="/order-form">
            <Navbar />
            <div className="order-page">
              <Header />
              <OrderForm />
            </div>
          </Route>
          <Route path="/admin/login">
            <Login handleLogin={this.handleLogin} />
          </Route>
          {this.state.loggedIn && (
            <Route path="/admin/content">
              <AdminPanel />
            </Route>
          )}
          <Route>
            {this.state.loggedIn ? (
              <Redirect to="/admin/login" />
            ) : (
              <Redirect to="/carsharing-app" />
            )}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
