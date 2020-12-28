import React from "react";
import "./AdminHeader.scss";
import shape from "../../../../images/shape.svg";
import bell from "../../../../images/bell.svg";
import avatar from "../../../../images/avatar.jpg";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-header__search">
        <img className="admin-header__search-icon" src={shape} alt="поиск" />
        <input
          className="admin-header__search-input"
          type="text"
          placeholder="Поиск …"
        />
      </div>
      <div className="admin-header__container">
        <div className="admin-header__notifications">
          <img className="admin-header__bell" src={bell} alt="уведомления" />
          <div className="admin-header__counter">2</div>
        </div>
        <div className="admin-header__admin-info">
          <img className="admin-header__avatar" src={avatar} alt="аватар" />
          <select className="admin-header__admin-select">
            <option className="admin-header__select-option">Admin</option>
            <option className="admin-header__select-option">Admin 2</option>
            <option className="admin-header__select-option">Admin 3</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
