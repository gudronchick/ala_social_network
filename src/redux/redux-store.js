import { createStore, combineReducers, applyMiddleware } from "redux";
import { messages } from "./messages";
import { main } from "./main";
import { users } from "./users";
import { auth } from "./auth";
import thunkMiddleware from "redux-thunk";
import { login } from "./login";
import { reducer as formReducer } from "redux-form";
import { app } from "./app";

const reducers = combineReducers({
  messages,
  main,
  users,
  auth,
  login,
  form: formReducer,
  app,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
