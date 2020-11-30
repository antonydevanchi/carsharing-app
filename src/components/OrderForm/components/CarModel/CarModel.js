import React, { useState } from "react";
import Card from "./components/Card/Card";
import RadioGroup from "../RadioGroup/RadioGroup";
import { MODEL_TYPES } from "../../../../constants/constants";
import "./CarModel.scss";

function CarModel(props) {
  const [value, setValue] = useState(MODEL_TYPES[0].type);

  function handleFilter(event) {
    setValue(event.target.value);
    props.setSearch(event.target.value);
  }

  return (
    <div className="car-model">
      <form className="car-model__form">
        <RadioGroup
          value={value}
          name="modelType"
          values={MODEL_TYPES}
          onChange={handleFilter}
        />
      </form>
      <div className="car-model__card-container">
        {props.isLoading && (
          <p className="car-model__loading">Загружаем машины...</p>
        )}
        {value === "Все модели" &&
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
              />
            );
          })}
      </div>
    </div>
  );
}

export default CarModel;
