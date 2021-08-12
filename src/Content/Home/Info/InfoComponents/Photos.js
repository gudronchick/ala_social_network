import React from "react";
import s from "./InfoComponents.module.css";

const Photos = (props) => {
  const photos = props.photos.map((photo) => {
    if (!photo.img) return "";
    return (
      <div key={photo.id} className={s.photos__item}>
        <img src={photo.img} alt={"Img " + photo.id} />
      </div>
    );
  });

  return <div className={s.photos}>{photos}</div>;
};

export default Photos;
