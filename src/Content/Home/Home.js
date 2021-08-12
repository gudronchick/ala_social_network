import React from "react";
import s from "./Home.module.css";
import bgImg from "../../assets/img/main_bg.jpg";
import InfoBG from "./Info/InfoBackground";
import Buttons from "./Buttons";
import { NavLink } from "react-router-dom";
import InfoContainer from "./Info/InfoContainer";
import { useState } from "react";
import Preloader from "../Users/Preloader";

const Home = (props) => {
  let id = props.match.params.pageNumber || "";
  id = +id ? id + "/" : "";
  const [activeMode, activeModeSet] = useState(false);

  const toggleMenu = (e) => {
    if (window.innerWidth <= 700) {
      if (
        e.target.tagName === "A" ||
        e.target.classList.contains(s.list_menu)
      ) {
        activeModeSet(!activeMode);
      }
    }
  };

  return (
    <div className={s.home}>
      <Preloader
        isFetching={
          !(!(props.mainFlagIsFetching % 2) && props.mainFlagIsFetching)
        }
      />
      <div className={s.top}>
        <div className={s.image_bg}>
          <img src={bgImg} alt="Background" />
        </div>
        <InfoBG
          userId={props.profile.userId}
          photos={props.photos}
          imgError={props.imgError}
          sendPhotoThunk={props.sendPhotoThunk}
          profilePhoto={props.profilePhoto}
        />
        <Buttons
          editPageMode={props.editPageMode}
          userId={props.userId}
          isEditablePage={props.isEditablePage}
          profileId={props.profile.userId}
        />
        <nav className={s.menu}>
          <ul className={s.menu_list} onClick={toggleMenu}>
            <li className={s.list_item + " " + s.list_menu}>
              Menu {activeMode ? "↑" : "↓"}
            </li>
            <li
              className={s.list_item + " " + (activeMode ? s.list_active : "")}
            >
              <NavLink
                activeStyle={{ color: "black" }}
                to={`/page/${id}about`}
                className={s.list_link}
              >
                About
              </NavLink>
            </li>
            <li
              className={s.list_item + " " + (activeMode ? s.list_active : "")}
            >
              <NavLink
                to={`/page/${id}posts`}
                activeStyle={{ color: "black" }}
                className={s.list_link}
              >
                Posts
              </NavLink>
            </li>
            <li className={s.list_item + " " + s.list_name}>
              <div className={s.list_link + " " + s.list_desc}>
                <p className={s.link_name}>
                  {props.profile ? props.profile.fullName : ""}
                </p>
              </div>
            </li>
            <li
              className={s.list_item + " " + (activeMode ? s.list_active : "")}
            >
              <NavLink
                to={`/page/${id}photos`}
                activeStyle={{ color: "black" }}
                className={s.list_link}
              >
                Photos
              </NavLink>
            </li>
            <li
              className={s.list_item + " " + (activeMode ? s.list_active : "")}
            >
              <NavLink
                to={`/page/${id}videos`}
                activeStyle={{ color: "black" }}
                className={s.list_link}
              >
                Videos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <InfoContainer />
      </div>
    </div>
  );
};

export default Home;
