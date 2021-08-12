import React from "react";
import s from "./assets.module.css";

export const Input = (props) => {

  const checkString =
    props.type !== "checkbox" &&
    props.meta.invalid &&
    props.meta.touched &&
    (props.type === "email" || props.type === "password"
      ? !props.meta.active
      : 1);

  return (
    <span className={s.parent__input}>
      <input
        {...props.input}
        className={
          checkString ? props.className + " " + s.input__err : props.className
        }
        placeholder={props.placeholder}
        type={props.type}
      />
      {checkString && <span className={s.error}>{props.meta.error}</span>}
    </span>
  );

};

export const Textarea = (props) => {
  return (
    <>
      <input
        {...props.input}
        placeholder={props.placeholder}
        type={props.type}
        className={props.className}
        autoComplete="off"
      />
      {props.meta.touched && props.meta.invalid && (
        <span>{props.meta.error}</span>
      )}
    </>
  );
};
