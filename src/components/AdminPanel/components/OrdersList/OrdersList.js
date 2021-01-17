import React, { useEffect, useState } from "react";
import List from "../List/List";
import AdminTitle from "../AdminTitle/AdminTitle";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  ORDERS_NUMBER_TO_SHOW,
  STATUSES,
  CITIES,
  PERIODS,
  CARS,
} from "../../../../constants/constants";
import { getData, getSelectOptions } from "../../../../adminFetch";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [orderPages, setOrderPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const ordersUrlStart = `/db/order?page=${currentPage}&limit=${ORDERS_NUMBER_TO_SHOW}&sort[createdAt]=-1`;
  const [ordersUrlEnd, setOrdersUrlEnd] = useState("");
  const ordersUrl = ordersUrlStart + ordersUrlEnd;
  const [isFetchError, setIsFetchError] = useState(false);
  const [cities, setCities] = useState([]);
  const allCities = CITIES.concat(cities);
  const [statuses, setStatuses] = useState([]);
  const allStatuses = STATUSES.concat(statuses);
  const [cars, setCars] = useState([]);
  const allCars = CARS.concat(cars);
  const orderSelectFields = [PERIODS, allCars, allCities, allStatuses];
  const isOrdersList = true;
  const [searchItems, setSearchItems] = useState({
    periodValue: PERIODS[0].name,
    carValue: allCars[0].name,
    cityValue: allCities[0].name,
    statusValue: allStatuses[0].name,
  });
  const selectNames = ["periodValue", "carValue", "cityValue", "statusValue"];

  useEffect(() => {
    getSelectOptions("/db/city")
      .then((resData) => {
        setCities(
          resData.data.map((item) => ({
            name: item.name,
            cityId: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSelectOptions("/db/orderStatus")
      .then((resData) => {
        setStatuses(
          resData.data.map((item) => ({
            name: item.name,
            statusId: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSelectOptions("/db/car")
      .then((resData) => {
        setCars(
          resData.data.map((item) => ({
            name: item.name,
            carId: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getData(ordersUrl)
      .then((resData) => {
        setOrders(
          resData.data.map((item) => ({
            city: item.cityId ? item.cityId.name : "Неизвестный город",
            point:
              item.pointId && item.pointId.address
                ? item.pointId.address
                : "Неизвестный пункт",
            car: item.carId ? item.carId.name : "Неизвестная машина",
            dateFrom: item.dateFrom,
            dateTo: item.dateTo,
            price: item.price ? item.price : "",
            status: item.orderStatusId
              ? item.orderStatusId.name
              : "Неизвестный статус",
            image:
              item.carId && item.carId.thumbnail
                ? item.carId.thumbnail.path
                : "",
            color: item.color ? item.color : "Не выбран",
            isFullTank: item.isFullTank ? "Полный бак" : "",
            isNeedChildChair: item.isNeedChildChair ? "Детское кресло" : "",
            isRightWheel: item.isRightWheel ? "Правый руль" : "",
          }))
        );
        setOrderPages(Math.ceil(resData.count / ORDERS_NUMBER_TO_SHOW));
        setIsFetchError(false);
      })
      .catch((err) => {
        setIsFetchError(true);
        console.log(err);
      });
  }, [ordersUrl]);

  function handleClick(page) {
    setCurrentPage(page);
  }

  function findSearchWord(searchWord, keyArray) {
    const searchWordObject = keyArray.find((item) => {
      return item.name === searchWord;
    });
    return searchWordObject;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const period = findSearchWord(searchItems.periodValue, PERIODS);
    const car = findSearchWord(searchItems.carValue, allCars);
    const city = findSearchWord(searchItems.cityValue, allCities);
    const status = findSearchWord(searchItems.statusValue, allStatuses);
    setCurrentPage(0);
    setActiveIndex(0);
    let url = "";
    if (period.createdAt) {
      url = url + `${period.createdAt}`;
    }
    if (car.carId) {
      url = url + `&carId=${car.carId}`;
    }
    if (city.cityId) {
      url = url + `&cityId=${city.cityId}`;
    }
    if (status.statusId) {
      url = url + `&orderStatusId=${status.statusId}`;
    }
    setOrdersUrlEnd(url);
  }

  function resetFilters() {
    setCurrentPage(0);
    setActiveIndex(0);
    setOrdersUrlEnd("");
    setSearchItems({
      periodValue: PERIODS[0].name,
      carValue: allCars[0].name,
      cityValue: allCities[0].name,
      statusValue: allStatuses[0].name,
    });
  }

  if (isFetchError) {
    return <ErrorPage />;
  }

  return (
    <>
      <AdminTitle text="Заказы" />
      <List
        options={orders}
        selectFields={orderSelectFields}
        pages={orderPages}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
        resetFilters={resetFilters}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isOrdersList={isOrdersList}
        selectNames={selectNames}
      />
    </>
  );
}

export default OrdersList;
