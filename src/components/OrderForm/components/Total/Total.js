import React, { useState, useEffect } from "react";
import Button from "../../../Button/Button";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import { makeDisplayNumber } from "../../../../utils/displayNumber";
import "./Total.scss";

function Total({ carModel, startDate, isPopupOpened, togglePopup }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (carModel.thumbnail.path.startsWith("data")) {
      setImgSrc(carModel.thumbnail.path);
    } else {
      setImgSrc(`${URL_SIMBIRSOFT}${carModel.thumbnail.path}`);
    }
  }, [carModel.thumbnail.path]);

  return (
    <div className="total">
      <div className="total__container">
        <h3 className="total__auto-model">{carModel.name}</h3>
        {carModel.number && (
          <p className="total__car-number">
            {makeDisplayNumber(carModel.number)}
          </p>
        )}
        {!!carModel.tank && (
          <p className="total__item">
            Топливо<span className="total__value">{carModel.tank}%</span>
          </p>
        )}
        <p className="total__item">
          Доступна с<span className="total__value">{startDate}</span>
        </p>
      </div>
      <img
        className="total__image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={imgSrc}
        alt="выбранная машина"
      />
      {isPopupOpened && (
        <div className="total__popup">
          <h2 className="total__popup-title">Подтвердить заказ</h2>
          <div className="total__button-container">
            <Button text="Подтвердить" className="button button_middle-plus" />
            <Button
              text="Вернуться"
              className="button button_middle button_theme_red"
              onClick={togglePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Total;
