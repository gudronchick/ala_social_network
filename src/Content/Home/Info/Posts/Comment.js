import React from "react";
import s from "../Info.module.css";
import { Field, reduxForm } from "redux-form";

const Comment = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="textarea"
        component="textarea"
        type="text"
        className={s.publisher_textarea}
        autoFocus={true}
      />
      <div className={s.publisher_button}>
        <button
          className={s.publisher_btn + " " + s.publisher_close}
          onClick={() => {
            props.switchComment(null);
          }}
        >
          Close
        </button>
        <button
          className={s.publisher_btn}
          onClick={() => {
            props.setCommentIsLeftMode(props.id);
            props.setComemntId(props.id);
          }}
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "comment",
})(Comment);
