import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import RadioGroup from "../RadioGroup/RadioGroup";
import { MODEL_TYPES } from "../../../../constants/constants";
import "./CarModel.scss";

function CarModel(props) {
  const [value, setValue] = useState(MODEL_TYPES[0].type);
  const [isActive, setIsActive] = useState("");

  function handleFilter(event) {
    setValue(event.target.value);
    props.setSearch(event.target.value);
  }

  useEffect(() => {
    (function getModelFromOrder() {
      if (props.search) {
        setValue(props.search);
      }
      if (props.modelName) {
        setIsActive(props.modelName);
      }
    })();
  }, [props.search, props.modelName]);

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
                carObject={item}
                handleSubmit={props.handleSubmit}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            );
          })}
        {(value === "Эконом" || value === "Премиум") &&
          props.filteredCards.map((item, i) => {
            return (
              <Card
                key={i}
                carObject={item}
                handleSubmit={props.handleSubmit}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CarModel;
