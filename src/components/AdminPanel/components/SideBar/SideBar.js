import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { withNaming } from "@bem-react/classname";
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
  const [activePathname, setActivePathname] = useState("");
  const location = useLocation();
  const cn = withNaming({ n: "sidebar", e: "__", m: "_" });

  useEffect(() => {
    setActivePathname(location.pathname);
  }, [location.pathname]);

  function toggleMenuVisibility() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <div className={cn("")()}>
      <button
        className={
          isMenuOpened
            ? cn("", "button")({ type: "close" })
            : cn("", "button")()
        }
        onClick={toggleMenuVisibility}
      />
      {isMenuOpened && (
        <nav className={cn("", "menu")()}>
          <Logo text="Need for car" modifier="mini" />
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/car-card"
          >
            <BlogIcon
              isActive={
                activePathname === "/admin/content/car-card" ? true : false
              }
            />
            Карточка автомобиля
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/cars-list"
          >
            <PostsIcon
              isActive={
                activePathname === "/admin/content/cars-list" ? true : false
              }
            />
            Автомобили
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/orders-list"
          >
            <AddIcon
              isActive={
                activePathname === "/admin/content/orders-list" ? true : false
              }
            />
            Заказы
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/order-card"
          >
            <OverviewIcon
              isActive={
                activePathname === "/admin/content/order-card" ? true : false
              }
            />
            Карточка заказа
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/points-list"
          >
            <FormsIcon
              isActive={
                activePathname === "/admin/content/points-list" ? true : false
              }
            />
            Пункты
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/point-card"
          >
            <PersonIcon
              isActive={
                activePathname === "/admin/content/point-card" ? true : false
              }
            />
            Карточка пункта
          </NavLink>
          <NavLink
            className={cn("", "item")()}
            activeClassName={cn("", "item")({ type: "active" })}
            to="/admin/content/menu7"
          >
            <ErrorIcon
              isActive={
                activePathname === "/admin/content/menu7" ? true : false
              }
            />
            Menu 7
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default SideBar;
