import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import TitlePage from "./TitlePage/TitlePage";
import OrderForm from "./OrderForm/OrderForm";
import Login from "./AdminPanel/components/Login/Login";
import AdminPanel from "./AdminPanel/AdminPanel";
import * as adminAuth from "../adminAuth";
import "./App.scss";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []); // eslint-disable-line

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    if (loggedIn) {
      history.push("/admin/content");
    }
  }, [loggedIn]); // eslint-disable-line

  function tokenCheck() {
    if (localStorage.getItem("tokenData")) {
      const isTokenActual = Date.now() < localStorage.getItem("controlDate");
      const token = JSON.parse(localStorage.getItem("tokenData")).access_token;

      if (token && isTokenActual) {
        adminAuth
          .getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
            }
          })
          .catch((err) => console.log(err));
      }
      if (token && !isTokenActual) {
        const refreshToken = JSON.parse(localStorage.getItem("tokenData"))
          .refresh_token;
        const refreshKey = localStorage.getItem("refreshKey");
        adminAuth
          .refreshToken(refreshToken, refreshKey)
          .then((data) => {
            if (data) {
              setLoggedIn(true);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

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
          <Login handleLogin={handleLogin} />
        </Route>
        {loggedIn && (
          <Route path="/admin/content">
            <AdminPanel />
          </Route>
        )}
        <Route>
          {loggedIn ? (
            <Redirect to="/admin/login" />
          ) : (
            <Redirect to="/carsharing-app" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
