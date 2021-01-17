import React from "react";
import { withNaming } from "@bem-react/classname";
import AdminSelect from "../AdminSelect/AdminSelect";
import AdminButton from "../AdminButton/AdminButton";
import Pagination from "../Pagination/Pagination";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import { makeCapitalizedWord } from "../../../../utils/capitalizedWord";
import { makePriceWithGap } from "../../../../utils/priceWithGap";
import { transformDate } from "../../../../utils/transformDate";
import "./List.scss";

function List({
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
  selectNames,
}) {
  const cn = withNaming({ n: "list", e: "__", m: "_" });

  function handleChange(e) {
    const { name, value } = e.target;
    setSearchItems({ ...searchItems, [name]: value });
  }

  function handleReset() {
    resetFilters();
  }

  return (
    <div className={cn("")()}>
      <form className={cn("", "container")()} onSubmit={handleSubmit}>
        <div className={cn("", "select-container")()}>
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
        <div className={cn("", "button-container")()}>
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
        <div className={cn("", "container")({ type: "digits" })}>
          {options &&
            options.map((option, i) => (
              <div key={i} className={cn("", "list")({ type: "order" })}>
                {option.image ? (
                  <img
                    className={cn("", "image")()}
                    src={
                      option.image.startsWith("data")
                        ? `${option.image}`
                        : `${URL_SIMBIRSOFT}${option.image}`
                    }
                    alt="Фото машины"
                    crossOrigin="anonymous"
                    referrerPolicy="origin"
                  />
                ) : (
                  <div className={cn("", "blank")()}></div>
                )}
                <div className={cn("", "content")()}>
                  <div className={cn("", "info")()}>
                    <p className={cn("", "text")()}>
                      {option.car}{" "}
                      <span className={cn("", "text")({ type: "thin" })}>
                        в
                      </span>{" "}
                      {option.city},{" "}
                      <span className={cn("", "text")({ type: "thin" })}>
                        {option.point}
                      </span>
                    </p>
                    <p className={cn("", "text")({ type: "thin" })}>
                      {transformDate(option.dateFrom)} -{" "}
                      {transformDate(option.dateTo)}
                    </p>
                    <p className={cn("", "text")()}>
                      <span className={cn("", "text")({ type: "thin" })}>
                        Цвет:{" "}
                      </span>
                      {makeCapitalizedWord(option.color)}
                    </p>
                  </div>
                  <div className={cn("", "info")()}>
                    <AdminCheckbox
                      values={["Полный бак", "Детское кресло", "Правый руль"]}
                      checkedValues={[
                        option.isFullTank,
                        option.isNeedChildChair,
                        option.isRightWheel,
                      ]}
                    />
                  </div>
                  <div className={cn("", "price")()}>
                    {makePriceWithGap(option.price)} ₽
                  </div>
                  <ButtonGroup />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={cn("", "container")({ type: "digits" })}>
          <ul className={cn("", "list")()}>
            {headers &&
              headers.map((item, i) => (
                <li
                  key={item + i}
                  className={cn("", "item")({ type: "title" })}
                >
                  {item}
                </li>
              ))}
          </ul>
          {options &&
            options.map((option, i) => (
              <ul key={i} className={cn("", "list")()}>
                {Object.values(option).map((item, i) => (
                  <li key={i} className={cn("", "item")()}>
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

export default List;
