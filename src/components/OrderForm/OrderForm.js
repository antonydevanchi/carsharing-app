import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs/Breadccrumbs';
import Location from './components/Location/Location';
import Order from './components/Order/Order';
import CarModel from './components/CarModel/CarModel';
import Additionally from './components/Additionally/Additionally';
import Total from './components/Total/Total';
import './OrderForm.scss';

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
            <CarModel />
          </Route>
          <Route path="/order-form/additionally">
            <Additionally />
          </Route>
          <Route path="/order-form/total">
            <Total />
          </Route>
        </Switch>        
        <Order />
      </div>  
    </>
  )
}

export default OrderForm;