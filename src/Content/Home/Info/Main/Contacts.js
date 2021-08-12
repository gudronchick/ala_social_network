import React from "react";
import s from "../Info.module.css";
import contacts from "../../../../assets/contactsArray";

const Contacts = (props) => {
  const contactsBtns = contacts.map((item) => {
    return (
      props[item.id] && (
        <a
          key={item.id}
          href={props[item.id]}
          style={{ background: item.bgColor }}
          className={s.contact_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={s.contact_text}>
            <span className={s.svg_contact}>{item.svg}</span> {" " + item.name}
          </div>
        </a>
      )
    );
  });
  return (
    <>
      {!contactsBtns.every((i) => i === null) && (
        <>
          <h4>Other Networks:</h4>
          <div className={s.contacts_btns + " " + s.grey}>{contactsBtns}</div>
        </>
      )}
    </>
  );
};

export default Contacts;
