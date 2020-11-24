import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Location from "../Location/Location";
import CarModel from "../CarModel/CarModel";
import Additionally from "../Additionally/Additionally";
import Total from "../Total/Total";
import Button from "../../../Button/Button";
import Item from "./components/Item/Item";
import "./Order.scss";

function Order() {
  const [orderPoint, setOrderPoint] = useState("");
  const orderModel = "Hyndai, i30 N";
  const orderColor = "Голубой";
  const orderDate = "1д 2ч";
  const orderRate = "На сутки";
  const orderOtherServices = "Да";

  const history = useHistory();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);
  const btnClasses = `button button_max button_order ${
    isDisabled ? "button_disabled" : ""
  }`;

  let btnText;
  if (location.pathname === "/order-form/location") {
    btnText = "Выбрать модель";
  } else if (location.pathname === "/order-form/model") {
    btnText = "Дополнительно";
  } else if (location.pathname === "/order-form/additionally") {
    btnText = "Итого";
  } else if (location.pathname === "/order-form/total") {
    btnText = "Заказать";
  } else {
    btnText = "Отменить";
  }

  useEffect(() => {
    if (orderPoint !== "") {
      setIsDisabled(false);
    }
  }, [orderPoint]);

  function handleSubmit(cityPoint) {
    setOrderPoint(cityPoint);
  }

  function handleClick() {
    if (location.pathname === "/order-form/location") {
      history.push("/order-form/model");
    } else if (location.pathname === "/order-form/model") {
      history.push("/order-form/model");
    } else if (location.pathname === "/order-form/additionally") {
      history.push("/order-form/additionally");
    } else {
      history.push("/order-form/total");
    }
  }

  return (
    <>
      <div className="order">
        <h2 className="order__title">Ваш заказ:</h2>
        <Item
          title="Пункт выдачи"
          name={orderPoint}
          className="item__text item__text_thin item__text_point"
        />

        {location.pathname !== "/order-form/location" && (
          <Item
            title="Модель"
            name={orderModel}
            className="item__text item__text_thin"
          />
        )}
        {location.pathname !== "/order-form/location" &&
          location.pathname !== "/order-form/model" && (
            <>
              <Item
                title="Цвет"
                name={orderColor}
                className="item__text item__text_thin"
              />
              <Item
                title="Длительность аренды"
                name={orderDate}
                className="item__text item__text_thin"
              />
              <Item
                title="Тариф"
                name={orderRate}
                className="item__text item__text_thin"
              />
              <Item
                title="Полный бак"
                name={orderOtherServices}
                className="item__text item__text_thin"
              />
            </>
          )}

        {location.pathname === "/order-form/model" && (
          <div className="order__container">
            <h3 className="order__price order__price_title">Цена:</h3>
            <span className="order__price">от</span>
            <span className="order__price">8 000</span>
            <span className="order__price">до</span>
            <span className="order__price">12 000</span>
            <span className="order__price">₽</span>
          </div>
        )}
        {location.pathname !== "/order-form/model" &&
          location.pathname !== "/order-form/location" && (
            <div className="order__container">
              <h3 className="order__price order__price_title">Цена:</h3>
              <span className="order__price">16 000</span>
              <span className="order__price">₽</span>
            </div>
          )}

        <Button
          text={btnText}
          className={btnClasses}
          onClick={handleClick}
          disabled={isDisabled}
        />
      </div>
      <Switch>
        <Route path="/order-form/location">
          <Location handleSubmit={handleSubmit} />
        </Route>
        <Route path="/order-form/model">
          <CarModel />
        </Route>
        <Route path="/order-form/additionally">
          <Additionally />
        </Route>
        <Route path="/order-form/total">
          <Total />
        </Route>
      </Switch>
    </>
  );
}

export default Order;
