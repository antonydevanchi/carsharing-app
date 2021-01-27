import React, { useEffect, useReducer } from "react";
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
import { ordersListReducer } from "../../../../ordersListReducer";

function OrdersList() {
  const initialState = {
    orders: [],
    orderPages: 0,
    currentPage: 0,
    activeIndex: 0,
    ordersUrlEnd: "",
    isFetchError: false,
    cities: [],
    statuses: [],
    cars: [],
    searchItems: {
      periodValue: PERIODS[0].name,
      carValue: CARS[0].name,
      cityValue: CITIES[0].name,
      statusValue: STATUSES[0].name,
    },
    selectNames: ["periodValue", "carValue", "cityValue", "statusValue"],
  };
  const [state, dispatch] = useReducer(ordersListReducer, initialState);
  const {
    orders,
    orderPages,
    currentPage,
    activeIndex,
    ordersUrlEnd,
    isFetchError,
    cities,
    statuses,
    cars,
    searchItems,
    selectNames,
  } = state;
  const ordersUrlStart = `/db/order?page=${currentPage}&limit=${ORDERS_NUMBER_TO_SHOW}&sort[createdAt]=-1`;
  const ordersUrl = ordersUrlStart + ordersUrlEnd;
  const allCities = CITIES.concat(cities);
  const allStatuses = STATUSES.concat(statuses);
  const allCars = CARS.concat(cars);
  const orderSelectFields = [PERIODS, allCars, allCities, allStatuses];
  const isOrdersList = true;

  useEffect(() => {
    getSelectOptions("/db/city")
      .then((resData) => {
        const cityArray = resData.data.map((item) => ({
          name: item.name,
          cityId: item.id,
        }));
        dispatch({ type: "city", value: cityArray });
      })
      .catch((err) => {
        console.log(err);
      });

    getSelectOptions("/db/orderStatus")
      .then((resData) => {
        const statusArray = resData.data.map((item) => ({
          name: item.name,
          statusId: item.id,
        }));
        dispatch({ type: "status", value: statusArray });
      })
      .catch((err) => {
        console.log(err);
      });

    getSelectOptions("/db/car")
      .then((resData) => {
        const carArray = resData.data.map((item) => ({
          name: item.name,
          carId: item.id,
        }));
        dispatch({ type: "car", value: carArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getData(ordersUrl)
      .then((resData) => {
        const ordersArray = resData.data.map(
          ({
            cityId,
            pointId,
            carId,
            dateFrom,
            dateTo,
            price,
            orderStatusId,
            color,
            isFullTank,
            isNeedChildChair,
            isRightWheel,
          }) => ({
            city: cityId ? cityId.name : "Неизвестный город",
            point:
              pointId && pointId.address
                ? pointId.address
                : "Неизвестный пункт",
            car: carId ? carId.name : "Неизвестная машина",
            dateFrom: dateFrom,
            dateTo: dateTo,
            price: price ? price : "",
            status: orderStatusId ? orderStatusId.name : "Неизвестный статус",
            image: carId && carId.thumbnail ? carId.thumbnail.path : "",
            color: color ? color : "Не выбран",
            isFullTank: isFullTank ? "Полный бак" : "",
            isNeedChildChair: isNeedChildChair ? "Детское кресло" : "",
            isRightWheel: isRightWheel ? "Правый руль" : "",
          })
        );
        const pageNum = Math.ceil(resData.count / ORDERS_NUMBER_TO_SHOW);
        dispatch({ type: "orders", value: ordersArray, count: pageNum });
      })
      .catch((err) => {
        dispatch({ type: "error" });
        console.log(err);
      });
  }, [ordersUrl]);

  function handleClick(page) {
    dispatch({ type: "page", value: page });
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
    dispatch({ type: "url", value: url });
  }

  function resetFilters() {
    dispatch({
      type: "reset",
      value: {
        periodValue: PERIODS[0].name,
        carValue: allCars[0].name,
        cityValue: allCities[0].name,
        statusValue: allStatuses[0].name,
      },
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
        setSearchItems={() => {
          dispatch({ type: "search" });
        }}
        resetFilters={resetFilters}
        activeIndex={activeIndex}
        isOrdersList={isOrdersList}
        selectNames={selectNames}
        goRight={() => dispatch({ type: "right" })}
        goLeft={() => dispatch({ type: "left" })}
        handleChange={(e) =>
          dispatch({
            type: "search",
            field: e.target.name,
            value: e.target.value,
          })
        }
      />
    </>
  );
}

export default OrdersList;
