import React, { useEffect } from "react";
import s from "./Messages.module.css";
import Message from "./Message/Message";
import SendMessageContainer from "./SendMessage/SendMessageContainer";
import { NavLink } from "react-router-dom";
import { getPublishDate } from "../../assets/addFuncs";

const Messages = ({ getNameAC, ...props }) => {
  useEffect(() => {
    getNameAC("Messages");
  }, [getNameAC]);

  const messageComponents = props.messages.map((message, i) => {
    if (i === 0) {
      return (
        <div className={s.message} key={message.id}>
          <NavLink to="/page" className={s.message_img}>
            <img
              className={s.message_img}
              src={props.photos ? props.photos.small : ""}
              alt={props.photos ? props.photos.small + 1 : ""}
            />
          </NavLink>
          <div className={s.message_right}>
            <div className={s.message_head}>
              <NavLink to="/page" className={s.message_name}>
                {props.fullName}
              </NavLink>
            </div>
            <div className={s.message_row}>
              <Message message={message.message} img={message.messageImg} />{" "}
              <span className={s.message_time}>
                {getPublishDate(message.time) + " ago" || "some time ago"}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={s.next_message} key={message.id}>
          <Message message={message.message} img={message.messageImg} />
        </div>
      );
    }
  });

  const submitMessage = ({ addMessage = "" }) => {
    if (addMessage || props.messageImg) {
      props.addMessageCreator(addMessage, props.messageImg);
    }
    props.addImgAC(null);
  };

  return (
    <div className={s.ms}>
      <div>{messageComponents}</div>
      <SendMessageContainer onSubmit={submitMessage} />
    </div>
  );
};

export default Messages;
