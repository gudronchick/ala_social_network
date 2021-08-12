import React from "react";
import s from "./Preloader.module.css";

const Preloader = (props) => {
  return (
    <div
      className={
        s.preloader +
        " " +
        s[props.isFetching && "active"] +
        " " +
        (props.padding && s.paddings)
      }
    >
      <div className={s.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
