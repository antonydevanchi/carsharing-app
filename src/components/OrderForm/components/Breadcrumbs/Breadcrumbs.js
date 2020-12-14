import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { withNaming } from "@bem-react/classname";
import "./Breadcrumbs.scss";
import arrow from "../../../../images/arrow.svg";

function Breadcrumbs(props) {
  const history = useHistory();
  const location = useLocation();
  const [isActiveModel, setIsActiveModel] = useState(false);
  const [isActiveAdditionally, setIsActiveAdditionally] = useState(false);
  const [isActiveTotal, setIsActiveTotal] = useState(false);
  const cn = withNaming({ n: "", e: "__", m: "_" });

  useEffect(() => {
    location.pathname === "/order-form/model"
      ? setIsActiveModel(true)
      : setIsActiveModel(false);
    location.pathname === "/order-form/additionally"
      ? setIsActiveAdditionally(true)
      : setIsActiveAdditionally(false);
    location.pathname === "/order-form/total"
      ? setIsActiveTotal(true)
      : setIsActiveTotal(false);
  }, [location.pathname]);

  function openTabModel() {
    if (props.isActiveModel) {
      history.push("/order-form/model");
    }
  }
  function openTabAdditionally() {
    if (props.isActiveAdditionally) {
      history.push("/order-form/additionally");
    }
  }
  function openTabTotal() {
    if (props.isActiveTotal) {
      history.push("/order-form/total");
    }
  }

  return (
    <ul className="breadcrumbs">
      {props.isConfirmedOrder ? (
        <li className={cn("breadcrumbs", "link")({ type: "dark" })}>
          Заказ номер <span>{props.orderId}</span>
        </li>
      ) : (
        <>
          <li className="breadcrumbs__item">
            <NavLink
              className="breadcrumbs__link"
              activeClassName="breadcrumbs__link_active"
              to="/order-form/location"
            >
              Местоположение
            </NavLink>
            <img className="breadcrumbs__arrow" src={arrow} alt="стрелка" />
          </li>
          <li className="breadcrumbs__item">
            <p
              className={`breadcrumbs__link ${
                isActiveModel ? "breadcrumbs__link_active" : ""
              }`}
              onClick={openTabModel}
            >
              Модель
            </p>
            <img className="breadcrumbs__arrow" src={arrow} alt="стрелка" />
          </li>
          <li className="breadcrumbs__item">
            <p
              className={`breadcrumbs__link ${
                isActiveAdditionally ? "breadcrumbs__link_active" : ""
              }`}
              onClick={openTabAdditionally}
            >
              Дополнительно
            </p>
            <img className="breadcrumbs__arrow" src={arrow} alt="стрелка" />
          </li>
          <li className="breadcrumbs__item">
            <p
              className={`breadcrumbs__link ${
                isActiveTotal ? "breadcrumbs__link_active" : ""
              }`}
              onClick={openTabTotal}
            >
              Итого
            </p>
          </li>
        </>
      )}
    </ul>
  );
}

export default Breadcrumbs;
