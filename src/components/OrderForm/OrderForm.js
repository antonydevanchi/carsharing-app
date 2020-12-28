import React, { useState } from "react";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Order from "./components/Order/Order";
import "./OrderForm.scss";

function OrderForm() {
  const [isActiveModel, setIsActiveModel] = useState(false);
  const [isActiveAdditionally, setIsActiveAdditionally] = useState(false);
  const [isActiveTotal, setIsActiveTotal] = useState(false);
  const [isConfirmedOrder, setIsConfirmedOrder] = useState(false);
  const [orderId, setOrderId] = useState("");

  return (
    <>
      <Breadcrumbs
        isActiveModel={isActiveModel}
        isActiveAdditionally={isActiveAdditionally}
        isActiveTotal={isActiveTotal}
        isConfirmedOrder={isConfirmedOrder}
        orderId={orderId}
      />
      <div className="order-form">
        <Order
          setIsActiveModel={setIsActiveModel}
          setIsActiveAdditionally={setIsActiveAdditionally}
          setIsActiveTotal={setIsActiveTotal}
          setIsConfirmedOrder={setIsConfirmedOrder}
          isConfirmedOrder={isConfirmedOrder}
          setOrderId={setOrderId}
        />
      </div>
    </>
  );
}

export default OrderForm;
