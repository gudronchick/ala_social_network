import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import {
  autoResize,
  chooseImg,
  customFileInput,
} from "../../../../assets/addFuncs";
import s from "../Info.module.css";

const AddPost = (props) => {
  const [addedImg, setAddedImg] = useState(null);

  const sendPost = () => {
    if (props.submitSucceeded) {
      props.dispatch(reset("post"));
      if (addedImg) setAddedImg(null);
    }
  };

  sendPost();

  return (
    <form className={s.addPost} onSubmit={props.handleSubmit}>
      <Field
        className={s.addPost_post}
        name="text"
        type="text"
        component="textarea"
        placeholder="Write and publish yout post"
        onChange={(e) => {
          autoResize(e, 70);
        }}
      />
      {addedImg && !props.submitSucceeded && (
        <img src={addedImg} className={s.addedImg} alt="added" />
      )}
      <div className={s.addPost_buttons}>
        <div className={s.addPost_btns}>
          <Field
            name="img"
            type="file"
            component={customFileInput}
            accept=".png, .jpg, .jpeg, .webp"
            onChange={(e) => {
              chooseImg(e.target.files[0], setAddedImg);
            }}
            className={s.addPost_img}
          />
          <button className={s.addPost_addImg}>Add image</button>
        </div>
        <button type="submit" className={s.addPost_btn}>
          Publish
        </button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "post" })(AddPost);
