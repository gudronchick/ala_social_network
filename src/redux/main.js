import { stopSubmit } from "redux-form";
import {
  getRequest,
  getStatus,
  sendPhoto,
  sendStatus,
  updateProfile,
} from "../api/api";
import music from "../assets/musicArray";
import postsArray from "../assets/postsArray";
import videos from "../assets/videosArray";
import photos from "../assets/photosArray";
import rightPosts from "../assets/rightPosts";
import favPages from "../assets/favPages";
import profilePhoto from "../assets/img/profilePhoto.png";

const GET_PROFILE_DATA = "main/GET_PROFILE_DATA";
const GET_STATUS = "main/GET_STATUS";
const CHANGE_STATUS_FLAG = "main/CHANGE_STATUS_FLAG";
const SET_PHOTO = "main/SET_PHOTO";
const IMG_ERROR = "main/IMG_ERROR";
const MAIN_FLAG_IS_FETCHING = "main/MAIN_FLAG_IS_FETCHING";
const GET_MY_DATA = "main/GET_MY_DATA";
const CHANGE_MY_LIKE = "main/CHANGE_MY_LIKE";
const DELETE_POST = "main/DELETE_POST";
const ADD_COMMENT = "main/ADD_COMMENT";
const IS_EDITABLE_PAGE = "main/IS_EDITABLE_PAGE";
const ADD_POST = "main/ADD_POST";

const initialState = {
  mainPageText: "Post",
  profile: {},
  userId: 2,
  status: "",
  isFetchingStatus: false,
  mainFlagIsFetching: 0,
  myData: null,
  music,
  videos,
  posts: postsArray,
  rightPhotos: photos,
  rightPosts,
  favPages,
  isEditablePage: false,
  profilePhoto,
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return {
        ...state,
        profile: action.profile,
      };
    case GET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case CHANGE_STATUS_FLAG:
      return {
        ...state,
        isFetchingStatus: action.isFetchingStatus,
      };
    case SET_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        },
      };
    case IMG_ERROR:
      return {
        ...state,
        imgError: action.error,
      };
    case MAIN_FLAG_IS_FETCHING:
      return {
        ...state,
        mainFlagIsFetching: action.mainFlagIsFetching,
      };
    case GET_MY_DATA:
      return {
        ...state,
        myData: action.myData,
        myStatus: action.myStatus,
      };
    case CHANGE_MY_LIKE:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.idPost) {
              post.myLike = action.isLiked;
              post.likesCount = action.isLiked
                ? ++post.likesCount
                : --post.likesCount;
            }
            return post;
          }),
        ],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.postId)],
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.commentId) {
              post.commentsCount++;
            }
            return post;
          }),
        ],
      };
    case IS_EDITABLE_PAGE:
      return {
        ...state,
        isEditablePage: action.isEditablePage,
      };
    case ADD_POST:
      action.post.id = ++Object.keys(state.posts).length;
      return {
        ...state,
        posts: [action.post, ...state.posts].sort((a, b) => {
          return +b.isAttached - +a.isAttached;
        }),
      };
    default:
      return state;
  }
};

export const addPost = (post) => {
  return { type: ADD_POST, post };
};

export const editPageMode = (isEditablePage) => {
  return { type: IS_EDITABLE_PAGE, isEditablePage };
};

export const addComment = (commentId) => {
  return { type: ADD_COMMENT, commentId };
};

export const deletePost = (postId) => {
  return { type: DELETE_POST, postId };
};

export const changeMyLike = (isLiked, idPost) => {
  return {
    type: CHANGE_MY_LIKE,
    isLiked,
    idPost,
  };
};

export const changeMainFlasIsFetching = (mainFlagIsFetching) => {
  return { type: MAIN_FLAG_IS_FETCHING, mainFlagIsFetching };
};

export const getStatusAC = (status) => {
  return { type: GET_STATUS, status };
};

export const getProfileData = (profile) => {
  return { type: GET_PROFILE_DATA, profile };
};

export const getMyData = (myData, myStatus) => {
  return { type: GET_MY_DATA, myData, myStatus };
};

export const changeStatusFlag = (isFetchingStatus) => {
  return { type: CHANGE_STATUS_FLAG, isFetchingStatus };
};

export const setMainPhoto = (photos) => {
  return {
    type: SET_PHOTO,
    photos,
  };
};

export const addErrorIfImgWrong = (error) => {
  return {
    type: IMG_ERROR,
    error,
  };
};

export const getUserThunk =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    const response = await getRequest("profile/" + pageNumber);
    if (!getState().main.myData) {
      dispatch(getMyData(response.data));
    }
    dispatch(getProfileData(response.data));
    dispatch(changeMainFlasIsFetching(++getState().main.mainFlagIsFetching));
  };

export const getStatusThunk = (userId) => async (dispatch, getState) => {
  dispatch(changeStatusFlag(true));
  const response = await getStatus(userId);
  dispatch(changeStatusFlag(false));
  dispatch(getStatusAC(response.data || " "));
  dispatch(changeMainFlasIsFetching(++getState().main.mainFlagIsFetching));
};

export const sendStatusThunk = (status) => async (dispatch) => {
  dispatch(changeStatusFlag(true));
  const response = await sendStatus(status);
  if (!response.resultCode) {
    dispatch(changeStatusFlag(false));
    dispatch(getStatusAC(status.statusText));
  }
};

export const sendPhotoThunk = (file) => {
  return async (dispatch) => {
    const response = await sendPhoto(file);
    if (!response.data.resultCode) {
      dispatch(setMainPhoto(response.data.data.photos));
      dispatch(getMyDataThunk());
      dispatch(addErrorIfImgWrong(null));
    } else {
      dispatch(addErrorIfImgWrong(response.data.messages[0]));
    }
  };
};

export const updateProfileThunk = (profile) => {
  return async (dispatch, getState) => {
    const response = await updateProfile(profile);
    if (!response.data.resultCode) {
      dispatch(getUserThunk(getState().auth.id)).then(() => {
        dispatch(changeMainFlasIsFetching(2));
      });
    } else {
      let arrOfContactsWithErr = {};
      response.data.messages.forEach((item) => {
        let contactWithErr = item.match(/(?<=->)\w*/gi)[0];
        contactWithErr =
          contactWithErr[0].toLowerCase() + contactWithErr.slice(1);
        arrOfContactsWithErr[contactWithErr] = "Incorrect value";
      });
      dispatch(stopSubmit("aboutMe", { contacts: arrOfContactsWithErr }));
      return Promise.reject("Inccorect value");
    }
  };
};

export const getMyDataThunk = () => async (dispatch) => {
  const [profile, status] = await Promise.all([
    getRequest("profile/11516"),
    getStatus("11516"),
  ]);
  dispatch(getMyData(profile.data, status.data));
};
