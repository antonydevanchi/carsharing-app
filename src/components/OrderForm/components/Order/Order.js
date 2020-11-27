import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Location from "../Location/Location";
import CarModel from "../CarModel/CarModel";
import Additionally from "../Additionally/Additionally";
import Total from "../Total/Total";
import Button from "../../../Button/Button";
import Item from "./components/Item/Item";
import { API_URL, HEADERS } from "../../../../constants/constats";
import "./Order.scss";

function Order() {
  const [orderPoint, setOrderPoint] = useState("");

  const [orderModel, setOrderModel] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const orderColor = "Голубой";
  const orderDate = "1д 2ч";
  const orderRate = "На сутки";
  const orderOtherServices = "Да";

  const history = useHistory();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);

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
    if (
      (location.pathname === "/order-form/location" && orderPoint !== "") ||
      (location.pathname === "/order-form/model" && orderModel !== "") ||
      (location.pathname === "/order-form/additionally" && orderDate !== "")
    ) {
      setIsDisabled(false);
    }
  }, [orderPoint, orderModel, orderDate, location.pathname]);

  function handleSubmitPoint(cityPoint) {
    setOrderPoint(cityPoint);
  }
  function handleSubmitModel(Model) {
    setOrderModel(Model);
  }

  function displayPrice(minPrice, maxPrice) {
    setPriceMin(minPrice);
    setPriceMax(maxPrice);
  }

  function handleClick() {
    if (location.pathname === "/order-form/location") {
      history.push("/order-form/model");
      setIsDisabled(true);
    } else if (location.pathname === "/order-form/model") {
      history.push("/order-form/additionally");
      setIsDisabled(true);
    } else if (location.pathname === "/order-form/additionally") {
      history.push("/order-form/total");
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/db/car`, {
      method: "GET",
      headers: HEADERS,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCards(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Ошибка. запрос не выполнен");
      });
  }, []);

  useEffect(() => {
    setFilteredCards(
      cards.filter((card) => {
        return card.categoryId.name === search;
      })
    );
  }, [cards, search]);

  function makePriceWithGap(number) {
    let priceWithGap;
    if (number >= 1000) {
      const integer = parseInt(number / 1000, 10);
      if (number % 1000 === 0) {
        priceWithGap = `${integer} 000`;
      } else {
        const float = (number / 1000 - integer).toFixed(3) * 1000;
        priceWithGap = `${integer} ${float} `;
      }
    } else {
      priceWithGap = number;
    }
    return priceWithGap;
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

        {location.pathname === "/order-form/model" && orderModel && (
          <div className="order__container">
            <h3 className="order__price order__price_title">Цена:</h3>
            <span className="order__price">от</span>
            <span className="order__price">{makePriceWithGap(priceMin)}</span>
            <span className="order__price">до</span>
            <span className="order__price">{makePriceWithGap(priceMax)}</span>
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
          className={`button button_max button_order ${
            isDisabled ? "button_disabled" : ""
          }`}
          onClick={handleClick}
          disabled={isDisabled}
        />
      </div>
      <Switch>
        <Route path="/order-form/location">
          <Location handleSubmit={handleSubmitPoint} />
        </Route>
        <Route path="/order-form/model">
          <CarModel
            handleSubmit={handleSubmitModel}
            displayPrice={displayPrice}
            cards={cards}
            search={search}
            isLoading={isLoading}
            filteredCards={filteredCards}
            setSearch={setSearch}
            makePriceWithGap={makePriceWithGap}
          />
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
