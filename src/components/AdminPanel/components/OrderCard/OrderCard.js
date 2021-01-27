import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import SucsessBlock from "../SucsessBlock/SucsessBlock";
import AdminTitle from "../AdminTitle/AdminTitle";
import AdminInput from "../AdminInput/AdminInput";
import { createClassName } from "../../../../utils/createClassName";
import { makePriceWithGap } from "../../../../utils/priceWithGap";
import { transformDate } from "../../../../utils/transformDate";
import { getData, deleteEntity, changeEntity } from "../../../../adminFetch";
import { estimatePrice, formateDate } from "../../../../utils/calculations";
import "./OrderCard.scss";

function OrderCard() {
  const [order, setOrder] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [isOrderData, setIsOrderData] = useState(false);
  const [isSucsess, setIsSucsess] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isDeletionDisabled, setIsDeletionDisabled] = useState(true);
  const [isSavingDisabled, setIsSavingDisabled] = useState(true);
  const [isInputError, setIsInputError] = useState(false);
  const [rates, setRates] = useState([]);
  const [orderModel, setOrderModel] = useState({});
  const [changedValues, setChangedValues] = useState({});
  const history = useHistory();
  const createCn = (element, modifier) =>
    createClassName("order-card", element, modifier);

  useEffect(() => {
    if (sessionStorage.getItem("OrderData")) {
      const orderData = JSON.parse(sessionStorage.getItem("OrderData"));
      setOrder(orderData);
      setInputValues({
        orderStatusId: orderData.orderStatusId.name,
        cityId: orderData.cityId.name,
        pointId: orderData.pointId.address,
        carId: { name: orderData.carId.name, id: orderData.carId.id },
        color: orderData.color ? orderData.color : "Любой",
        dateFrom: transformDate(orderData.dateFrom),
        dateTo: transformDate(orderData.dateTo),
        rateId: orderData.rateid
          ? { name: orderData.rateid.name, id: orderData.rateid.id }
          : "",
        price: makePriceWithGap(orderData.price),
        isFullTank: orderData.isFullTank ? "Да" : "Нет",
        isNeedChildChair: orderData.isNeedChildChair ? "Да" : "Нет",
        isRightWheel: orderData.isRightWheel ? "Да" : "Нет",
      });
      setIsOrderData(true);
      setIsDeletionDisabled(false);

      return () => {
        sessionStorage.clear();
      };
    }
  }, []);

  useEffect(() => {
    getData("/db/rate")
      .then((resData) => {
        setRates(
          resData.data.map((item) => ({
            type: item.rateTypeId.name,
            id: item.rateTypeId.id,
            price: item.price,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (order.carId) {
      getData(`/db/car/${order.carId.id}`)
        .then((resData) => {
          setOrderModel({
            priceMin: resData.data.priceMin,
            priceMax: resData.data.priceMax,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [order]);

  useEffect(() => {
    const isCompletedArray = Object.values(inputValues).every((item) => {
      if (typeof item !== "object") {
        return !!item;
      } else return Object.values(item)[0];
    });
    !isInputError && isCompletedArray
      ? setIsSavingDisabled(false)
      : setIsSavingDisabled(true);
  }, [inputValues, isInputError]);

  useEffect(() => {
    const otherServices = [
      order.isFullTank ? "Полный бак" : "",
      order.isNeedChildChair ? "Детское кресло" : "",
      order.isRightWheel ? "Правый руль" : "",
    ];

    if (
      inputValues.dateFrom &&
      inputValues.dateTo &&
      inputValues.rateId &&
      rates
    ) {
      const estimatedPrice = estimatePrice(
        inputValues.dateFrom,
        inputValues.dateTo,
        inputValues.rateId.type,
        otherServices,
        rates
      );
      if (
        estimatedPrice &&
        estimatedPrice > 0 &&
        (estimatedPrice < orderModel.priceMin ||
          estimatedPrice > orderModel.priceMax) &&
        !isInputError
      ) {
        alert(
          `Для продолжения заказа необходимо набрать сумму 
         не менее ${makePriceWithGap(orderModel.priceMin)}руб
         и не более ${makePriceWithGap(orderModel.priceMax)}руб. 
         Сейчас расчетная цена = ${makePriceWithGap(estimatedPrice)}`
        );
        setIsSavingDisabled(true);
        setIsResetDisabled(false);
      }
      if (estimatedPrice === undefined && !isInputError) {
        alert(
          `К сожалению, на данный момент выбранный тариф не может быть применен.
         Выберите другой тариф и продолжите оформлять заказ`
        );
        setIsSavingDisabled(true);
      }
      if (estimatedPrice && estimatedPrice > 0 && !isInputError) {
        setInputValues({ ...inputValues, price: estimatedPrice });
        setChangedValues({
          ...changedValues,
          price: estimatedPrice,
        });
        setIsResetDisabled(false);
      }
    }
  }, [
    inputValues.dateFrom,
    inputValues.dateTo,
    inputValues.rateId,
    rates,
    isInputError,
    orderModel,
  ]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "rateId") {
      const rateObject = rates.find((rate) => rate.type === value);
      if (!rateObject) {
        setIsInputError(true);
        setIsSavingDisabled(true);
        setInputValues({ ...inputValues, [name]: { type: value } });
      } else {
        setInputValues({
          ...inputValues,
          [name]: { type: value, id: rateObject.id },
        });
        setIsInputError(false);
        setChangedValues({
          ...changedValues,
          [name]: { name: value, id: rateObject.id },
        });
      }
    } else {
      setInputValues({ ...inputValues, [name]: value });
      setChangedValues({
        ...changedValues,
        [name]: value,
      });
    }
  }

  function checkValues() {
    let formattedDateFrom = changedValues.dateFrom
      ? formateDate(changedValues.dateFrom)
      : "";
    let formattedDateTo = changedValues.dateTo
      ? formateDate(changedValues.dateTo)
      : "";

    if (changedValues.dateFrom && changedValues.dateTo) {
      return {
        ...changedValues,
        dateFrom: +formattedDateFrom,
        dateTo: +formattedDateTo,
      };
    } else if (changedValues.dateTo) {
      return { ...changedValues, dateTo: +formattedDateTo };
    } else if (changedValues.dateFrom) {
      return { ...changedValues, dateFrom: +formattedDateFrom };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const chekedValues = checkValues();
    changeEntity("order", order.id, chekedValues)
      .then((res) => {
        setIsSucsess(true);
        setIsDeletionDisabled(true);
        setIsSavingDisabled(true);
        setIsResetDisabled(true);
      })
      .catch((err) => {
        setIsSucsess(false);
        alert("Что-то пошло не так... Заказ не изменен");
      });
  }

  function handleReset() {
    setInputValues({
      orderStatusId: order.orderStatusId.name,
      cityId: order.cityId.name,
      pointId: order.pointId.address,
      carId: { name: order.carId.name, id: order.carId.id },
      color: order.color ? order.color : "Любой",
      dateFrom: transformDate(order.dateFrom),
      dateTo: transformDate(order.dateTo),
      rateId: order.rateid
        ? { name: order.rateid.name, id: order.rateid.id }
        : "",
      price: makePriceWithGap(order.price),
      isFullTank: order.isFullTank ? "Да" : "Нет",
      isNeedChildChair: order.isNeedChildChair ? "Да" : "Нет",
      isRightWheel: order.isRightWheel ? "Да" : "Нет",
    });
    setIsResetDisabled(true);
    setIsInputError(false);
    setChangedValues({});
  }

  function handleDelete(orderId) {
    deleteEntity("order", orderId)
      .then((res) => {
        history.push("/admin/content");
      })
      .catch((err) => {
        alert("Что-то пошло не так... Заказ не удален");
      });
  }

  return (
    <>
      {isSucsess && <SucsessBlock text="Заказ сохранен" />}
      <AdminTitle text="Карточка заказа" />
      {isOrderData && (
        <div className={createCn()}>
          <h3 className={createCn("title")}>Настройки заказа</h3>
          <form className={createCn("form")} onSubmit={handleSubmit}>
            <div className={createCn("container")}>
              <div className={createCn("input-container")}>
                <AdminInput
                  label="Модель автомобиля"
                  id="carId"
                  type="text"
                  placeholder="Введите модель автомобиля..."
                  position="left"
                  value={inputValues.carId.name}
                  readOnly={true}
                />
                <AdminInput
                  label="Город"
                  id="cityId"
                  type="text"
                  value={inputValues.cityId}
                  position="left"
                  readOnly={true}
                />
                <AdminInput
                  label="Пункт"
                  id="pointId"
                  type="text"
                  placeholder="Введите пункт..."
                  value={inputValues.pointId}
                  readOnly={true}
                />
              </div>
              <div className={createCn("input-container")}>
                <AdminInput
                  label="Дата начала аренды"
                  id="dateFrom"
                  type="text"
                  placeholder="Введите дату ..."
                  position="left"
                  value={inputValues.dateFrom}
                  onChange={handleChange}
                  date={true}
                />
                <AdminInput
                  label="Дата окончания аренды"
                  id="dateTo"
                  type="text"
                  placeholder="Введите дату..."
                  value={inputValues.dateTo}
                  onChange={handleChange}
                  position="left"
                  date={true}
                />
                <AdminInput
                  label="Статус заказа"
                  id="orderStatusId"
                  type="text"
                  placeholder="Выберите статус ..."
                  value={inputValues.orderStatusId}
                  readOnly={true}
                />
              </div>
              <div className={createCn("input-container")}>
                <AdminInput
                  label="Цена"
                  id="price"
                  type="text"
                  value={inputValues.price}
                  position="left"
                  readOnly={true}
                />
                <AdminInput
                  label="Тариф"
                  id="rateId"
                  type="text"
                  value={inputValues.rateId.name}
                  position="left"
                  onChange={handleChange}
                  isError={isInputError}
                />
                <AdminInput
                  label="Цвет"
                  id="color"
                  type="text"
                  value={inputValues.color}
                  readOnly={true}
                />
              </div>
              <div className={createCn("input-container")}>
                <AdminInput
                  label="Полный бак"
                  id="tank"
                  type="text"
                  value={inputValues.isFullTank}
                  readOnly={true}
                  position="left"
                />
                <AdminInput
                  label="Детское кресло"
                  id="chair"
                  type="text"
                  value={inputValues.isNeedChildChair}
                  readOnly={true}
                  position="left"
                />
                <AdminInput
                  label="Правый руль"
                  id="wheel"
                  type="text"
                  value={inputValues.isRightWheel}
                  readOnly={true}
                />
              </div>
            </div>
            <ButtonBlock
              handleReset={handleReset}
              isResetDisabled={isResetDisabled}
              handleDelete={() => handleDelete(order.id)}
              isDeletionDisabled={isDeletionDisabled}
              isSavingDisabled={isSavingDisabled}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default OrderCard;
