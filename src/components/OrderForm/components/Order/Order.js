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
import {
  API_URL,
  HEADERS,
  HEADERS_POST,
  ORDER_STATUS_CONFIRMED_ID,
  ORDER_STATUS_CANCELLED_ID,
} from "../../../../constants/constants";
import { formateDate } from "../../../../utils/calculations";
import { makePriceWithGap } from "../../../../utils/priceWithGap";

import "./Order.scss";

function Order({
  setIsActiveModel,
  setIsActiveAdditionally,
  setIsActiveTotal,
  setIsConfirmedOrder,
  isConfirmedOrder,
  setOrderId,
}) {
  const [orderPoint, setOrderPoint] = useState({});
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
  const [isCancelledOrder, setIsCancelledOrder] = useState(false);

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
  } else if (location.pathname === "/order-form/total" && !isConfirmedOrder) {
    btnText = "Заказать";
  } else {
    btnText = "Отменить";
  }

  useEffect(() => {
    if (location.pathname === "/order-form/location" && orderPoint.address) {
      setIsDisabled(false);
      setIsActiveModel(true);
    }
    if (location.pathname === "/order-form/model" && orderModel.name) {
      setIsDisabled(false);
      setIsActiveAdditionally(true);
    }
    if (
      location.pathname === "/order-form/additionally" &&
      isOrderDate &&
      totalPrice >= orderModel.priceMin &&
      totalPrice <= orderModel.priceMax
    ) {
      setIsDisabled(false);
      setIsActiveTotal(true);
    }
    if (
      location.pathname === "/order-form/additionally" &&
      (!isOrderDate ||
        totalPrice < orderModel.priceMin ||
        totalPrice > orderModel.priceMax ||
        totalPrice === undefined)
    ) {
      setIsDisabled(true);
      setIsActiveTotal(false);
    }
  }, [isOrderDate, location.pathname, orderModel, orderPoint, totalPrice]); // eslint-disable-line

  function handleSubmitPoint(cityPointObject) {
    setOrderPoint(cityPointObject);
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
    } else if (location.pathname === "/order-form/total" && !isConfirmedOrder) {
      togglePopup();
    } else {
      const resData = sendDataToServer(ORDER_STATUS_CANCELLED_ID);
      resData
        .then((res) => {
          setIsCancelledOrder(true);
          setIsDisabled(true);
          setIsConfirmedOrder(false);
        })
        .catch((err) => {
          console.log(err);
          alert(`Не удается установить связь с сервером и отменить заказ.`);
        });
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
    (async () => {
      try {
        const response = await fetch(`${API_URL}/db/rate`, {
          method: "GET",
          headers: HEADERS,
        });
        const resData = await response.json();
        setRates(
          resData.data.map((item) => ({
            type: item.rateTypeId.name,
            id: item.rateTypeId.id,
            price: item.price,
            unit: item.rateTypeId.unit,
          }))
        );
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

  function getTotalPrice(price) {
    if (price) {
      setTotalPrice(price);
    } else if (price === undefined) {
      setTotalPrice(undefined);
    }
  }

  useEffect(() => {
    if (
      totalPrice &&
      (totalPrice < orderModel.priceMin || totalPrice > orderModel.priceMax)
    ) {
      alert(
        `Для продолжения заказа необходимо набрать сумму 
         не менее ${makePriceWithGap(orderModel.priceMin)}руб
         и не более ${makePriceWithGap(orderModel.priceMax)}руб. 
         Сейчас расчетная цена = ${makePriceWithGap(totalPrice)}руб.`
      );
    } else if (totalPrice === undefined) {
      alert(
        `К сожалению, на данный момент выбранный тариф не может быть применен.
         Выберите другой тариф и продолжите оформлять заказ`
      );
    }
  }, [totalPrice, orderModel]);

  function sendDataToServer(statusId) {
    const orderColor = orderOtherServices.find((item) => {
      return item.title === "Цвет";
    });
    let selectedColor;
    if (orderColor) {
      selectedColor = orderColor.name.toLowerCase();
    } else {
      selectedColor = orderModel.colors[0];
    }
    const orderRate = orderOtherServices.find((item) => {
      return Object.values(item).includes("Тариф");
    });
    let rateId;
    if (orderRate) {
      const rate = rates.find((elem) => {
        return elem.type === orderRate.name;
      });
      rateId = rate.id;
    } else {
      rateId = rates[0].id;
    }
    const dateFrom = formateDate(searchFromDate);
    const dateTo = formateDate(searchToDate);

    const isFullTank = orderOtherServices.some((item) => {
      return item.title === "Полный бак" && item.name;
    });
    const isNeedChildChair = orderOtherServices.some((item) => {
      return item.title === "Детское кресло" && item.name;
    });
    const isRightWheel = orderOtherServices.some((item) => {
      return item.title === "Правый руль" && item.name;
    });

    return fetch(`${API_URL}/db/order/`, {
      method: "POST",
      headers: HEADERS_POST,
      body: JSON.stringify({
        orderStatusId: statusId,
        cityId: orderPoint.cityId,
        pointId: orderPoint.pointId,
        carId: orderModel.id,
        color: selectedColor,
        dateFrom: +dateFrom,
        dateTo: +dateTo,
        rateId: rateId,
        price: totalPrice,
        isFullTank: isFullTank,
        isNeedChildChair: isNeedChildChair,
        isRightWheel: isRightWheel,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  function confirmOrder() {
    const resData = sendDataToServer(ORDER_STATUS_CONFIRMED_ID);
    resData
      .then((res) => {
        setOrderId(res.data.id);
        togglePopup();
        setIsConfirmedOrder(true);
        history.push(`/order-form/total/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Не удается установить связь с сервером и подтвердить заказ.
           Попробуйте проверить подключение к Интернет
           или открыть приложение через несколько минут`
        );
      });
  }

  return (
    <>
      <div className="order">
        <h2 className="order__title">Ваш заказ:</h2>
        {orderPoint.city && (
          <Item
            title="Пункт выдачи"
            name={`${orderPoint.city}, ${orderPoint.address}`}
            modifier="point"
          />
        )}
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
          location.pathname !== "/order-form/location" &&
          totalPrice && <PriceContainer price={makePriceWithGap(totalPrice)} />}
        <Button
          text={btnText}
          className={`button button_max button_order ${
            isDisabled ? "button_disabled" : ""
          } ${isConfirmedOrder ? "button_theme_red" : ""}`}
          onClick={handleClick}
          disabled={isDisabled}
        />
        {isPopupOpened && (
          <Popup confirmOrder={confirmOrder} togglePopup={togglePopup} />
        )}
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
          <Total
            carModel={orderModel}
            startDate={searchFromDate}
            isConfirmedOrder={isConfirmedOrder}
            isCancelledOrder={isCancelledOrder}
          />
        </Route>
      </Switch>
    </>
  );
}

export default Order;
