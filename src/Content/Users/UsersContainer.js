import { connect } from "react-redux";
import {
  changeFlagIsFollowCreator,
  isInFollowingAC,
  setUsersCreator,
  toggleIsFetchingFlag,
  getUsersThunk,
  follow,
  unfollow,
  deleteUserAC,
} from "../../redux/users";
import React, { useEffect } from "react";
import Users from "./Users";
import {
  getActiveItem,
  getIsFetching,
  getIsInFollowing,
  getPageCount,
  getProfilePhoto,
  getUserCount,
  getUsers,
  getUsersCountOnThePage,
} from "../../selectors/selectors";
import { getNameAC } from "../../redux/app";

const UsersHook = ({ getNameAC, changeFlagFetching, ...props }) => {
  useEffect(() => {
    changeFlagFetching(true);
    getNameAC("Users page");
  }, [getNameAC, changeFlagFetching]);

  const requestUsers = (id) => {
    changeFlagFetching(true);
    props.receiveUsers([]);
    props.getUsersThunk(id, props.usersCountOnThePage);
  };

  return <Users {...props} requestUsers={requestUsers} />;
};

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    usersCountOnThePage: getUsersCountOnThePage(state),
    pageCount: getPageCount(state),
    userCount: getUserCount(state),
    activeItem: getActiveItem(state),
    isFetching: getIsFetching(state),
    isInFollowing: getIsInFollowing(state),
    profilePhoto: getProfilePhoto(state),
  };
};

const UsersContainer = connect(mapStateToProps, {
  followUser: changeFlagIsFollowCreator,
  receiveUsers: setUsersCreator,
  changeFlagFetching: toggleIsFetchingFlag,
  isInFollowingAC,
  getUsersThunk,
  follow,
  unfollow,
  getNameAC,
  deleteUserAC,
})(UsersHook);

export default UsersContainer;
