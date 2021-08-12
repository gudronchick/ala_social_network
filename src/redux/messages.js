const ADD_MESSAGE = "messages/ADD-MESSAGE";
const ADD_IMG = "messages/ADD_IMG";

const initialState = {
  messages: [
    { id: 1, message: "sup", time: new Date("November 17, 2020 03:24:00") },
    {
      id: 2,
      message: "My name is Andrey",
      time: new Date("November 20, 2020 20:01:00"),
    },
  ],
};

export const messages = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const objAddPost = {
        id: ++Object.keys(state.messages).length,
        message: action.message,
        time: new Date(),
        messageImg: action.img,
      };
      state.message = "";
      return {
        ...state,
        messages: [...state.messages, objAddPost],
      };
    case ADD_IMG:
      return {
        ...state,
        messageImg: action.img,
      };
    default:
      return state;
  }
};

export const addMessageCreator = (message, img) => {
  return { type: ADD_MESSAGE, message, img };
};

export const addImgAC = (img) => {
  return { type: ADD_IMG, img };
};
