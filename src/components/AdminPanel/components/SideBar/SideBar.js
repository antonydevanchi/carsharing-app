import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import AddIcon from "./components/AddIcon/AddIcon";
import BlogIcon from "./components/BlogIcon/BlogIcon";
import ErrorIcon from "./components/ErrorIcon/ErrorIcon";
import FormsIcon from "./components/FormsIcon/FormsIcon";
import OverviewIcon from "./components/OverviewIcon/OverviewIcon";
import PersonIcon from "./components/PersonIcon/PersonIcon";
import PostsIcon from "./components/PostsIcon/PostsIcon";
import "./SideBar.scss";

function SideBar() {
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  function toggleMenuVisibility() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <div className="sidebar">
      <button
        className={`sidebar__button ${
          isMenuOpened ? "sidebar__button_close" : ""
        }`}
        onClick={toggleMenuVisibility}
      />
      {isMenuOpened && (
        <nav className="sidebar__menu">
          <Logo text="Need for car" modifier="mini" />
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/car-card"
          >
            <BlogIcon />
            Карточка автомобиля
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/cars-list"
          >
            <PostsIcon />
            Автомобили
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/orders-list"
          >
            <AddIcon />
            Заказы
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/order-card"
          >
            <OverviewIcon />
            Карточка заказа
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/points-list"
          >
            <FormsIcon />
            Пункты
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/point-card"
          >
            <PersonIcon />
            Карточка пункта
          </NavLink>
          <NavLink
            className="sidebar__item"
            activeClassName="sidebar__item_active"
            to="/admin/content/menu7"
          >
            <ErrorIcon />
            Menu 7
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default SideBar;
