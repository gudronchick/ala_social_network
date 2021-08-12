import React from "react";
import s from "./Info.module.css";

const InfoBG = (props) => {
  const selectFile = (e) => {
    props.sendPhotoThunk(e.target.files[0]);
  };

  return (
    <div className={s.main_bg}>
      <div className={s.main_img}>
        <img
          src={
            props.photos
              ? props.photos.small
                ? props.photos.small
                : props.profilePhoto
              : props.profilePhoto
          }
          alt={"User"}
        />
      </div>
      {+props.userId === 11516 && (
        <label className={s.custom_upload}>
          <input
            onChange={selectFile}
            type="file"
            className={s.choose_inp}
            accept=".jpg, .jpeg, .png"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className={s.choose_btn}
          >
            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
          </svg>
        </label>
      )}
      <div className={s.imgError}>{props.imgError}</div>
    </div>
  );
};

export default InfoBG;
