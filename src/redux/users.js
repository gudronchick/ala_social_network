import { followUser, getUsers, unfollowUser } from "../api/api";
import { followOrUnfollow } from "../utilits/validators/helper-funks";

const changeFlagIsFollow = "users/CHANGE_FLAG_IS_FOLLOW";
const setUsers = "users/SET_USERS";
const toggleFlagIsFetching = "users/TOGGLE_FLAG_FETCHING";
const followingInProgress = "users/FOLLOWING_IN_PROGGRESS";
const GETTOTALUSERCOUNT = "users/GETTOTALUSERCOUNT";
const DELETE_USER = "users/DELETE_USER";

const initialState = {
  users: [],
  pageCount: null,
  usersCountOnThePage: 5,
  userCount: null,
  isFetching: false,
  isInFollowing: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case changeFlagIsFollow:
      return {
        ...state,
        users: [
          ...state.users.map((el, i) => {
            if (el.id === action.id) {
              el.followed = !el.followed;
            }
            return el;
          }),
        ],
      };
    case setUsers:
      return {
        ...state,
        users: action.users,
      };
    case toggleFlagIsFetching:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case followingInProgress:
      return {
        ...state,
        isInFollowing: action.isFollowing
          ? [...state.isInFollowing, +action.userId]
          : state.isInFollowing.filter((id) => id !== +action.userId),
      };
    case GETTOTALUSERCOUNT:
      return {
        ...state,
        userCount: action.userCount,
        pageCount: Math.ceil(action.userCount / state.usersCountOnThePage),
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((el) => el.id !== action.deleteId)],
      };
    default:
      return state;
  }
};

export const deleteUserAC = (deleteId) => {
  return { type: DELETE_USER, deleteId };
};

export const changeFlagIsFollowCreator = (id) => {
  return {
    type: changeFlagIsFollow,
    id,
  };
};

export const setUsersCreator = (users) => {
  return {
    type: setUsers,
    users: users,
  };
};

export const getTotalUsersCount = (userCount) => {
  return { type: GETTOTALUSERCOUNT, userCount };
};

export const toggleIsFetchingFlag = (isFetching) => {
  return {
    type: toggleFlagIsFetching,
    isFetching,
  };
};

export const isInFollowingAC = (isFollowing, userId) => {
  return {
    type: followingInProgress,
    isFollowing,
    userId,
  };
};

export const follow = (id) => async (dispatch) => {
  followOrUnfollow(await followUser(id), dispatch, id, {
    changeFlagIsFollowCreator,
    isInFollowingAC,
  });
};

export const unfollow = (id) => async (dispatch) => {
  followOrUnfollow(await unfollowUser(id), dispatch, id, {
    changeFlagIsFollowCreator,
    isInFollowingAC,
  });
};

export const getUsersThunk = (activeItem, usersCountOnThePage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingFlag(true));
    const response = await getUsers(activeItem, usersCountOnThePage);
    dispatch(getTotalUsersCount(response.totalCount));
    dispatch(toggleIsFetchingFlag(false));
    dispatch(setUsersCreator(response.items));
  };
};
