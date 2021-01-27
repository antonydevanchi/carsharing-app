import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import List from "../List/List";
import AdminTitle from "../AdminTitle/AdminTitle";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  ENTITY_NUMBER_TO_SHOW,
  POINT_HEADERS,
  CITIES,
} from "../../../../constants/constants";
import { getData } from "../../../../adminFetch";
import { pointsListReducer } from "../../../../pointsListReducer";

function PointsList() {
  const initialState = {
    points: [],
    pointPages: 0,
    currentPage: 0,
    activeIndex: 0,
    pointsUrlEnd: "",
    isFetchError: false,
    cities: [],
    searchItems: { cityValue: CITIES[0].name },
    selectNames: ["cityValue"],
  };
  const [state, dispatch] = useReducer(pointsListReducer, initialState);
  const {
    points,
    pointPages,
    currentPage,
    activeIndex,
    pointsUrlEnd,
    isFetchError,
    cities,
    searchItems,
    selectNames,
  } = state;
  const pointsUrlStart = `/db/point?page=${currentPage}&limit=${ENTITY_NUMBER_TO_SHOW}`;
  const pointsUrl = pointsUrlStart + pointsUrlEnd;
  const allCities = CITIES.concat(cities);
  const pointSelectFields = [allCities];
  const history = useHistory();

  useEffect(() => {
    getData("/db/city")
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
  }, []);

  useEffect(() => {
    getData(pointsUrl)
      .then((resData) => {
        const pointsArray = resData.data.map((item) => ({
          pointAddress: item.address,
          city: item.cityId.name,
          name: item.name,
          id: item.id,
        }));
        const pageNum = Math.ceil(resData.count / ENTITY_NUMBER_TO_SHOW);
        dispatch({ type: "points", value: pointsArray, count: pageNum });
      })
      .catch((err) => {
        dispatch({ type: "error" });
        console.log(err);
      });
  }, [pointsUrl]);

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
    const city = findSearchWord(searchItems.cityValue, allCities);
    let url = "";
    if (city.cityId) {
      url = url + `&cityId=${city.cityId}`;
    }
    dispatch({ type: "url", value: url });
  }

  function resetFilters() {
    dispatch({
      type: "reset",
      value: {
        cityValue: allCities[0].name,
      },
    });
  }

  function goToPointCard(pointId) {
    getData(`/db/point/${pointId}`)
      .then((resData) => {
        sessionStorage.setItem("PointData", JSON.stringify(resData.data));
        history.push("/admin/content/point-card");
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
      <AdminTitle text="Пункты" />
      <List
        options={points}
        selectFields={pointSelectFields}
        headers={POINT_HEADERS}
        pages={pointPages}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        searchItems={searchItems}
        setSearchItems={() => {
          dispatch({ type: "search" });
        }}
        resetFilters={resetFilters}
        activeIndex={activeIndex}
        goRight={() => dispatch({ type: "right" })}
        goLeft={() => dispatch({ type: "left" })}
        selectNames={selectNames}
        handleChange={(e) =>
          dispatch({
            type: "search",
            field: e.target.name,
            value: e.target.value,
          })
        }
        goToEntityCard={goToPointCard}
      />
    </>
  );
}

export default PointsList;
