import React from 'react';
import './OrderForm.scss';
import Breadcrumbs from './components/Breadcrumbs/Breadccrumbs';
import Location from './components/Location/Location';
import Order from './components/Order/Order';
import {Switch, Route} from 'react-router-dom';

function OrderForm() {
  return (
    <>
      <Breadcrumbs />
      <div className="order-form">
        <Switch>
          <Route path='/order-form/location'>
            <Location /> 
          </Route>
          <Route path="/order-form/model">
            Model
          </Route>
          <Route path="/order-form/additionally">
            Additionally
          </Route>
          <Route path="/order-form/total">
            Total
          </Route>
        </Switch>        
        <Order />
      </div>  
    </>
  )
}

export default OrderForm;