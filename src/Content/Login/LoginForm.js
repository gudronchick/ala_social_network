import React from "react";
import s from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../assets/Input";

let LoginForm = (props) => {
  const fields = props.fields.map((field) => {
    return (
      <label key={field.name} className={s.form__label}>
        <Field
          key={field.name}
          component={Input}
          name={field.name}
          className={!field.isCheckbox ? s.form__field : ""}
          type={field.type}
          placeholder={field.placeholder}
          validate={field.arrOfValidators}
        />
        {field.svg && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={s.field_img}
          >
            {field.svg}
          </svg>
        )}
        <span>{field.label}</span>
      </label>
    );
  });

  return (
    <form
      onSubmit={props.handleSubmit}
      className={s.form}
      name="loginForm"
      noValidate
    >
      {fields}

      {props.error && <div className={s.error}>{props.error}</div>}

      {props.captchaUrl && (
        <img className={s.captcha__img} src={props.captchaUrl} alt="Captcha" />
      )}

      {props.captchaUrl && (
        <Field
          component="input"
          name="captcha"
          type="text"
          placeholder="Enter the text from the picture"
          className={s.captcha__field}
        />
      )}

      <input
        className={s.form__btn}
        type="submit"
        value="Submit"
        name="Submit"
        disabled={props.pristine}
      />
    </form>
  );
};

export default reduxForm({ form: "login" })(LoginForm);
