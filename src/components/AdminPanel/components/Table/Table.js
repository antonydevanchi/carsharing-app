import React from "react";
import { withNaming } from "@bem-react/classname";
import AdminSelect from "../AdminSelect/AdminSelect";
import AdminButton from "../AdminButton/AdminButton";
import Pagination from "../Pagination/Pagination";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import { makeCapitalizedWord } from "../../../../utils/capitalizedWord";
import "./Table.scss";

function Table({
  options,
  selectFields,
  headers,
  pages,
  handleClick,
  handleSubmit,
  searchItems,
  setSearchItems,
  resetFilters,
  activeIndex,
  setActiveIndex,
  isOrdersList,
}) {
  const cn = withNaming({ n: "", e: "__", m: "_" });

  function addSearchItem(value) {
    if (searchItems.length > 1) {
      const checkedArray = selectFields.find((elem) => {
        return elem.some((item) => Object.values(item).includes(value));
      });
      const valuesArray = checkedArray.map((elem) => {
        return elem.name;
      });
      const repeatedWord = searchItems.find((word) => {
        if (valuesArray.includes(word)) {
          return word;
        } else return undefined;
      });
      if (repeatedWord) {
        const newSearchItems = searchItems.filter((elem) => {
          return elem !== repeatedWord;
        });
        setSearchItems([...newSearchItems, value]);
      } else setSearchItems([...searchItems, value]);
    } else setSearchItems([...searchItems, value]);
  }

  function handleChange(e) {
    addSearchItem(e.target.value);
  }

  function handleReset() {
    setSearchItems([]);
    resetFilters();
  }

  return (
    <div className="table">
      <form className="table__container" onSubmit={handleSubmit}>
        <div className="table__select-container">
          {selectFields &&
            selectFields.map((item, i) => (
              <AdminSelect
                key={i}
                id={`id${i}`}
                options={item.map((elem) => elem)}
                handleChange={handleChange}
              />
            ))}
        </div>
        <div className="table__button-container">
          <AdminButton
            text="Сбросить"
            type="reset"
            color="red"
            size="mini"
            position="left"
            onClick={handleReset}
          />
          <AdminButton text="Применить" type="submit" size="mini" />
        </div>
      </form>
      {isOrdersList ? (
        <div className={cn("table", "container")({ type: "digits" })}>
          {options &&
            options.map((option, i) => (
              <div key={i} className={cn("table", "list")({ type: "order" })}>
                <img
                  className="table__image"
                  src={
                    option.image.startsWith("data")
                      ? `${option.image}`
                      : `${URL_SIMBIRSOFT}${option.image}`
                  }
                  alt="Фото машины"
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                />
                <div className="table__content">
                  <div className="table__info">
                    <p className="table__text">
                      {option.car}{" "}
                      <span className={cn("table", "text")({ type: "thin" })}>
                        в
                      </span>{" "}
                      {option.city},{" "}
                      <span className={cn("table", "text")({ type: "thin" })}>
                        {option.point}
                      </span>
                    </p>
                    <p className={cn("table", "text")({ type: "thin" })}>
                      {option.dateFrom} - {option.dateTo}
                    </p>
                    <p className="table__text">
                      <span className={cn("table", "text")({ type: "thin" })}>
                        Цвет:{" "}
                      </span>
                      {makeCapitalizedWord(option.color)}
                    </p>
                  </div>
                  <div className="table__info">
                    <AdminCheckbox
                      values={["Полный бак", "Детское кресло", "Правый руль"]}
                      checkedValues={[
                        option.isFullTank,
                        option.isNeedChildChair,
                        option.isRightWheel,
                      ]}
                    />
                  </div>
                  <div className="table__price">{option.price} ₽</div>
                  <ButtonGroup />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={cn("table", "container")({ type: "digits" })}>
          <ul className="table__list">
            {headers &&
              headers.map((item, i) => (
                <li
                  key={item + i}
                  className={cn("table", "item")({ type: "title" })}
                >
                  {item}
                </li>
              ))}
          </ul>
          {options &&
            options.map((option, i) => (
              <ul key={i} className="table__list">
                {Object.values(option).map((item, i) => (
                  <li key={i + item} className="table__item">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}
      <Pagination
        pages={pages}
        handleClick={handleClick}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}

export default Table;
