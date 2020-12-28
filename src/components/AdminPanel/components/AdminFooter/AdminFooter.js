import React from "react";
import { Link } from "react-router-dom";
import "./AdminFooter.scss";

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer__list">
        <Link to="/carsharing-app" className="admin-footer__item">
          Главная страница
        </Link>
        <Link to="/order-form/location" className="admin-footer__item">
          Страница заказа
        </Link>
      </div>
      <p className="admin-footer__text">Copyright &copy; 2020 Simbirsoft</p>
    </footer>
  );
}

export default AdminFooter;
