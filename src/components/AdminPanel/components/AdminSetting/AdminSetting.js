import React from "react";
import { withNaming } from "@bem-react/classname";
import AdminButton from "../AdminButton/AdminButton";
import AdminInput from "../AdminInput/AdminInput";
import "./AdminSetting.scss";

function AdminSetting({ colors }) {
  const cn = withNaming({ n: "admin-setting", e: "__", m: "_" });

  return (
    <div className={cn("")()}>
      <div className={cn("", "content")()}>
        <h3 className={cn("", "title")()}>Настройки автомобиля</h3>
        <form className={cn("", "form")()}>
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
      <div className={cn("", "button-container")()}>
        <div className={cn("", "button-group")()}>
          <AdminButton text="Сохранить" type="button" position="left" />
          <AdminButton text="Отменить" type="button" disabled={true} />
        </div>
        <AdminButton text="Удалить" type="button" color="red" />
      </div>
    </div>
  );
}

export default AdminSetting;
