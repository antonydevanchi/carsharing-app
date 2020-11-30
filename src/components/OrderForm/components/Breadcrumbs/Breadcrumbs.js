import React from 'react';
import {NavLink} from 'react-router-dom';
import './Breadcrumbs.scss';
import arrow from '../../../../images/arrow.svg'; 

function Breadcrumbs() {
  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/order-form/location">Местоположение</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/order-form/model">Модель</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item" >
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/order-form/additionally">Дополнительно</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item">
      <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/order-form/total">Итого</NavLink>
      </li>
    </ul>
  )
}

export default Breadcrumbs;