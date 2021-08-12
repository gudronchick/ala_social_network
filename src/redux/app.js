import { authCheckThunk } from "./auth";

const INITIALIZED = "app/INITIALIZED";
const GET_NAME = "app/GET_NAME";

const initialState = {
  initialized: false,
  pageName: "Page name",
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case GET_NAME:
      return {
        ...state,
        pageName: action.pageName,
      };
    default:
      return state;
  }
};

export const initializedAC = () => {
  return { type: INITIALIZED };
};

export const getNameAC = (pageName) => {
  return { type: GET_NAME, pageName };
};

export const initializedThunk = () => async (dispatch) => {
  await dispatch(authCheckThunk());
  dispatch(initializedAC());
};
