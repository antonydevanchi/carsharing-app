import React from "react";
import { withNaming } from "@bem-react/classname";
import AdminSelect from "../AdminSelect/AdminSelect";
import AdminButton from "../AdminButton/AdminButton";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Pagination from "../Pagination/Pagination";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import "./OrderCard.scss";
import elantra from "../../../../images/elantra.jpg";

function OrderCard() {
  const period = ["За неделю", "За день"];
  const cars = ["Elantra", "Honda", "Porshe"];
  const cities = ["Ульяновск", "Саранск", "Самара", "Казань"];
  const status = ["В процессе", "Любой"];
  const cn = withNaming({ n: "", e: "__", m: "_" });

  return (
    <div className="order-card">
      <div className="order-card__container">
        <div className="order-card__select-container">
          <AdminSelect id="id1" options={period} />
          <AdminSelect id="id2" options={cars} />
          <AdminSelect id="id3" options={cities} />
          <AdminSelect id="id4" options={status} />
        </div>
        <AdminButton text="Применить" type="button" size="mini" />
      </div>
      <div className={cn("order-card", "container")({ type: "content" })}>
        <img className="order-card__image" src={elantra} alt="Фото машины" />
        <div className="order-card__content">
          <div className="order-card__info">
            <p className="order-card__text">
              ELANTRA{" "}
              <span className={cn("order-card", "text")({ type: "thin" })}>
                в
              </span>{" "}
              Ульяновск,{" "}
              <span className={cn("order-card", "text")({ type: "thin" })}>
                Нариманова 42
              </span>
            </p>
            <p className="order-card__text">
              12.06.2019 12:00 — 13.06.2019 12:00
            </p>
            <p className="order-card__text">Цвет: Голубой</p>
          </div>
          <div className="order-card__info">
            <AdminCheckbox
              values={["Полный бак", "Детское кресло", "Правый руль"]}
              checkedValues={["Полный бак"]}
            />
          </div>
          <div className="order-card__price">4 300 ₽</div>
          <ButtonGroup />
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default OrderCard;
