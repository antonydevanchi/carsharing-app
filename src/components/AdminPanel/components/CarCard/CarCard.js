import React from "react";
import AdminSetting from "../AdminSetting/AdminSetting";
import AdminCard from "../AdminCard/AdminCard";
import AdminTitle from "../AdminTitle/AdminTitle";
import { COLOR_VALUES } from "../../../../constants/constants";
import { createClassName } from "../../../../utils/createClassName";
import "./CarCard.scss";

function CarCard() {
  const createCn = (element, modifier) =>
    createClassName("car-card", element, modifier);

  return (
    <>
      <AdminTitle text="Карточка автомобиля" />
      <div className={createCn()}>
        <AdminCard />
        <AdminSetting colors={COLOR_VALUES} />
      </div>
    </>
  );
}

export default CarCard;
