import React from "react";
import { NavLink } from "react-router-dom";
import s from "../Info.module.css";

const Video = (props) => {
  const videos = props.videos.map((video) => {
    return (
      <li className={s.video_item} title={video.name} key={video.id}>
        <img className={s.video_img} src={video.cover} alt={video.id} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="white"
          className={s.video_svg}
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
        </svg>
        <p className={s.video_name}>{video.name}</p>
      </li>
    );
  });

  return (
    <NavLink to="/page/videos">
      <div className={s.info_block}>
        <div className={s.main_left_title}>
          <div className={s.container}>
            <h3 className={s.title_row}>
              Last Videos <span className={s.dots}>•••</span>
            </h3>
          </div>
        </div>
        <div className={s.container}>
          <ul className={s.video_list}>{videos}</ul>
        </div>
      </div>
    </NavLink>
  );
};

export default Video;
