import React from "react";
import s from "./InfoComponents.module.css";
import { getPublishDate } from "../../../../assets/addFuncs";

const RightPosts = (props) => {
  const posts = props.rightPosts.map((post) => {
    return (
      <div className={s.posts_item} key={post.id}>
        <h3 className={s.posts_title}>{post.title}</h3>
        <span className={s.posts_date}>
          Published {getPublishDate(post.date)} ago
        </span>
        <p className={s.posts_text}>{post.text}</p>
      </div>
    );
  });

  return <div className={s.posts}>{posts}</div>;
};

export default RightPosts;
