import React, { useEffect } from "react";
import s from "./Login.module.css";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router-dom";

const Login = ({ getNameAC, ...props }) => {
  useEffect(() => {
    getNameAC("Login Page");
  }, [getNameAC]);

  const subm = (values) => {
    props.loginThunk(
      values.email,
      values.password,
      values.rememberMe,
      values.captcha
    );
  };

  if (props.isLogged) {
    return <Redirect to="/page" />;
  }

  return (
    <>
      <div className={s.form_wrapper}>
        <div className={s.form_cont}>
          <div className={s.head_img}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
            </svg>
          </div>
          <h1 className={s.title}>Log In</h1>
          <LoginForm
            captchaUrl={props.captchaUrl}
            fields={props.fields}
            onSubmit={subm}
          />
        </div>
      </div>
      <div className={s.login_modal}>
        <div>
          <h4>E-mail: </h4> <span>andrew.kislov02@gmail.com</span>
        </div>
        <div>
          <h4>Name: </h4> <span>Андрей</span>
        </div>
        <div>
          <h4>Password: </h4> <span>12345678a</span>
        </div>
      </div>
    </>
  );
};

export default Login;
