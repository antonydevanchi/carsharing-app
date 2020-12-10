import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Autocomplete from "../Autocomplete/Autocomplete";
import {
  API_KEY_YANDEX_MAP,
  API_URL_YANDEX_MAP,
} from "../../../../constants/constants";
import "./Location.scss";
import placemark from "../../../../images/placemark.svg";

function Location({ handleSubmit, orderPoint }) {
  const [searchCity, setSearchCity] = useState("");
  const [searchPoint, setSearchPoint] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsPoint, setOptionsPoint] = useState([]);
  // При первоначальной загрузке страницы для отрисовки карты используются координаты Ульяновска.
  const [coords, setCoords] = useState([54.321251, 48.3809734]);
  const [coordsPoint, setCoordsPoint] = useState([54.321251, 48.3809734]);
  const [coordsCityPoints, setCoordsCityPoints] = useState([]);

  let urlCityId;
  if (searchCity !== "") {
    urlCityId = `/db/point?cityId=${sessionStorage.getItem(searchCity)}`;
  } else {
    urlCityId = "/db/point";
  }
  // Объявление переменной mapZoom для различного отображения карты.
  let mapZoom;
  if (searchCity && !searchPoint) {
    mapZoom = 12;
  } else if (searchPoint) {
    mapZoom = 14;
  } else {
    mapZoom = 6;
  }

  let mapCenter;
  if (searchPoint !== "") {
    mapCenter = coordsPoint;
  } else {
    mapCenter = coords;
  }

  useEffect(() => {
    (function getLocationFromOrder() {
      if (orderPoint) {
        const places = orderPoint.split(",");
        setSearchCity(places[0]);
        setSearchPoint(orderPoint.substr(places[0].length + 2));
      }
    })();
  }, [orderPoint]);

  function handleClearCity() {
    setSearchCity("");
  }
  function handleClearPoint() {
    setSearchPoint("");
  }

  // Обращение к API Яндекс.карт для получения координат выбранного города и использования их для перерисовки карты.
  useEffect(() => {
    if (searchCity !== "") {
      (async () => {
        try {
          const response = await fetch(
            `${API_URL_YANDEX_MAP}&geocode=${searchCity}&apikey=${API_KEY_YANDEX_MAP}`
          );
          const resData = await response.json();
          setCoords(
            resData.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
          );
        } catch (error) {
          console.log("Ошибка. запрос не выполнен");
        }
      })();
    }
  }, [searchCity]);

  // Обращение к API Яндекс.карт для получения координат пунктов выбранного города для отрисовки меток на карте.
  useEffect(() => {
    const geoData = [];
    if (searchCity !== "" && optionsPoint.join() !== "") {
      optionsPoint.forEach((point) => {
        (async () => {
          try {
            const response = await fetch(
              `${API_URL_YANDEX_MAP}&geocode=${point.city},+${point.address}&apikey=${API_KEY_YANDEX_MAP}`
            );
            const resData = await response.json();
            geoData.push(
              resData.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(" ")
                .reverse()
            );
          } catch (error) {
            console.log("Ошибка. запрос не выполнен");
          }
        })();
      });
      setCoordsCityPoints(geoData);
    }
  }, [optionsPoint, searchCity]);

  // Обращение к API Яндекс.карт для получения координат выбранного пункта для отрисовки его метки на карте
  // (если город не был выбран) и центрирования карты.
  useEffect(() => {
    if (searchPoint !== "" && optionsPoint.join() !== "") {
      const currentCity = optionsPoint.reduce((prevVal, item) => {
        if (item.address === searchPoint) {
          prevVal = item.city;
        }
        return prevVal;
      }, "");
      (async () => {
        try {
          const response = await fetch(
            `${API_URL_YANDEX_MAP}&geocode=${currentCity},+${searchPoint}&apikey=${API_KEY_YANDEX_MAP}`
          );
          const resData = await response.json();
          setCoordsPoint(
            resData.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
          );
        } catch (error) {
          console.log("Ошибка. запрос не выполнен");
        }
      })();
    }
  }, [searchPoint, optionsPoint]);

  return (
    <form className="location">
      <div className="location__container">
        <Autocomplete
          type="text"
          id="city"
          name="city"
          value={searchCity}
          placeholder="Начните вводить город ..."
          urlEnd="/db/city"
          content="Город"
          options={optionsCity}
          setOptions={(item) => setOptionsCity(item)}
          onChange={(event) => setSearchCity(event.target.value)}
          setSearch={(item) => setSearchCity(item)}
          handleClear={handleClearCity}
        />
        <Autocomplete
          type="text"
          id="point"
          name="point"
          value={searchPoint}
          placeholder="Начните вводить пункт ..."
          urlEnd={urlCityId}
          content="Пункт выдачи"
          options={optionsPoint}
          setOptions={(item) => setOptionsPoint(item)}
          onChange={(event) => setSearchPoint(event.target.value)}
          setSearch={(item) => setSearchPoint(item)}
          handleClear={handleClearPoint}
          handleSubmit={handleSubmit}
          required="required"
        />
      </div>
      <p className="location__item">Выбрать на карте:</p>
      <YMaps>
        <Map
          className="location__map"
          state={{ center: mapCenter, zoom: mapZoom }}
        >
          {searchPoint && (
            <Placemark
              geometry={coordsPoint}
              options={{
                iconLayout: "default#image",
                iconImageHref: placemark,
                iconImageSize: [18, 18],
                iconImageOffset: [0, 0],
              }}
            />
          )}
          {searchCity &&
            coordsCityPoints.map((item, i) => (
              <Placemark
                key={i}
                geometry={item}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: placemark,
                  iconImageSize: [18, 18],
                  iconImageOffset: [0, 0],
                }}
              />
            ))}
        </Map>
      </YMaps>
    </form>
  );
}

export default Location;
