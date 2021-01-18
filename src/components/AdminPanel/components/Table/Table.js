import React from "react";
import { withNaming } from "@bem-react/classname";
import AdminSelect from "../AdminSelect/AdminSelect";
import AdminButton from "../AdminButton/AdminButton";
import Pagination from "../Pagination/Pagination";
import "./Table.scss";

function Table({ options }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });

  const fields = ["Field", "Field 1", "Field 2"];

  return (
    <div className="table">
      <div className="table__container">
        <div className="table__select-container">
          <AdminSelect id="id1" options={fields} />
          <AdminSelect id="id2" options={fields} />
          <AdminSelect id="id3" options={fields} />
          <AdminSelect id="id4" options={fields} />
        </div>
        <div className="table__button-container">
          <AdminButton
            text="Сбросить"
            type="button"
            color="red"
            size="mini"
            position="left"
          />
          <AdminButton text="Применить" type="button" size="mini" />
        </div>
      </div>
      <div className={cn("table", "container")({ type: "digits" })}>
        <ul className="table__list">
          <li className={cn("table", "item")({ type: "title" })}>Header</li>
          <li className={cn("table", "item")({ type: "title" })}>Header</li>
          <li className={cn("table", "item")({ type: "title" })}>Header</li>
          <li className={cn("table", "item")({ type: "title" })}>Header</li>
          <li className={cn("table", "item")({ type: "title" })}>Header</li>
        </ul>
        {options &&
          options.map((option, i) => (
            <ul key={i} className="table__list">
              <li className={cn("table", "item")({ type: "title" })}>
                {option.name}
              </li>
              <li className="table__item">{option.id}</li>
              <li className="table__item">{option.category}</li>
              <li className="table__item">{option.price}</li>
              <li className="table__item">{option.other}</li>
            </ul>
          ))}
      </div>
      <Pagination />
    </div>
  );
}

export default Table;
