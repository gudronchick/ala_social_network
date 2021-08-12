import React from "react";
import css from "./ListItem.module.css";
import { NavLink } from "react-router-dom";

const ListItem = (props) => {
  return (
    <li className={css.menu__item}>
      <NavLink to={props.hrefName}>{props.text}</NavLink>
    </li>
  );
};

export default ListItem;
