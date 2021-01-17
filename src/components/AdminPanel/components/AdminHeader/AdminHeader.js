import React from "react";
import { withNaming } from "@bem-react/classname";
import "./AdminHeader.scss";
import shape from "../../../../images/shape.svg";
import bell from "../../../../images/bell.svg";
import avatar from "../../../../images/avatar.jpg";

function AdminHeader() {
  const cn = withNaming({ n: "admin-header", e: "__", m: "_" });

  return (
    <header className={cn("")()}>
      <div className={cn("", "search")()}>
        <img className={cn("", "search-icon")()} src={shape} alt="поиск" />
        <input
          className={cn("", "search-input")()}
          type="text"
          placeholder="Поиск …"
        />
      </div>
      <div className={cn("", "container")()}>
        <div className={cn("", "notifications")()}>
          <img className={cn("", "bell")()} src={bell} alt="уведомления" />
          <div className={cn("", "counter")()}>2</div>
        </div>
        <div className={cn("", "admin-info")()}>
          <img className={cn("", "avatar")()} src={avatar} alt="аватар" />
          <select className={cn("", "admin-select")()}>
            <option className={cn("", "select-option")()}>Admin</option>
            <option className={cn("", "select-option")()}>Admin 2</option>
            <option className={cn("", "select-option")()}>Admin 3</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
