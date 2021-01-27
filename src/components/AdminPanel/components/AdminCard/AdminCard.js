import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { createClassName } from "../../../../utils/createClassName";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import "./AdminCard.scss";

function AdminCard({
  name,
  category,
  description,
  carImage,
  number,
  imageFile,
  setImageFile,
  handleChange,
}) {
  const [inputValue, setInputValue] = useState("");
  const createCn = (element, modifier) =>
    createClassName("admin-card", element, modifier);

  function changeImage(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      setInputValue(file.name);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          setImageFile({
            mimetype: file.type,
            originalname: file.name,
            path: reader.result,
            size: file.size,
          });
        };
      }
    }
  }

  return (
    <div className={createCn()}>
      {imageFile.path && (
        <img
          className={createCn("image")}
          src={imageFile.path}
          alt="фото машины"
        />
      )}
      {carImage && !imageFile.path && (
        <img
          className={createCn("image")}
          src={
            carImage.startsWith("data")
              ? `${carImage}`
              : `${URL_SIMBIRSOFT}${carImage}`
          }
          alt="фото машины"
          crossOrigin="anonymous"
          referrerPolicy="origin"
        />
      )}
      <h3 className={createCn("title")}>{name}</h3>
      <p className={createCn("subtitle")}>{category}</p>
      <form className={createCn("form")}>
        <div className={createCn("input-container")}>
          <div className={createCn("castom-input")}>
            {inputValue ? inputValue : "Выберите файл..."}
            <input
              className={createCn("input")}
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={changeImage}
            />
          </div>
          <label className={createCn("label")} htmlFor="file">
            Обзор
          </label>
        </div>
      </form>
      <ProgressBar value={number} />
      <form className={createCn("form", { type: "description" })}>
        <label className={createCn("description")} htmlFor="description">
          Описание
          <textarea
            className={createCn("text")}
            id="description"
            name="description"
            value={description}
            rows="6"
            cols="30"
            placeholder="Добавьте описание..."
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
}

export default AdminCard;
