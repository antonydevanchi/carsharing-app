import React, { useState } from "react";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Order from "./components/Order/Order";
import "./OrderForm.scss";

function OrderForm() {
  const [isActiveLocation, setIsActiveLocation] = useState(true);
  const [isActiveModel, setIsActiveModel] = useState(false);
  const [isActiveAdditionally, setIsActiveAdditionally] = useState(false);
  const [isActiveTotal, setIsActiveTotal] = useState(false);

  return (
    <>
      <Breadcrumbs
        isActiveLocation={isActiveLocation}
        isActiveModel={isActiveModel}
        isActiveAdditionally={isActiveAdditionally}
        isActiveTotal={isActiveTotal}
      />
      <div className="order-form">
        <Order
          setIsActiveLocation={setIsActiveLocation}
          setIsActiveModel={setIsActiveModel}
          setIsActiveAdditionally={setIsActiveAdditionally}
          setIsActiveTotal={setIsActiveTotal}
        />
      </div>
    </>
  );
}

export default OrderForm;
