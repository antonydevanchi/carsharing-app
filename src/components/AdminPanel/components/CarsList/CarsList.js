import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
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
  const [searchItems, setSearchItems] = useState([]);
  const carsUrlStart = `/db/car?page=${currentPage}&limit=${ENTITY_NUMBER_TO_SHOW}`;
  const [carsUrlEnd, setCarsUrlEnd] = useState("");
  const carsUrl = carsUrlStart + carsUrlEnd;
  const [isFetchError, setIsFetchError] = useState(false);
  const [carCategories, setCarCategories] = useState([]);
  const categories = CATEGORIES.concat(carCategories);
  const carSelectFields = [categories, PRICE_TYPES];

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

  function findSearchWord(array, keyArray) {
    const searchWordObject = array.reduce((prevVal, item) => {
      const keyWord = keyArray.find((elem) => {
        return elem.name === item;
      });
      if (keyWord) {
        prevVal = keyWord;
      }
      return prevVal;
    }, {});
    return searchWordObject;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchItems.join()) {
      const category = findSearchWord(searchItems, categories);
      const priceType = findSearchWord(searchItems, PRICE_TYPES);
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
  }

  function resetFilters() {
    setCurrentPage(0);
    setActiveIndex(0);
    setCarsUrlEnd("");
  }

  if (isFetchError) {
    return <ErrorPage />;
  }

  return (
    <>
      <AdminTitle text="Автомобили" />
      <Table
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
      />
    </>
  );
}

export default CarsList;
