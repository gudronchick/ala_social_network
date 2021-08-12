import React, { useState } from "react";
import ReactDOM from "react-dom";
import s from "../Info.module.css";
import { NavLink } from "react-router-dom";
import IconsForPost from "./IconsForPost";
import profilePhoto from "../../../../assets/img/profilePhoto.png";
import AddPost from "./AddPost";
import { chooseImg, getPublishDate } from "../../../../assets/addFuncs";
import Comment from "./Comment";

const Posts = (props) => {
  const isMyPage = props.userId === 11516 ? true : false;
  const [postId, setPostId] = useState();
  const [commentIsOpenMode, setCommentIsOpenMode] = useState(false);
  const [commentIsLeftMode, setCommentIsLeftMode] = useState(false);
  const [commentId, setComemntId] = useState(null);
  const [repostedId, setRepostedId] = useState([]);

  if (!props.posts.length) {
    return <h3 className={s.no_posts}>{props.name} has no publications</h3>;
  }
  const likesClick = (myLike, id) => {
    props.changeMyLike(!myLike, id);
  };

  // Modal

  const htmlElem = document.querySelector("html");
  const modal = React.createRef();

  const openModal = (id) => {
    modal.current.style.transform = `translateY(${window.pageYOffset}px)`;
    modal.current.classList.remove(s.modal_post);
    htmlElem.classList.add("hidden");
    setPostId(id);
  };

  const deletePost = () => {
    props.deletePost(postId);
  };

  const closeModal = (e) => {
    if (
      e.target.classList.contains(s.modal_body) ||
      e.target.classList.contains(s.modal_warn)
    ) {
      return;
    }
    htmlElem.classList.remove("hidden");
    modal.current.classList.add(s.modal_post);
  };

  // Comments

  const switchComment = (id) => {
    let postId = id;
    if (id === commentIsOpenMode) postId = null;
    setCommentIsOpenMode(postId);
  };

  const receiveComment = (values) => {
    if (values.textarea) {
      switchComment(null);
      props.addComment(commentId);
      setTimeout(() => {
        setCommentIsLeftMode(null);
      }, 1000);
    } else {
      setCommentIsLeftMode(null);
    }
  };

  // Repost

  const makeRepost = (id) => {
    if (!repostedId.includes(id)) {
      setRepostedId([...repostedId, id]);
    }
  };

  // Add posts

  const addNewPost = (values) => {
    if (values.img || values.text) {
      const data = {
        isShared: false,
        sharedType: null,
        myLike: null,
        likesCount: 0,
        lastNames: [],
        commentsCount: 0,
        repostsCount: 0,
        isAttached: false,
        publicationTime: new Date(),
        text: values.text,
        img: null,
      };
      if (values.img) {
        data.img = chooseImg(values.img[0]);
        if (!values.img.length) {
          data.img = null;
          if (!values.text) return;
        }
      }
      props.addPost(data);
    }
  };

  const posts = props.posts.map((post) => {
    let revealNames = "";
    post.lastNames.forEach((name, i) => {
      revealNames += name.match(/\w+(?=\s)/gi)[0] + (i === 0 ? ", " : " ");
    });

    const checkRepost = repostedId.includes(post.id);

    return (
      <li className={s.info_block} key={post.id}>
        <IconsForPost
          isAttached={post.isAttached}
          myLike={post.myLike}
          changeMyLike={props.changeMyLike}
          id={post.id}
          setCommentIsOpenMode={setCommentIsOpenMode}
          commentIsOpenMode={commentIsOpenMode}
        />
        <div className={s.container}>
          <div className={s.title_row}>
            <div className={s.publisher_head}>
              <img
                src={props.photo || profilePhoto}
                className={s.post_avatar}
                alt="Publisher"
              />
              <div className={s.post_info}>
                <span className={s.post_name}>
                  {props.name}{" "}
                  {post.isShared && (
                    <>
                      <span className={s.grey_high}>shared </span>
                      <NavLink
                        className={s.orange_high}
                        to={`/page/${post.sharedId}`}
                      >
                        {post.sharedType}
                      </NavLink>
                      <span className={s.grey_high}>
                        's {post.sharedPost === "photo" ? "photo" : "post"}
                      </span>
                    </>
                  )}
                </span>
                <span className={s.publish_time}>
                  {getPublishDate(post.publicationTime) + " ago"}
                </span>
              </div>
            </div>
            <span
              className={s.dots + " " + (isMyPage && s.delete_dots)}
              onClick={() => {
                if (isMyPage) {
                  openModal(post.id);
                }
              }}
            >
              •••
            </span>
          </div>
          <div className={s.publisher_body}>
            <p>{post.text}</p>
            {post.img && (
              <div className={s.post_img_cont}>
                <img src={post.img} className={s.post_img} alt="Girl" />
              </div>
            )}
          </div>
          <div className={s.publisher_footer}>
            <div className={s.publisher_left}>
              <span
                className={s.likes + " " + (post.myLike ? s.svg_like : "")}
                onClick={() => {
                  likesClick(post.myLike, post.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
                </svg>
                <span className={s.likes_count}>{post.likesCount}</span>
              </span>
              <span className={s.like_names}>
                <span className={s.reveal_names}>{revealNames}</span>
                {post.likesCount > 2 ? (
                  <>
                    and <br />
                    {post.likesCount - 2} more liked it
                  </>
                ) : (
                  "liked it"
                )}
              </span>
            </div>
            <div className={s.publisher_right}>
              <span
                className={s.comments}
                onClick={() => {
                  switchComment(post.id);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75" />
                </svg>
                <span className={s.comments_count}>{post.commentsCount}</span>
              </span>
              <span
                className={s.reposts}
                onClick={() => {
                  if (!isMyPage) {
                    makeRepost(post.id);
                  }
                }}
              >
                {props.userId !== 11516 && (
                  <span className={s.repost}>
                    {checkRepost ? "You reposted it" : "Repost"}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={(checkRepost && s.repost_svg) || ""}
                >
                  <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
                </svg>
                <span className={s.reposts_count}>{post.repostsCount}</span>
              </span>
            </div>
          </div>
        </div>
        {commentIsOpenMode === post.id && (
          <div className={s.publisher_comment}>
            <div className={s.container}>
              <Comment
                switchComment={switchComment}
                onSubmit={receiveComment}
                id={post.id}
                setCommentIsLeftMode={setCommentIsLeftMode}
                addComment={props.addComment}
                setComemntId={setComemntId}
              />
            </div>
          </div>
        )}
        {commentIsLeftMode === post.id && !commentIsOpenMode && (
          <div className={s.comment_left}>You left the comment</div>
        )}
      </li>
    );
  });

  return (
    <div className={s.middle}>
      {props.userId === 11516 && <AddPost onSubmit={addNewPost} />}
      <div className={s.posts}>
        <ul className={s.posts}>{posts}</ul>
      </div>
      {ReactDOM.createPortal(
        <div
          className={s.modal_post + " " + s.modal}
          ref={modal}
          onClick={closeModal}
        >
          <div className={s.modal_body}>
            <p className={s.modal_warn}>You sure?</p>
            <button className={s.post_btn + " " + s.post_cancel}>Cancel</button>
            <button
              className={s.post_btn + " " + s.post_agree}
              onClick={deletePost}
            >
              Sure
            </button>
          </div>
        </div>,
        document.querySelector("body")
      )}
    </div>
  );
};

export default Posts;
