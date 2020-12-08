import React from "react";
import { withNaming } from "@bem-react/classname";
import "./Item.scss";

function Item({ title, name, modifier }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });
  return (
    <div className="item">
      <p className="item__text">{title}</p>
      <div className="item__line" />
      <p className={cn("item", "text")({ type: "thin", size: modifier })}>
        {name}
      </p>
    </div>
  );
}

export default Item;
