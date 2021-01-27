import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminCard.scss";
import elantra from "../../../../images/elantra.jpg";

function AdminCard() {
  const [imageFile, setImageFile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const createCn = (element, modifier) =>
    createClassName("admin-card", element, modifier);

  function getImageSrc(event) {
    const file = event.target.files[0];
    setInputValue(file.name);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        setImageFile(e.target.result);
      };
    }
  }

  return (
    <div className={createCn()}>
      <img
        className={createCn("image")}
        src={imageFile ? imageFile : elantra}
        alt="фото машины"
      />
      <h3 className={createCn("title")}>Hyndai, i30 N</h3>
      <p className={createCn("subtitle")}>Компакт-кар</p>
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
              onChange={getImageSrc}
            />
          </div>
          <label className={createCn("label")} htmlFor="file">
            Обзор
          </label>
        </div>
      </form>
      <ProgressBar value="74%" />
      <form className={createCn("form", { type: "description" })}>
        <label className={createCn("description")} htmlFor="description">
          Описание
          <textarea
            className={createCn("text")}
            id="description"
            name="description"
            rows="6"
            cols="30"
            placeholder="Добавьте описание..."
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
          />
        </label>
      </form>
    </div>
  );
}

export default AdminCard;
