import React from "react";
import AdminSelect from "../AdminSelect/AdminSelect";
import AdminButton from "../AdminButton/AdminButton";
import Pagination from "../Pagination/Pagination";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import { makeCapitalizedWord } from "../../../../utils/capitalizedWord";
import { makePriceWithGap } from "../../../../utils/priceWithGap";
import { transformDate } from "../../../../utils/transformDate";
import { createClassName } from "../../../../utils/createClassName";
import "./List.scss";

function List({
  options,
  selectFields,
  headers,
  pages,
  handleClick,
  handleSubmit,
  resetFilters,
  activeIndex,
  goRight,
  goLeft,
  isOrdersList,
  selectNames,
  handleChange,
}) {
  const createCn = (element, modifier) =>
    createClassName("list", element, modifier);

  function handleReset() {
    resetFilters();
  }

  return (
    <div className={createCn()}>
      <form className={createCn("container")} onSubmit={handleSubmit}>
        <div className={createCn("select-container")}>
          {selectFields &&
            selectFields.map((item, i) => (
              <AdminSelect
                key={i}
                name={selectNames[i]}
                options={item.map((elem) => elem)}
                handleChange={handleChange}
              />
            ))}
        </div>
        <div className={createCn("button-container")}>
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
      {isOrdersList && (
        <div className={createCn("container", { type: "digits" })}>
          {options &&
            options.map((option, i) => (
              <div key={i} className={createCn("list", { type: "order" })}>
                {option.image && (
                  <img
                    className={createCn("image")}
                    src={
                      option.image.startsWith("data")
                        ? `${option.image}`
                        : `${URL_SIMBIRSOFT}${option.image}`
                    }
                    alt="Фото машины"
                    crossOrigin="anonymous"
                    referrerPolicy="origin"
                  />
                )}
                {!option.image && <div className={createCn("blank")}></div>}
                <div className={createCn("content")}>
                  <div className={createCn("info")}>
                    <p className={createCn("text")}>
                      {option.car}{" "}
                      <span className={createCn("text", { type: "thin" })}>
                        в
                      </span>{" "}
                      {option.city},{" "}
                      <span className={createCn("text", { type: "thin" })}>
                        {option.point}
                      </span>
                    </p>
                    <p className={createCn("text", { type: "thin" })}>
                      {transformDate(option.dateFrom)} -{" "}
                      {transformDate(option.dateTo)}
                    </p>
                    <p className={createCn("text")}>
                      <span className={createCn("text", { type: "thin" })}>
                        Цвет:{" "}
                      </span>
                      {makeCapitalizedWord(option.color)}
                    </p>
                  </div>
                  <div className={createCn("info")}>
                    <AdminCheckbox
                      values={["Полный бак", "Детское кресло", "Правый руль"]}
                      checkedValues={[
                        option.isFullTank,
                        option.isNeedChildChair,
                        option.isRightWheel,
                      ]}
                    />
                  </div>
                  <div className={createCn("price")}>
                    {makePriceWithGap(option.price)} ₽
                  </div>
                  <ButtonGroup />
                </div>
              </div>
            ))}
        </div>
      )}
      {!isOrdersList && (
        <div className={createCn("container", { type: "digits" })}>
          <ul className={createCn("list")}>
            {headers &&
              headers.map((item, i) => (
                <li
                  key={item + i}
                  className={createCn("item", { type: "title" })}
                >
                  {item}
                </li>
              ))}
          </ul>
          {options &&
            options.map((option, i) => (
              <ul key={i} className={createCn("list")}>
                {Object.values(option).map((item, i) => (
                  <li key={i} className={createCn("item")}>
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
        goRight={goRight}
        goLeft={goLeft}
      />
    </div>
  );
}

export default List;
