import React from "react";
import s from "../Info.module.css";

const Music = (props) => {
  const musicItems = props.music
    .filter((i) => i.id <= 5)
    .map((item) => (
      <li key={item.name} className={s.music_item}>
        <div className={s.music_row}>
          <span className={s.music_id}>{item.id}</span>
          <img src={item.img} alt={item.name} className={s.music_img} />
          <div className={s.music_authors}>
            <div className={s.music_name}>{item.name}</div>
            <div className={s.music_author}>{item.author}</div>
          </div>
        </div>
        <div className={s.music_time}>{item.time || ""}</div>
        <span className={s.music_title}>{item.name}</span>
      </li>
    ));

  return (
    <div className={s.info_block}>
      <div className={s.main_left_title}>
        <div className={s.container}>
          <h3 className={s.title_row}>
            My Spotify Playlist <span className={s.dots}>•••</span>
          </h3>
        </div>
      </div>
      <ul className={s.music_list}>{musicItems}</ul>
    </div>
  );
};

export default Music;
