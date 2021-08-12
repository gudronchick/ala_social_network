import React from "react";
import s from "./SendMessage.module.css";
import { Field, reset } from "redux-form";
import {
  autoResize,
  chooseImg,
  customFileInput,
} from "../../../assets/addFuncs";

const SendMessage = (props) => {
  if (props.submitSucceeded) {
    props.dispatch(reset("addMessage"));
  }

  const sendFile = (e) => {
    let img;
    if (e.target.files.length) {
      img = e.target.files[0];
    }
    props.addImgAC(chooseImg(img));
  };

  return (
    <div className={s.messages}>
      {props.messageImg && (
        <div className={s.message_image}>
          <img src={props.messageImg} alt={`Sent`} />
        </div>
      )}
      <form className={s.send} onSubmit={props.handleSubmit}>
        <div className={s.send_file}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
          </svg>
          <Field
            className={s.send_inp}
            type="file"
            component={customFileInput}
            name="file"
            accept=".png, .jpeg, .jpg"
            onChange={sendFile}
          />
        </div>
        <Field
          className={s.send_area}
          component="textarea"
          name="addMessage"
          type="textarea"
          placeholder="Write a message..."
          onKeyUp={(e) => {
            autoResize(e, 40);
          }}
        />
        <button className={s.send_btn} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
