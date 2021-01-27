import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import AddIcon from "./components/AddIcon/AddIcon";
import BlogIcon from "./components/BlogIcon/BlogIcon";
import ErrorIcon from "./components/ErrorIcon/ErrorIcon";
import FormsIcon from "./components/FormsIcon/FormsIcon";
import OverviewIcon from "./components/OverviewIcon/OverviewIcon";
import PersonIcon from "./components/PersonIcon/PersonIcon";
import PostsIcon from "./components/PostsIcon/PostsIcon";
import { createClassName } from "../../../../utils/createClassName";
import "./SideBar.scss";

function SideBar() {
  const [isMenuOpened, setIsMenuOpened] = useState(true);
  const [activePathname, setActivePathname] = useState("");
  const location = useLocation();

  const createCn = (element, modifier) =>
    createClassName("sidebar", element, modifier);

  const checkCondition = (pathEnd) =>
    activePathname === `/admin/content/${pathEnd}`;

  useEffect(() => {
    setActivePathname(location.pathname);
  }, [location.pathname]);

  function toggleMenuVisibility() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <div className={createCn()}>
      <button
        className={
          isMenuOpened
            ? createCn("button", { type: "close" })
            : createCn("button")
        }
        onClick={toggleMenuVisibility}
      />
      {isMenuOpened && (
        <nav className={createCn("menu")}>
          <Logo text="Need for car" modifier="mini" />
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/car-card"
          >
            <BlogIcon isActive={checkCondition("car-card")} />
            Карточка автомобиля
          </NavLink>
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/cars-list"
          >
            <PostsIcon isActive={checkCondition("cars-list")} />
            Автомобили
          </NavLink>
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/orders-list"
          >
            <AddIcon isActive={checkCondition("orders-list")} />
            Заказы
          </NavLink>
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/order-card"
          >
            <OverviewIcon isActive={checkCondition("order-card")} />
            Карточка заказа
          </NavLink>
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/points-list"
          >
            <FormsIcon isActive={checkCondition("points-list")} />
            Пункты
          </NavLink>
          <NavLink
            className={createCn("item")}
            activeClassName={createCn("item", { type: "active" })}
            to="/admin/content/point-card"
          >
            <PersonIcon isActive={checkCondition("point-card")} />
            Карточка пункта
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default SideBar;
