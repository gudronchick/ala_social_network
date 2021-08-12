import React from "react";
import s from "./ListItem.module.css";
import { NavLink } from "react-router-dom";

const ListItem = (props) => {
  return (
    <li className={s.sidebar__item}>
      <NavLink activeClassName={s.selected} exact to={props.hrefTag}>
        {props.li || props.children}
      </NavLink>
    </li>
  );
};

export default ListItem;
