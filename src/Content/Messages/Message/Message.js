import React from "react";
import s from "./Message.module.css";

const Message = (props) => {
  return (
    <div>
      <p className={s.message}>{props.message}</p>
      {props.img && (
        <img className={s.message_img} src={props.img} alt="Message" />
      )}
    </div>
  );
};

export default Message;
