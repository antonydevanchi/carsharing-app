import React, { useEffect, useState } from "react";
import List from "../List/List";
import AdminTitle from "../AdminTitle/AdminTitle";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  ENTITY_NUMBER_TO_SHOW,
  POINT_HEADERS,
  CITIES,
} from "../../../../constants/constants";
import { getData, getSelectOptions } from "../../../../adminFetch";

function CitiesList() {
  const [points, setPoints] = useState([]);
  const [pointPages, setPointPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const pointsUrlStart = `/db/point?page=${currentPage}&limit=${ENTITY_NUMBER_TO_SHOW}`;
  const [pointsUrlEnd, setPointsUrlEnd] = useState("");
  const pointsUrl = pointsUrlStart + pointsUrlEnd;
  const [isFetchError, setIsFetchError] = useState(false);
  const [cities, setCities] = useState([]);
  const allCities = CITIES.concat(cities);
  const pointSelectFields = [allCities];
  const [searchItems, setSearchItems] = useState({
    cityValue: allCities[0].name,
  });
  const selectNames = ["cityValue"];

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
    getData(pointsUrl)
      .then((resData) => {
        setPoints(
          resData.data.map((item) => ({
            pointAddress: item.address,
            city: item.cityId.name,
            name: item.name,
            id: item.id,
          }))
        );
        setPointPages(Math.ceil(resData.count / ENTITY_NUMBER_TO_SHOW));
        setIsFetchError(false);
      })
      .catch((err) => {
        setIsFetchError(true);
        console.log(err);
      });
  }, [pointsUrl]);

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
    const city = findSearchWord(searchItems.cityValue, allCities);
    setCurrentPage(0);
    setActiveIndex(0);
    let url = "";
    if (city.cityId) {
      url = url + `&cityId=${city.cityId}`;
    }
    setPointsUrlEnd(url);
  }

  function resetFilters() {
    setCurrentPage(0);
    setActiveIndex(0);
    setPointsUrlEnd("");
    setSearchItems({
      cityValue: allCities[0].name,
    });
  }

  if (isFetchError) {
    return <ErrorPage />;
  }

  return (
    <>
      <AdminTitle text="Пункты" />
      <List
        options={points}
        selectFields={pointSelectFields}
        headers={POINT_HEADERS}
        pages={pointPages}
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

export default CitiesList;
