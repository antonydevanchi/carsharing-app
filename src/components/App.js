import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import TitlePage from "./TitlePage/TitlePage";
import OrderForm from "./OrderForm/OrderForm";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="start-screen">
        <Navbar />
        <Switch>
          <Route path="/carsharing-app">
            <TitlePage />
          </Route>
          <Route path="/order-form">
            <div className="order-page">
              <Header />
              <OrderForm />
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
