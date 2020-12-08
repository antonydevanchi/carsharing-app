import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Location from "../Location/Location";
import CarModel from "../CarModel/CarModel";
import Additionally from "../Additionally/Additionally";
import Total from "../Total/Total";
import Button from "../../../Button/Button";
import Item from "./components/Item/Item";
import PriceContainer from "./components/PriceContainer/PriceContainer";
import { API_URL, HEADERS } from "../../../../constants/constants";
import { makePriceWithGap } from "../../../../utils/price";
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
  const orderOtherServices = [
    { title: "Цвет", name: "Голубой" },
    { title: "Длительность аренды", name: "1д 2ч" },
    { title: "Тариф", name: "На сутки" },
    { title: "Полный бак", name: "Да" },
  ];
  const isOrderDate = orderOtherServices.some((item) => {
    return Object.values(item).includes("Длительность аренды");
  });

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
      (location.pathname === "/order-form/additionally" && isOrderDate)
    ) {
      setIsDisabled(false);
    }
  }, [orderPoint, orderModel, isOrderDate, location.pathname]);

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
    (async () => {
      try {
        const response = await fetch(`${API_URL}/db/car`, {
          method: "GET",
          headers: HEADERS,
        });
        const resData = await response.json();
        setCards(resData.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Ошибка. запрос не выполнен");
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredCards(
      cards.filter((card) => {
        if (search !== "Все модели") {
          return card.categoryId.name === search;
        } else {
          return cards;
        }
      })
    );
  }, [cards, search]);

  return (
    <>
      <div className="order">
        <h2 className="order__title">Ваш заказ:</h2>
        <Item title="Пункт выдачи" name={orderPoint} modifier="point" />

        {location.pathname !== "/order-form/location" && (
          <Item title="Модель" name={orderModel} />
        )}
        {location.pathname !== "/order-form/location" &&
          location.pathname !== "/order-form/model" &&
          orderOtherServices.map((item, i) => (
            <Item key={i} title={item.title} name={item.name} />
          ))}
        {location.pathname === "/order-form/model" && orderModel && (
          <PriceContainer
            priceMin={makePriceWithGap(priceMin)}
            priceMax={makePriceWithGap(priceMax)}
          />
        )}
        {location.pathname !== "/order-form/model" &&
          location.pathname !== "/order-form/location" && (
            <PriceContainer price="16 000" />
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
