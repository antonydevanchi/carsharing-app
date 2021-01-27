import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import List from "../List/List";
import AdminTitle from "../AdminTitle/AdminTitle";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  ENTITY_NUMBER_TO_SHOW,
  CAR_HEADERS,
  CATEGORIES,
  PRICE_TYPES,
} from "../../../../constants/constants";
import { makePriceWithGap } from "../../../../utils/priceWithGap";
import { getData } from "../../../../adminFetch";
import { carsListReducer } from "../../../../carsListReducer";

function CarsList() {
  const initialState = {
    cars: [],
    carPages: 0,
    currentPage: 0,
    activeIndex: 0,
    carsUrlEnd: "",
    isFetchError: false,
    carCategories: [],
    searchItems: {
      categoryValue: CATEGORIES[0].name,
      priceTypeValue: PRICE_TYPES[0].name,
    },
    selectNames: ["categoryValue", "priceTypeValue"],
  };
  const [state, dispatch] = useReducer(carsListReducer, initialState);
  const {
    cars,
    carPages,
    currentPage,
    activeIndex,
    carsUrlEnd,
    isFetchError,
    carCategories,
    searchItems,
    selectNames,
  } = state;
  const carsUrlStart = `/db/car?page=${currentPage}&limit=${ENTITY_NUMBER_TO_SHOW}`;
  const carsUrl = carsUrlStart + carsUrlEnd;
  const categories = CATEGORIES.concat(carCategories);
  const carSelectFields = [categories, PRICE_TYPES];
  const history = useHistory();

  useEffect(() => {
    getData("/db/category")
      .then((resData) => {
        const categoryArray = resData.data.map((item) => ({
          name: item.name,
          categoryId: item.id,
        }));
        dispatch({ type: "category", value: categoryArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getData(carsUrl)
      .then((resData) => {
        const carsArray = resData.data.map((item) => ({
          name: item.name,
          number: item.number,
          category: item.categoryId.name,
          priceMin: makePriceWithGap(item.priceMin),
          priceMax: makePriceWithGap(item.priceMax),
          id: item.id,
        }));
        const pageNum = Math.ceil(resData.count / ENTITY_NUMBER_TO_SHOW);
        dispatch({ type: "cars", value: carsArray, count: pageNum });
      })
      .catch((err) => {
        dispatch({ type: "error" });
        console.log(err);
      });
  }, [carsUrl]);

  function handleClick(pageNumber) {
    dispatch({ type: "page", value: pageNumber });
  }

  function findSearchWord(searchWord, keyArray) {
    const searchWordObject = keyArray.find((item) => {
      return item.name === searchWord;
    });
    return searchWordObject;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const category = findSearchWord(searchItems.categoryValue, categories);
    const priceType = findSearchWord(searchItems.priceTypeValue, PRICE_TYPES);
    let url = "";
    if (category.categoryId) {
      url = url + `&categoryId=${category.categoryId}`;
    }
    if (priceType.priceMin) {
      url = url + `&sort[priceMin]=${priceType.priceMin}`;
    }
    dispatch({ type: "url", value: url });
  }

  function resetFilters() {
    dispatch({
      type: "reset",
      value: {
        categoryValue: categories[0].name,
        priceTypeValue: PRICE_TYPES[0].name,
      },
    });
  }

  function goToCarCard(carId) {
    getData(`/db/car/${carId}`)
      .then((resData) => {
        sessionStorage.setItem("CarData", JSON.stringify(resData.data));
        history.push("/admin/content/car-card");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isFetchError) {
    return <ErrorPage />;
  }

  return (
    <>
      <AdminTitle text="Автомобили" />
      <List
        options={cars}
        selectFields={carSelectFields}
        headers={CAR_HEADERS}
        pages={carPages}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        searchItems={searchItems}
        setSearchItems={() => {
          dispatch({ type: "search" });
        }}
        resetFilters={resetFilters}
        activeIndex={activeIndex}
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
        goToEntityCard={goToCarCard}
      />
    </>
  );
}

export default CarsList;
