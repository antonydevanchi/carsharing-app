import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./AdminCard.scss";
import elantra from "../../../../images/elantra.jpg";

function AdminCard() {
  const [imageFile, setImageFile] = useState("");
  const [inputValue, setInputValue] = useState("");

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
    <div className="admin-card">
      <img
        className="admin-card__image"
        src={imageFile ? imageFile : elantra}
        alt="фото машины"
      />
      <h3 className="admin-card__title">Hyndai, i30 N</h3>
      <p className="admin-card__subtitle">Компакт-кар</p>
      <form className="admin-card__form">
        <div className="admin-card__input-container">
          <div className="admin-card__castom-input">
            {inputValue ? inputValue : "Выберите файл..."}
            <input
              className="admin-card__input"
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={getImageSrc}
            />
          </div>
          <label className="admin-card__label" htmlFor="file">
            Обзор
          </label>
        </div>
      </form>
      <ProgressBar value="74%" />
      <form className="admin-card__form admin-card__form_description">
        <label className="admin-card__description" htmlFor="description">
          Описание
          <textarea
            className="admin-card__text"
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
