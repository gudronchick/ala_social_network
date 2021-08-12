import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  const logoutFunc = async () => {
    await props.logoutThunk();
    props.getMyData({});
  };

  const text = props.isLogged ? "" : "You have to log in";
  return (
    <nav className={s.menu}>
      <div className={s.logo}></div>
      <div className={s.pageName}>{props.pageName}</div>
      <div className={s.wish}>
        {!props.isLogged && (
          <NavLink to="/login" className={s.header_link}>
            {text}
          </NavLink>
        )}
        {props.isLogged && (
          <button onClick={logoutFunc} className={s.header_logout}>
            Log out
          </button>
        )}
      </div>
      <NavLink className={s.find} to="/users">
        Find friends
      </NavLink>
      <ul className={s.links}>
        <li className={s.link}>
          <NavLink to="/messages">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className={s.svgImg}
            >
              <path d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55l-5.992-4.57h11.983l-5.991 4.57zm0 1.288l-6-4.629v6.771h12v-6.771l-6 4.629z" />
            </svg>
          </NavLink>
        </li>
        <li className={s.link}>
          <div className={s.message}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className={s.svgImg}
            >
              <path d="M8 24l2.674-9h-9.674l16-15-2.674 9h8.674l-15 15zm-1.586-11h6.912l-1.326 4 5.739-6h-6.065l1.304-4-6.564 6z" />
            </svg>
            <span className={s.messagesAmount}>
              {props.messagesAmount || "0"}
            </span>
          </div>
        </li>
      </ul>
      {props.fullName && props.isLogged ? (
        <NavLink to="/page" className={s.me}>
          <img
            alt={props.fullName}
            className={s.me_left}
            src={props.photos ? props.photos.small : ""}
          />
          <div className={s.me_right}>
            <div className={s.fullName}>{props.fullName}</div>
            <div className={s.aboutMe} title={props.myStatus}>
              {props.myStatus}
            </div>
          </div>
        </NavLink>
      ) : (
        <div className={s.unknown}>Unknown User</div>
      )}
    </nav>
  );
};

export default Header;
