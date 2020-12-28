import React from "react";
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
  return (
    <nav className="sidebar">
      <Logo text="Need for car" modifier="mini" />
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/car"
      >
        <BlogIcon />
        Карточка автомобиля
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/list"
      >
        <PostsIcon />
        Список авто
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/table"
      >
        <AddIcon />
        Заказы
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/menu4"
      >
        <OverviewIcon />
        Карточка заказа
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/menu5"
      >
        <FormsIcon />
        Menu 5
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/menu6"
      >
        <PersonIcon />
        Menu 6
      </NavLink>
      <NavLink
        className="sidebar__item"
        activeClassName="sidebar__item_active"
        to="/admin/content/menu7"
      >
        <ErrorIcon />
        Error Page
      </NavLink>
    </nav>
  );
}

export default SideBar;
