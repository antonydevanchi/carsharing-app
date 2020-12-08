import React, { useState, useEffect } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import RadioGroup from "../RadioGroup/RadioGroup";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import { getDuration, estimatePrice } from "../../../../utils/calculations";
import { OTHERS } from "../../../../constants/constants";
import "./Additionally.scss";

function Additionally({
  handleSubmit,
  colors,
  getTotalPrice,
  setSearchFromDate,
  setSearchToDate,
  searchFromDate,
  searchToDate,
  tank,
  rates,
  orderOtherServices,
}) {
  const [rateValue, setRateValue] = useState();
  const [otherValues, setOtherValues] = useState([]);
  const isFullTank = tank === 100;
  const otherServices = OTHERS.map((item) => {
    if (item.type === "Полный бак" && !isFullTank) {
      return {
        ...item,
        disabled: true,
        message: "В данной модели услуга недоступна",
      };
    } else return { ...item, disabled: false };
  });

  const color = "Цвет";
  const rate = "Тариф";
  const carColors = colors.map((color, i) => {
    return {
      type: color.substr(0, 1).toUpperCase() + color.substr(1).toLowerCase(),
      id: `color${i}`,
    };
  });

  const anyColor = [{ type: "Любой", id: "any" }];
  const allColors = anyColor.concat(carColors);
  const [colorValue, setColorValue] = useState(allColors[0].type);

  function handleColorChange(event) {
    setColorValue(event.target.value);
    handleSubmit(color, event.target.value);
  }
  function handleRateChange(event) {
    setRateValue(event.target.value);
    handleSubmit(rate, event.target.value);
  }
  function handleOtherChoose(event) {
    const newList = otherValues.slice();
    const isChecked = newList.some((item) => {
      return item === event.target.value;
    });
    if (isChecked) {
      const currentList = newList.filter((elem) => {
        return elem !== event.target.value;
      });
      setOtherValues(currentList);
    } else setOtherValues([...otherValues, event.target.value]);
    let name;
    if (isChecked) {
      name = "";
    } else name = "Да";
    handleSubmit(event.target.value, name);
  }

  function handleClearFromDate() {
    setSearchFromDate("");
  }
  function handleClearToDate() {
    setSearchToDate("");
  }
  function setFromDate(event) {
    setSearchFromDate(event.target.value);
  }

  function setToDate(event) {
    setSearchToDate(event.target.value);
    const duration = getDuration(searchFromDate, event.target.value);
    handleSubmit("Длительность аренды", duration);
  }

  useEffect(() => {
    (function getAdditionallyFromOrder() {
      if (orderOtherServices) {
        const orderColor = orderOtherServices.find((item) => {
          return Object.values(item).includes(color);
        });
        const orderRate = orderOtherServices.find((item) => {
          return Object.values(item).includes(rate);
        });
        const others = [];
        for (let i = 0; i < OTHERS.length; i++) {
          let othersElem = orderOtherServices.find((item) => {
            return Object.values(item).includes(OTHERS[i].type);
          });
          if (othersElem && othersElem.name) {
            others.push(othersElem.title);
          } else others.push("");
        }
        if (orderColor) {
          setColorValue(orderColor.name);
        }
        if (orderRate) {
          setRateValue(orderRate.name);
        } else {
          setRateValue(rates[0].type);
        }
        if (others) {
          setOtherValues(others);
        }
      }
      if (searchFromDate && searchToDate) {
        setSearchFromDate(searchFromDate);
        setSearchToDate(searchToDate);
      }
    })();
  }, [
    orderOtherServices,
    rates,
    searchFromDate,
    searchToDate,
    setSearchFromDate,
    setSearchToDate,
  ]);

  function getActualPrice(
    searchFromDate,
    searchToDate,
    rateValue,
    otherValues,
    rates
  ) {
    const estimatedPrice = estimatePrice(
      searchFromDate,
      searchToDate,
      rateValue,
      otherValues,
      rates
    );
    if (estimatedPrice > 0 && !isNaN(estimatedPrice)) {
      getTotalPrice(estimatedPrice);
    }
  }

  useEffect(() => {
    getActualPrice(searchFromDate, searchToDate, rateValue, otherValues, rates);
  });

  return (
    <form className="additionally">
      <h4 className="additionally__title">{color}</h4>
      <RadioGroup
        value={colorValue}
        name="color"
        values={allColors}
        onChange={handleColorChange}
        modifier="wrap"
      />
      <h4 className="additionally__title">Дата аренды</h4>
      <div className="additionally__date-container">
        <Autocomplete
          type="text"
          id="fromDate"
          name="fromDate"
          value={searchFromDate}
          placeholder="Введите дату и время"
          content="С"
          onChange={setFromDate}
          handleClear={handleClearFromDate}
        />
        <Autocomplete
          type="text"
          id="toDate"
          name="toDate"
          value={searchToDate}
          placeholder="Введите дату и время"
          content="По"
          onChange={setToDate}
          handleClear={handleClearToDate}
          required="required"
        />
      </div>
      <h4 className="additionally__title">{rate}</h4>
      <RadioGroup
        value={rateValue}
        name="rate"
        values={rates}
        onChange={handleRateChange}
        modifier="column"
      />
      <h4 className="additionally__title">Доп услуги</h4>
      <CheckboxGroup
        values={otherServices}
        onChange={handleOtherChoose}
        checkedValues={otherValues}
      />
    </form>
  );
}

export default Additionally;
