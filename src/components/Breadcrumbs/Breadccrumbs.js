import React from 'react';
import './Breadcrumbs.scss';
import {NavLink} from 'react-router-dom';
import arrow from '../../images/arrow.svg'; 

function Breadcrumbs() {
  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/location">Местоположение</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/model">Модель</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item" >
        <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/additionally">Дополнительно</NavLink>
        <img className="breadcrumbs__arrow" src={arrow} alt="стрелка"/>
      </li>
      <li className="breadcrumbs__item">
      <NavLink className="breadcrumbs__link" activeClassName="breadcrumbs__link_active" to="/total">Итого</NavLink>
      </li>
    </ul>
  )
}

export default Breadcrumbs;