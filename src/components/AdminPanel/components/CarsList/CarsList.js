import React, { useEffect, useState } from "react";
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
import { getData, getSelectOptions } from "../../../../adminFetch";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [carPages, setCarPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carsUrlStart = `/db/car?page=${currentPage}&limit=${ENTITY_NUMBER_TO_SHOW}`;
  const [carsUrlEnd, setCarsUrlEnd] = useState("");
  const carsUrl = carsUrlStart + carsUrlEnd;
  const [isFetchError, setIsFetchError] = useState(false);
  const [carCategories, setCarCategories] = useState([]);
  const categories = CATEGORIES.concat(carCategories);
  const carSelectFields = [categories, PRICE_TYPES];
  const [searchItems, setSearchItems] = useState({
    categoryValue: categories[0].name,
    priceTypeValue: PRICE_TYPES[0].name,
  });
  const selectNames = ["categoryValue", "priceTypeValue"];

  useEffect(() => {
    getSelectOptions("/db/category")
      .then((resData) => {
        setCarCategories(
          resData.data.map((item) => ({
            name: item.name,
            categoryId: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getData(carsUrl)
      .then((resData) => {
        setCars(
          resData.data.map((item) => ({
            name: item.name,
            number: item.number,
            category: item.categoryId.name,
            priceMin: makePriceWithGap(item.priceMin),
            priceMax: makePriceWithGap(item.priceMax),
            id: item.id,
          }))
        );
        setCarPages(Math.ceil(resData.count / ENTITY_NUMBER_TO_SHOW));
        setIsFetchError(false);
      })
      .catch((err) => {
        setIsFetchError(true);
        console.log(err);
      });
  }, [carsUrl]);

  function handleClick(pageNumber) {
    setCurrentPage(pageNumber);
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
    setCurrentPage(0);
    setActiveIndex(0);
    let url = "";
    if (category.categoryId) {
      url = url + `&categoryId=${category.categoryId}`;
    }
    if (priceType.priceMin) {
      url = url + `&sort[priceMin]=${priceType.priceMin}`;
    }
    setCarsUrlEnd(url);
  }

  function resetFilters() {
    setCurrentPage(0);
    setActiveIndex(0);
    setCarsUrlEnd("");
    setSearchItems({
      categoryValue: categories[0].name,
      priceTypeValue: PRICE_TYPES[0].name,
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
        setSearchItems={setSearchItems}
        resetFilters={resetFilters}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        selectNames={selectNames}
      />
    </>
  );
}

export default CarsList;
