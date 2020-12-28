import React, { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import { API_URL, HEADERS, dateMask } from "../../../../constants/constants";
import "./Autocomplete.scss";

function Autocomplete({
  type,
  id,
  name,
  value,
  placeholder,
  urlEnd,
  content,
  options,
  setOptions,
  onChange,
  setSearch,
  handleClear,
  handleSubmit,
  required,
}) {
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const places = [];
    if (id === "city" || id === "point") {
      setIsLoading(true);
      const abortController = new AbortController();
      const signal = abortController.signal;
      (async () => {
        try {
          const response = await fetch(`${API_URL}${urlEnd}`, {
            method: "GET",
            headers: HEADERS,
            signal: signal,
          });
          const resData = await response.json();
          resData.data.map((item) => {
            if (id === "city") {
              places.push({ name: item.name, id: item.id });
              sessionStorage.setItem(item.name, item.id);
            } else {
              places.push({
                city: item.cityId.name,
                address: item.address,
                cityId: item.cityId.id,
                pointId: item.id,
              });
            }
            return places;
          });
          setIsLoading(false);
        } catch (error) {
          console.log("Ошибка. запрос не выполнен");
        }
        setOptions(places);
        return function cleanup() {
          abortController.abort();
        };
      })();
    }
  }, [urlEnd, id]); // eslint-disable-line

  const setPlaceCity = (place) => {
    setSearch(place);
    setDisplay(false);
  };

  const setPlacePoint = (place) => {
    setSearch(place.address);
    handleSubmit(place);
    setDisplay(false);
  };

  return (
    <div className="autocomplete">
      <label className="autocomplete__name" htmlFor={id}>
        {content}
      </label>
      {id === "city" || id === "point" ? (
        <input
          type={type}
          id={id}
          name={name}
          onClick={() => setDisplay(!display)}
          placeholder={placeholder}
          className="autocomplete__input"
          value={value}
          onChange={onChange}
          autoComplete="off"
          required={required}
        />
      ) : (
        <MaskedInput
          mask={dateMask}
          type={type}
          id={id}
          name={name}
          className="autocomplete__input"
          value={value}
          onChange={onChange}
          autoComplete="off"
          placeholder={placeholder}
          required={required}
        />
      )}
      {value !== "" && (
        <button
          type="button"
          className="autocomplete__btn-reset"
          onClick={handleClear}
        />
      )}
      {display && id === "city" && (
        <ul className="autocomplete__list">
          {isLoading && (
            <li className="autocomplete__item">Загружаем города...</li>
          )}
          {options
            .filter((item) =>
              item.name.toLowerCase().startsWith(`${value}`.toLowerCase())
            )
            .map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setPlaceCity(item.name)}
                  className="autocomplete__item"
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      )}
      {display && id === "point" && (
        <ul className="autocomplete__list">
          {isLoading && (
            <li className="autocomplete__item">Загружаем пункты...</li>
          )}
          {options
            .filter((item) =>
              item.address.toLowerCase().startsWith(`${value}`.toLowerCase())
            )
            .map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setPlacePoint(item)}
                  className="autocomplete__item"
                >
                  {item.address}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
