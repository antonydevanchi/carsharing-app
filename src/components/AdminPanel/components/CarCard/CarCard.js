import React from "react";
import AdminSetting from "../AdminSetting/AdminSetting";
import AdminCard from "../AdminCard/AdminCard";
import AdminTitle from "../AdminTitle/AdminTitle";
import { COLOR_VALUES } from "../../../../constants/constants";
import "./CarCard.scss";

function CarCard() {
  return (
    <>
      <AdminTitle text="Карточка автомобиля" />
      <div className="car-card">
        <AdminCard />
        <AdminSetting colors={COLOR_VALUES} />
      </div>
    </>
  );
}

export default CarCard;
