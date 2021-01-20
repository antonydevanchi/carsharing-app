import React from "react";
import { Link } from "react-router-dom";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminFooter.scss";

function AdminFooter() {
  const createCn = (element, modifier) =>
    createClassName("admin-footer", element, modifier);

  return (
    <footer className={createCn()}>
      <div className={createCn("list")}>
        <Link to="/carsharing-app" className={createCn("item")}>
          Главная страница
        </Link>
        <Link to="/order-form/location" className={createCn("item")}>
          Страница заказа
        </Link>
      </div>
      <p className={createCn("text")}>Copyright &copy; 2020 Simbirsoft</p>
    </footer>
  );
}

export default AdminFooter;
