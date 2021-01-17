import React from "react";
import { Link } from "react-router-dom";
import { withNaming } from "@bem-react/classname";
import "./AdminFooter.scss";

function AdminFooter() {
  const cn = withNaming({ n: "admin-footer", e: "__", m: "_" });

  return (
    <footer className={cn("")()}>
      <div className={cn("", "list")()}>
        <Link to="/carsharing-app" className={cn("", "item")()}>
          Главная страница
        </Link>
        <Link to="/order-form/location" className={cn("", "item")()}>
          Страница заказа
        </Link>
      </div>
      <p className={cn("", "text")()}>Copyright &copy; 2020 Simbirsoft</p>
    </footer>
  );
}

export default AdminFooter;
