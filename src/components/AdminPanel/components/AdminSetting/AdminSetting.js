import React from "react";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import "./AdminSetting.scss";

function AdminSetting({ colors }) {
  return (
    <div className="admin-setting">
      <div className="admin-setting__content">
        <h3 className="admin-setting__title">Настройки автомобиля</h3>
        <form className="admin-setting__form">
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
      <div className="admin-setting__button-container">
        <div className="admin-setting__button-group">
          <AdminButton text="Сохранить" type="button" position="left" />
          <AdminButton text="Отменить" type="button" disabled={true} />
        </div>
        <AdminButton text="Удалить" type="button" color="red" />
      </div>
    </div>
  );
}

export default AdminSetting;
