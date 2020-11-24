import React from "react";
import Breadcrumbs from "./components/Breadcrumbs/Breadccrumbs";
import Order from "./components/Order/Order";
import "./OrderForm.scss";

function OrderForm() {
  return (
    <>
      <Breadcrumbs />
      <div className="order-form">
        <Order />
      </div>
    </>
  );
}

export default OrderForm;
