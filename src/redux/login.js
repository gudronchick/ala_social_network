import React from "react";
import {
  minSymbols,
  required,
  validateEmail,
} from "../utilits/validators/validators";

const minCharsFunc = minSymbols(8);

const initialState = {
  fields: [
    {
      name: "name",
      type: "text",
      placeholder: "Your name*",
      isCheckbox: false,
      svg: (
        <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
      ),
      arrOfValidators: [required],
    },
    {
      name: "password",
      type: "password",
      placeholder: "Your password*",
      isCheckbox: false,
      svg: (
        <path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-5l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" />
      ),
      arrOfValidators: [required, minCharsFunc],
    },
    {
      name: "email",
      type: "email",
      placeholder: "Your email*",
      isCheckbox: false,
      svg: (
        <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
      ),
      arrOfValidators: [required, validateEmail],
    },
    {
      name: "rememberMe",
      type: "checkbox",
      label: " Remember me",
      isCheckbox: true,
      arrOfValidators: [],
    },
  ],
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
