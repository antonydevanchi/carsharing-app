import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import SideBar from "./components/SideBar/SideBar";
import AdminFooter from "./components/AdminFooter/AdminFooter";
import CarCard from "./components/CarCard/CarCard";
import CarsList from "./components/CarsList/CarsList";
import OrderCard from "./components/OrderCard/OrderCard";
import OrdersList from "./components/OrdersList/OrdersList";
import PointCard from "./components/PointCard/PointCard";
import PointsList from "./components/PointsList/PointsList";
import "./AdminPanel.scss";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <SideBar />
      <div className="admin-content">
        <AdminHeader />
        <div className="admin-container">
          <Switch>
            <Route path="/admin/content/car-card">
              <CarCard />
            </Route>
            <Route path="/admin/content/cars-list">
              <CarsList />
            </Route>
            <Route path="/admin/content/orders-list">
              <OrdersList />
            </Route>
            <Route path="/admin/content/order-card">
              <OrderCard />
            </Route>
            <Route path="/admin/content/points-list">
              <PointsList />
            </Route>
            <Route path="/admin/content/point-card">
              <PointCard />
            </Route>
          </Switch>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminPanel;
