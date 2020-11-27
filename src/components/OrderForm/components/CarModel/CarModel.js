import React, { useState } from "react";
import Card from "./components/Card/Card";
import "./CarModel.scss";

function CarModel(props) {
  const [value, setValue] = useState("allModels");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleFilter(event) {
    setValue(event.target.value);
    props.setSearch(event.target.value);
  }

  return (
    <div className="car-model">
      <form className="car-model__form">
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="allModels"
          value="allModels"
          checked={value === "allModels"}
          onChange={handleChange}
        />
        <label className="car-model__item" htmlFor="allModels">
          Все модели
        </label>
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="economModels"
          value="Эконом"
          checked={value === "Эконом"}
          onChange={handleFilter}
        />
        <label className="car-model__item" htmlFor="economModels">
          Эконом
        </label>
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="premiumModels"
          value="Премиум"
          checked={value === "Премиум"}
          onChange={handleFilter}
        />
        <label className="car-model__item" htmlFor="premiumModels">
          Премиум
        </label>
      </form>
      <div className="car-model__card-container">
        {props.isLoading && (
          <p className="car-model__loading">Загружаем машины...</p>
        )}
        {value === "allModels" &&
          props.cards.map((item) => {
            return (
              <Card
                key={item.id}
                name={item.name}
                priceMin={item.priceMin}
                priceMax={item.priceMax}
                image={item.thumbnail.path}
                handleSubmit={props.handleSubmit}
                displayPrice={props.displayPrice}
                makePriceWithGap={props.makePriceWithGap}
              />
            );
          })}
        {(value === "Эконом" || value === "Премиум") &&
          props.filteredCards.map((item, i) => {
            return (
              <Card
                key={i}
                name={item.name}
                priceMin={item.priceMin}
                priceMax={item.priceMax}
                image={item.thumbnail.path}
                handleSubmit={props.handleSubmit}
                displayPrice={props.displayPrice}
                makePriceWithGap={props.makePriceWithGap}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CarModel;
