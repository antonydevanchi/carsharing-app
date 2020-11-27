import React, { useState, useEffect } from "react";
import { API_URL, HEADERS } from "../../../../constants/constats";
import "./Autocomplete.scss";

function Autocomplete(props) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const places = [];
    if (props.id === "city" || props.id === "point") {
      fetch(`${API_URL}${props.urlEnd}`, {
        method: "GET",
        headers: HEADERS,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          res.data.forEach((item) => {
            if (props.id === "city") {
              places.push({ name: item.name, id: item.id });
              sessionStorage.setItem(item.name, item.id);
            } else {
              places.push({ city: item.cityId.name, address: item.address });
            }
          });
        })
        .catch((err) => {
          console.log("Ошибка. запрос не выполнен");
        });
      props.setOptions(places);
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
      {props.value !== "" && (
        <button
          type="button"
          className="autocomplete__btn-reset"
          onClick={props.handleClear}
        />
      )}

      {display && props.id === "city" && (
        <ul className="autocomplete__list">
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