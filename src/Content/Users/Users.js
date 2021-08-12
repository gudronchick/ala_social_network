import React from "react";
import User from "./User/User";
import s from "./Users.module.css";
import Preloader from "./Preloader";
import PaginationCont from "./Pagination/PaginationCont";

const Users = (props) => {
  const createUsers = () => {
    return props.users.map((el, i) => {
      return (
        <User
          key={el.id}
          changeFlagFetching={props.changeFlagFetching}
          isFetching={props.isFetching}
          state={el}
          id={el.id}
          followUser={props.followUser}
          isInFollowingAC={props.isInFollowingAC}
          isInFollowing={props.isInFollowing}
          follow={props.follow}
          unfollow={props.unfollow}
          deleteUserAC={props.deleteUserAC}
          profilePhoto={props.profilePhoto}
        />
      );
    });
  };
  return (
    <div className={s.users}>
      <PaginationCont requestUsers={props.requestUsers} />
      <Preloader isFetching={props.isFetching} padding={true} />
      <div className={s.users__people}>{createUsers()}</div>
    </div>
  );
};

export default Users;
