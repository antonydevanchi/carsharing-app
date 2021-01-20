import React from "react";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminSetting.scss";

function AdminSetting({ colors }) {
  const createCn = (element, modifier) =>
    createClassName("admin-setting", element, modifier);

  return (
    <div className={createCn()}>
      <div className={createCn("content")}>
        <h3 className={createCn("title")}>Настройки автомобиля</h3>
        <form className={createCn("form")}>
          <AdminInput
            label="Модель автомобиля"
            id="carBrand"
            type="text"
            placeholder="Введите модель автомобиля..."
            position="left"
          />
          <AdminInput
            label="Тип автомобиля"
            id="carType"
            type="text"
            placeholder="Введите тип автомобиля..."
            position="left"
          />
          <AdminInput
            label="Доступные цвета"
            id="carColors"
            type="text"
            placeholder="Введите цвет автомобиля..."
            kind="top"
            position="left"
            addition="button"
            options={colors}
          />
        </form>
      </div>
      <div className={createCn("button-container")}>
        <div className={createCn("button-group")}>
          <AdminButton text="Сохранить" type="button" position="left" />
          <AdminButton text="Отменить" type="button" disabled={true} />
        </div>
        <AdminButton text="Удалить" type="button" color="red" />
      </div>
    </div>
  );
}

export default AdminSetting;
