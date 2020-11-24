import React, { useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./Additionally.scss";

function Additionally() {
  const [value, setValue] = useState(false);
  const date = new Date();
  const displayDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} ${parseInt(date.getHours() + 1)}:00`;
  const [searchFromDate, setSearchFromDate] = useState(displayDate);
  const [searchToDate, setSearchToDate] = useState("");

  function handleChange() {
    setValue(!value);
  }

  function handleClearFromDate() {
    setSearchFromDate("");
  }
  function handleClearToDate() {
    setSearchToDate("");
  }

  return (
    <form className="additionally">
      <h4 className="additionally__title">Цвет</h4>
      <div className="additionally__container">
        <input
          className="additionally__radio"
          type="radio"
          name="color"
          id="any"
          value={value}
          onChange={handleChange}
          defaultChecked
        />
        <label className="additionally__item" htmlFor="any">
          Любой
        </label>
        <input
          className="additionally__radio"
          type="radio"
          name="color"
          id="red"
          value={value}
          onChange={handleChange}
        />
        <label className="additionally__item" htmlFor="red">
          Красный
        </label>
        <input
          className="additionally__radio"
          type="radio"
          name="color"
          id="blue"
          value={value}
          onChange={handleChange}
        />
        <label className="additionally__item" htmlFor="blue">
          Голубой
        </label>
      </div>
      <h4 className="additionally__title">Дата аренды</h4>
      <div className="additionally__date-container">
        <Autocomplete
          type="text"
          id="fromDate"
          name="fromDate"
          value={searchFromDate}
          placeholder="Введите дату и время"
          content="С"
          onChange={(event) => setSearchFromDate(event.target.value)}
          handleClear={handleClearFromDate}
        />
        <Autocomplete
          type="text"
          id="toDate"
          name="toDate"
          value={searchToDate}
          placeholder="Введите дату и время"
          content="По"
          onChange={(event) => setSearchToDate(event.target.value)}
          handleClear={handleClearToDate}
        />
      </div>
      <h4 className="additionally__title">Тариф</h4>
      <div className="additionally__container additionally__container_column">
        <p className="additionally__text">
          <input
            className="additionally__radio"
            type="radio"
            name="rate"
            id="forMinutes"
            value="minutes"
            defaultChecked
          />
          <label className="additionally__item" htmlFor="forMinutes">
            Поминутно, 7₽/мин
          </label>
        </p>
        <p className="additionally__text">
          <input
            className="additionally__radio"
            type="radio"
            name="rate"
            id="forDay"
            value="day"
          />
          <label className="additionally__item" htmlFor="forDay">
            На сутки, 1999 ₽/сутки
          </label>
        </p>
      </div>
      <h4 className="additionally__title">Доп услуги</h4>
      <div className="additionally__container additionally__container_column">
        <p className="additionally__text">
          <input
            className="additionally__checkbox"
            type="checkbox"
            name="additionally"
            id="fullTank"
            value="fullTank"
            defaultChecked
          />
          <label className="additionally__item" htmlFor="fullTank">
            Полный бак, 500р
          </label>
        </p>
        <p className="additionally__text">
          <input
            className="additionally__checkbox"
            type="checkbox"
            name="additionally"
            id="babyChair"
            value="babyChair"
          />
          <label className="additionally__item" htmlFor="babyChair">
            Детское кресло, 200р
          </label>
        </p>
        <p className="additionally__text">
          <input
            className="additionally__checkbox"
            type="checkbox"
            name="additionally"
            id="rightHandDrive"
            value="rightHandDrive"
          />
          <label className="additionally__item" htmlFor="rightHandDrive">
            Правый руль, 1600р
          </label>
        </p>
      </div>
    </form>
  );
}

export default Additionally;
