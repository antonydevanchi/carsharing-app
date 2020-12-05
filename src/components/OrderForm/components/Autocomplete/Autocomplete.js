import React, { useState, useEffect } from "react";
import { API_URL, HEADERS } from "../../../../constants/constants";
import MaskedInput from "react-text-mask";
import "./Autocomplete.scss";

function Autocomplete(props) {
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const places = [];
    if (props.id === "city" || props.id === "point") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await fetch(`${API_URL}${props.urlEnd}`, {
            method: "GET",
            headers: HEADERS,
          });
          const resData = await response.json();
          resData.data.map((item) => {
            if (props.id === "city") {
              places.push({ name: item.name, id: item.id });
              sessionStorage.setItem(item.name, item.id);
            } else {
              places.push({ city: item.cityId.name, address: item.address });
            }
            return places;
          });
          setIsLoading(false);
        } catch (error) {
          console.log("Ошибка. запрос не выполнен");
        }
        props.setOptions(places);
      })();
    }
  }, [props.urlEnd, props.id]);

  const setPlaceCity = (place) => {
    props.setSearch(place);
    setDisplay(false);
  };

  const setPlacePoint = (place, city) => {
    props.setSearch(place);
    props.handleSubmit(`${city}, ${place}`);
    setDisplay(false);
  };

  return (
    <div className="autocomplete">
      <label className="autocomplete__name" htmlFor={props.id}>
        {props.content}
      </label>
      {props.id === "city" || props.id === "point" ? (
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          onClick={() => setDisplay(!display)}
          placeholder={props.placeholder}
          className="autocomplete__input"
          value={props.value}
          onChange={props.onChange}
          autoComplete="off"
          required={props.required}
        />
      ) : (
        <MaskedInput
          mask={[
            /[0-3]/,
            /\d/,
            ".",
            /[0-1]/,
            /\d/,
            ".",
            "2",
            "0",
            "2",
            /\d/,
            " ",
            /[0-2]/,
            /\d/,
            ":",
            /[0-5]/,
            /\d/,
          ]}
          type={props.type}
          id={props.id}
          name={props.name}
          className="autocomplete__input"
          value={props.value}
          onChange={props.onChange}
          autoComplete="off"
          placeholder={props.placeholder}
          required={props.required}
        />
      )}
      {props.value !== "" && (
        <button
          type="button"
          className="autocomplete__btn-reset"
          onClick={props.handleClear}
        />
      )}
      {display && props.id === "city" && (
        <ul className="autocomplete__list">
          {isLoading && (
            <li className="autocomplete__item">Загружаем города...</li>
          )}
          {props.options
            .filter((item) =>
              item.name.toLowerCase().startsWith(`${props.value}`.toLowerCase())
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
      {display && props.id === "point" && (
        <ul className="autocomplete__list">
          {isLoading && (
            <li className="autocomplete__item">Загружаем пункты...</li>
          )}
          {props.options
            .filter((item) =>
              item.address
                .toLowerCase()
                .startsWith(`${props.value}`.toLowerCase())
            )
            .map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setPlacePoint(item.address, item.city)}
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
