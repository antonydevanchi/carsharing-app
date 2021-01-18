import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import SideBar from "./components/SideBar/SideBar";
import AdminFooter from "./components/AdminFooter/AdminFooter";
import AdminTitle from "./components/AdminTitle/AdminTitle";
import AdminCard from "./components/AdminCard/AdminCard";
import AdminSetting from "./components/AdminSetting/AdminSetting";
import Table from "./components/Table/Table";
import OrderCard from "./components/OrderCard/OrderCard";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { CARS, ORDERS } from "../../constants/constants";
import "./AdminPanel.scss";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <SideBar />
      <div className="admin-content">
        <AdminHeader />
        <div className="admin-container">
          <Switch>
            <Route path="/admin/content/car">
              <AdminTitle text="Карточка автомобиля" />
              <div className="content">
                <AdminCard />
                <AdminSetting />
              </div>
            </Route>
            <Route path="/admin/content/list">
              <AdminTitle text="Список авто" />
              <Table options={CARS} />
            </Route>
            <Route path="/admin/content/table">
              <AdminTitle text="Заказы" />
              <Table options={ORDERS} />
            </Route>
            <Route path="/admin/content/menu4">
              <AdminTitle text="Карточка заказа" />
              <OrderCard />
            </Route>
            <Route path="/admin/content/menu5">
              <AdminTitle text="Menu 5" />
            </Route>
            <Route path="/admin/content/menu6">
              <AdminTitle text="Menu 6" />
            </Route>
            <Route path="/admin/content/menu7">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminPanel;
