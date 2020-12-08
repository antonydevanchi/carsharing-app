import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Location from "../Location/Location";
import CarModel from "../CarModel/CarModel";
import Additionally from "../Additionally/Additionally";
import Total from "../Total/Total";
import Button from "../../../Button/Button";
import Item from "./components/Item/Item";
import PriceContainer from "./components/PriceContainer/PriceContainer";
import Popup from "./components/Popup/Popup";
import { API_URL, HEADERS } from "../../../../constants/constants";
import { makePriceWithGap } from "../../../../utils/priceWithGap";

import "./Order.scss";

function Order(props) {
  const [orderPoint, setOrderPoint] = useState("");
  const [orderModel, setOrderModel] = useState({});
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderOtherServices, setOrderOtherServices] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [rates, setRates] = useState([]);

  const isOrderDate = orderOtherServices.some((item) => {
    if (item.name) {
      return Object.values(item).includes("Длительность аренды");
    } else return false;
  });

  function handleSubmitOtherServices(title, name) {
    const newList = orderOtherServices.slice();
    const isRepeated = newList.some((item) => {
      return item.title === title;
    });
    if (isRepeated) {
      let repeatedElem = newList.find((elem) => {
        return elem.title === title;
      });
      repeatedElem.name = name;
    } else {
      newList.push({ title, name });
    }
    setOrderOtherServices(newList);
  }

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
    (function toggleButtonAbility() {
      if (location.pathname === "/order-form/location" && orderPoint !== "") {
        setIsDisabled(false);
        props.setIsActiveModel(true);
      }
      if (location.pathname === "/order-form/model" && orderModel.name) {
        setIsDisabled(false);
        props.setIsActiveAdditionally(true);
      }
      if (
        location.pathname === "/order-form/additionally" &&
        isOrderDate &&
        totalPrice >= orderModel.priceMin &&
        totalPrice <= orderModel.priceMax
      ) {
        setIsDisabled(false);
        props.setIsActiveTotal(true);
      }
      if (
        location.pathname === "/order-form/additionally" &&
        (!isOrderDate ||
          totalPrice < orderModel.priceMin ||
          totalPrice > orderModel.priceMax)
      ) {
        setIsDisabled(true);
        props.setIsActiveTotal(false);
      }
    })();
  });

  function handleSubmitPoint(cityPoint) {
    setOrderPoint(cityPoint);
  }
  function handleSubmitModel(modelObject) {
    setOrderModel(modelObject);
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
    } else if (location.pathname === "/order-form/total") {
      togglePopup();
    }
  }

  function togglePopup() {
    setIsPopupOpened(!isPopupOpened);
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
    const rateTypes = [];
    (async () => {
      try {
        const response = await fetch(`${API_URL}/db/rate`, {
          method: "GET",
          headers: HEADERS,
        });
        const resData = await response.json();
        resData.data.map((item) => {
          rateTypes.push({
            type: item.rateTypeId.name,
            id: item.rateTypeId.id,
            price: item.price,
            unit: item.rateTypeId.unit,
          });
          return rateTypes;
        });
      } catch (error) {
        console.log("Ошибка. запрос не выполнен");
      }
      setRates(rateTypes);
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

  function getTotalPrice(price) {
    setTotalPrice(price);
  }

  useEffect(() => {
    if (
      !!totalPrice &&
      (totalPrice < orderModel.priceMin || totalPrice > orderModel.priceMax)
    ) {
      alert(
        `Для продолжения заказа необходимо набрать сумму 
         не менее ${makePriceWithGap(orderModel.priceMin)}руб
         и не более ${makePriceWithGap(orderModel.priceMax)}руб. 
         Сейчас расчетная цена = ${makePriceWithGap(totalPrice)}руб.`
      );
    }
  }, [totalPrice, orderModel]);

  return (
    <>
      <div className="order">
        <h2 className="order__title">Ваш заказ:</h2>
        <Item title="Пункт выдачи" name={orderPoint} modifier="point" />

        {location.pathname !== "/order-form/location" && (
          <Item title="Модель" name={orderModel.name} />
        )}
        {location.pathname !== "/order-form/location" &&
          location.pathname !== "/order-form/model" &&
          orderOtherServices.map(
            (item, i) =>
              item.name && <Item key={i} title={item.title} name={item.name} />
          )}
        {location.pathname === "/order-form/model" && orderModel && (
          <PriceContainer
            priceMin={makePriceWithGap(orderModel.priceMin)}
            priceMax={makePriceWithGap(orderModel.priceMax)}
          />
        )}
        {location.pathname !== "/order-form/model" &&
          location.pathname !== "/order-form/location" && (
            <PriceContainer price={makePriceWithGap(totalPrice)} />
          )}
        <Button
          text={btnText}
          className={`button button_max button_order ${
            isDisabled ? "button_disabled" : ""
          }`}
          onClick={handleClick}
          disabled={isDisabled}
        />
        {isPopupOpened && <Popup togglePopup={togglePopup} />}
      </div>
      <Switch>
        <Route path="/order-form/location">
          <Location handleSubmit={handleSubmitPoint} orderPoint={orderPoint} />
        </Route>
        <Route path="/order-form/model">
          <CarModel
            handleSubmit={handleSubmitModel}
            cards={cards}
            search={search}
            isLoading={isLoading}
            filteredCards={filteredCards}
            setSearch={setSearch}
            modelName={orderModel.name}
          />
        </Route>
        <Route path="/order-form/additionally">
          <Additionally
            handleSubmit={handleSubmitOtherServices}
            colors={orderModel.colors}
            getTotalPrice={getTotalPrice}
            setSearchFromDate={setSearchFromDate}
            setSearchToDate={setSearchToDate}
            searchFromDate={searchFromDate}
            searchToDate={searchToDate}
            tank={orderModel.tank}
            rates={rates}
            orderOtherServices={orderOtherServices}
          />
        </Route>
        <Route path="/order-form/total">
          <Total carModel={orderModel} startDate={searchFromDate} />
        </Route>
      </Switch>
    </>
  );
}

export default Order;
