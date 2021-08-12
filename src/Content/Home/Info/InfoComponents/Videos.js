import React from "react";
import s from "./InfoComponents.module.css";

const Videos = (props) => {
  const videos = props.videos.map((video) => {
    return (
      <div className={s.videos_item} key={video.id}>
        <h3 className={s.videos_name}>{video.name}</h3>
        <video
          className={s.videos_video}
          controls="controls"
          poster={video.cover}
          type="video/mp4"
        >
          <source src={video.video} />
          It doesn't support in your browser
        </video>
      </div>
    );
  });

  return <div className={s.videos}>{videos}</div>;
};

export default Videos;
