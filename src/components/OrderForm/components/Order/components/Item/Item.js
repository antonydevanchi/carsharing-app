import React from "react";
import "./Item.scss";

function Item(props) {
  return (
    <div className="item">
      <p className="item__text">{props.title}</p>
      <div className="item__line" />
      <p className={props.className}>{props.name}</p>
    </div>
  );
}

export default Item;
