import React, { useState, useEffect } from "react";
import { URL_SIMBIRSOFT } from "../../../../constants/constants";
import { makeDisplayNumber } from "../../../../utils/displayNumber";
import "./Total.scss";

function Total({ carModel, startDate }) {
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
    </div>
  );
}

export default Total;
