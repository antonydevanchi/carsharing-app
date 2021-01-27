import React from "react";
import "./AdminHeader.scss";
import { createClassName } from "../../../../utils/createClassName";
import shape from "../../../../images/shape.svg";
import bell from "../../../../images/bell.svg";
import avatar from "../../../../images/avatar.jpg";

function AdminHeader() {
  const createCn = (element, modifier) =>
    createClassName("admin-header", element, modifier);

  return (
    <header className={createCn()}>
      <div className={createCn("search")}>
        <img className={createCn("search-icon")} src={shape} alt="поиск" />
        <input
          className={createCn("search-input")}
          type="text"
          placeholder="Поиск …"
        />
      </div>
      <div className={createCn("container")}>
        <div className={createCn("notifications")}>
          <img className={createCn("bell")} src={bell} alt="уведомления" />
          <div className={createCn("counter")}>2</div>
        </div>
        <div className={createCn("admin-info")}>
          <img className={createCn("avatar")} src={avatar} alt="аватар" />
          <select className={createCn("admin-select")}>
            <option className={createCn("select-option")}>Admin</option>
            <option className={createCn("select-option")}>Admin 2</option>
            <option className={createCn("select-option")}>Admin 3</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
