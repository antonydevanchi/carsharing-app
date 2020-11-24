import React, { useState } from "react";
import Card from "./components/Card/Card";
import "./CarModel.scss";

function CarModel() {
  const [value, setValue] = useState(false);

  function handleChange() {
    setValue(!value);
  }

  return (
    <div className="car-model">
      <form className="car-model__form">
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="allModels"
          value={value}
          onChange={handleChange}
          defaultChecked
        />
        <label className="car-model__item" htmlFor="allModels">
          Все модели
        </label>
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="economModels"
          value={value}
          onChange={handleChange}
        />
        <label className="car-model__item" htmlFor="economModels">
          Эконом
        </label>
        <input
          className="car-model__input"
          type="radio"
          name="modelType"
          id="premiumModels"
          value={value}
          onChange={handleChange}
        />
        <label className="car-model__item" htmlFor="premiumModels">
          Премиум
        </label>
      </form>
      <div className="car-model__card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default CarModel;
