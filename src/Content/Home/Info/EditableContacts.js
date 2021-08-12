import React from "react";
import { Field } from "redux-form";
import { Input } from "../../../assets/Input";
import s from "./Info.module.css";

const EditableContacts = (props) => {
  const contactsNames = Object.keys(props.contacts || {}).map((item) => {
    return (
      <li key={item} className={s.edit_contact}>
        <span className={s.edit_name}>
          {item === "mainLink" ? "telegram" : item}:{" "}
        </span>{" "}
        <Field
          component={Input}
          type="text"
          className={s.edit_field}
          name={"contacts." + item}
        />
      </li>
    );
  });

  const cancelEdit = () => {
    props.editPageMode(false);
  };

  return (
    <>
      <h4 className={s.status_title + " " + s.edit_title}>Other Networks:</h4>
      <ul className={s.edit_list}>{contactsNames}</ul>
      <div className={s.edit_btn_cont}>
        <button type="button" onClick={cancelEdit} className={s.edit_close}>
          Close
        </button>
        <button type="submit" className={s.edit_btn}>
          Save
        </button>
      </div>
    </>
  );
};

export default EditableContacts;
