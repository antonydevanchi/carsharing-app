import React, { useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import RadioGroup from "../RadioGroup/RadioGroup";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import { displayDate } from "../../../../utils/date";
import { COLORS, RATES, OTHERS } from "../../../../constants/constants";
import "./Additionally.scss";

function Additionally() {
  const [colorValue, setColorValue] = useState(COLORS[0].type);
  const [rateValue, setRateValue] = useState(RATES[0].type);
  const [otherValue, setOtherValue] = useState([]);
  const [searchFromDate, setSearchFromDate] = useState(displayDate);
  const [searchToDate, setSearchToDate] = useState("");

  function handleColorChange(event) {
    setColorValue(event.target.value);
  }
  function handleRateChange(event) {
    setRateValue(event.target.value);
  }
  function handleOtherChoose(event) {
    setOtherValue(event.target.value);
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
  }

  return (
    <form className="additionally">
      <h4 className="additionally__title">Цвет</h4>
      <RadioGroup
        value={colorValue}
        name="color"
        values={COLORS}
        onChange={handleColorChange}
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
        />
      </div>
      <h4 className="additionally__title">Тариф</h4>
      <RadioGroup
        value={rateValue}
        name="rate"
        values={RATES}
        onChange={handleRateChange}
        modifier="column"
      />
      <h4 className="additionally__title">Доп услуги</h4>
      <CheckboxGroup
        value={otherValue}
        values={OTHERS}
        onChange={handleOtherChoose}
      />
    </form>
  );
}

export default Additionally;
