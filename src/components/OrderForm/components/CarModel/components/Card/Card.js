import React, { useState } from "react";
import "./Card.scss";

function Card(props) {
  const [isActive, setIsActive] = useState(false);
  let imgSrc;
  if (props.image.startsWith("data")) {
    imgSrc = props.image;
  } else {
    imgSrc = `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${props.image}`;
  }

  function setNameAndPrice(name, minPrice, maxPrice) {
    props.handleSubmit(name);
    props.displayPrice(minPrice, maxPrice);
    setIsActive(true);
  }

  return (
    <div
      className={`card ${isActive ? "card_active" : ""}`}
      onClick={() =>
        setNameAndPrice(props.name, props.priceMin, props.priceMax)
      }
    >
      <h3 className="card__title">{props.name}</h3>
      <div className="card__price-container">
        <span className="card__price">
          {props.makePriceWithGap(props.priceMin)}
        </span>
        <span className="card__price">-</span>
        <span className="card__price">
          {props.makePriceWithGap(props.priceMax)}
        </span>
        <span className="card__price">₽</span>
      </div>
      <img
        className="card__image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={imgSrc}
        alt="Фото машины"
      />
    </div>
  );
}

export default Card;
