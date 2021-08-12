import React from "react";
import s from "../Users.module.css";
import { NavLink } from "react-router-dom";

const User = (props) => {
  const sendFollow = (e) => {
    props.isInFollowingAC(true, props.state.id);
    if (!props.state.followed) {
      props.follow(props.state.id);
    } else {
      props.unfollow(props.state.id);
    }
  };

  const imgLoading = (e) => {
    if (props.isFetching) {
      props.changeFlagFetching(false);
    }
  };

  const deleteUser = () => {
    props.deleteUserAC(props.id);
  };

  return (
    <div className={s.user} data-id={props.id}>
      <div className={s.user__main}>
        <div className={s.user__left}>
          <NavLink to={`/page/${props.state.id}`}>
            <img
              className={s.user__img}
              onLoad={imgLoading}
              src={props.state.photos.small || props.profilePhoto}
              alt={"User photo " + props.state.name}
            />
          </NavLink>
          <button
            onClick={sendFollow}
            type="button"
            className={s.user__btn}
            data-isfollow={!props.state.followed}
            disabled={props.isInFollowing.some((id) => id === props.state.id)}
          >
            {props.state.followed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className={s.user__right + " " + s[!props.isFetching && "show"]}>
          <div className={s.user__info}>
            <NavLink to={`/page/${props.state.id}`}>
              <p className={s.user__name}>{props.state.name}</p>
            </NavLink>
            <NavLink to="/messages">
              <div className={s.user__massage}>Write a message</div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={s.user__dots}>
        •••{" "}
        <span className={s.user__notif} onClick={deleteUser}>
          Don't show anymore
        </span>
      </div>
    </div>
  );
};

export default User;
