import React, { useRef, useState } from "react";
import s from "./Settings.module.css";

const Setting = (props) => {
  const fieldRef = useRef();
  const [inputValue, inputValueSet] = useState(props.value);
  const focusOnField = (e) => {
    fieldRef.current.focus();
  };

  return (
    <div className={s.setting_item}>
      <h3 className={s.name}>{props.text}</h3>
      <input
        ref={fieldRef}
        name={props.name}
        value={inputValue}
        type="text"
        className={s.name_value}
        onChange={(e) => {
          inputValueSet(e.target.value);
        }}
      />
      <span className={s.change} onClick={focusOnField}>
        Change
      </span>
    </div>
  );
};

export default Setting;
