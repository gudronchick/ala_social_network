import { stopSubmit } from "redux-form";
import { getRequest, login, logout, sendCaptcha } from "../api/api";

const GET_AUTH_DATA = "auth/GET_AUTH_DATA";
const GET_CAPTCHA_URL = "auth/GET_CAPTCHA_URL";

const initialState = {
  login: null,
  id: null,
  email: null,
  captchaUrl: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_DATA:
      return {
        ...state,
        ...action.authData,
        isLogged: action.data.isLogged,
        login: action.data.login,
        email: action.data.email,
        id: action.data.id,
      };
    case GET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

export const getAuthData = (login, email, id, isLogged) => {
  return {
    type: GET_AUTH_DATA,
    data: { login, email, id, isLogged },
  };
};

export const captchaAC = (captchaUrl) => {
  return { type: GET_CAPTCHA_URL, captchaUrl };
};

export const authCheckThunk = () => async (dispatch) => {
  const response = await getRequest("auth/me");
  if (!response.data.resultCode) {
    let data = response.data.data;
    dispatch(getAuthData(data.login, data.email, data.id, true));
  }
};

export const loginThunk = (
  email,
  password,
  rememberMe = false,
  captcha = null
) => {
  return async (dispatch) => {
    const response = await login(email, password, rememberMe, captcha);
    if (!response.data.resultCode) {
      dispatch(authCheckThunk());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(captchaThunk());
      }
      let error = response
        ? response.data.messages[0] || "Some error"
        : "Some error";
      dispatch(stopSubmit("login", { _error: error }));
    }
  };
};

export const logoutThunk = () => async (dispatch) => {
  const response = await logout();
  if (!response.data.resultCode) {
    dispatch(getAuthData(null, null, null, false));
  }
};

export const captchaThunk = () => async (dispatch) => {
  const response = await sendCaptcha();
  if (!response.data.resultCode) {
    dispatch(captchaAC(response.data.url));
  }
};
