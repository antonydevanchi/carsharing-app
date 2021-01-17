import React, { useState } from "react";
import { withNaming } from "@bem-react/classname";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./AdminCard.scss";
import elantra from "../../../../images/elantra.jpg";

function AdminCard() {
  const [imageFile, setImageFile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const cn = withNaming({ n: "admin-card", e: "__", m: "_" });

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
    <div className={cn("")()}>
      <img
        className={cn("", "image")()}
        src={imageFile ? imageFile : elantra}
        alt="фото машины"
      />
      <h3 className={cn("", "title")()}>Hyndai, i30 N</h3>
      <p className={cn("", "subtitle")()}>Компакт-кар</p>
      <form className={cn("", "form")()}>
        <div className={cn("", "input-container")()}>
          <div className={cn("", "castom-input")()}>
            {inputValue ? inputValue : "Выберите файл..."}
            <input
              className={cn("", "input")()}
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={getImageSrc}
            />
          </div>
          <label className={cn("", "label")()} htmlFor="file">
            Обзор
          </label>
        </div>
      </form>
      <ProgressBar value="74%" />
      <form className={cn("", "form")({ type: "description" })}>
        <label className={cn("", "description")()} htmlFor="description">
          Описание
          <textarea
            className={cn("", "text")()}
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
