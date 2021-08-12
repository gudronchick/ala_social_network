import React, { useEffect } from "react";
import Contacts from "../Main/Contacts";
import EditablePage from "../EditablePage";
import s from "../Info.module.css";
import Music from "../Main/Music";
import Posts from "../Posts/Posts";
import ProfileStatusHook from "../ProfileStatusHook";
import Video from "../Main/Video";
import RightBlock from "../Main/RightBlock";

const About = ({ editPageMode, ...props }) => {
  useEffect(() => {
    return () => {
      editPageMode(false);
    };
  }, [editPageMode]);

  const submitForm = (values) => {
    props
      .updateProfileThunk(values)
      .then(() => {
        editPageMode(false);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className={s.info}>
      <div className={s.info_container}>
        <div className={s.info_block + " " + s.info_left}>
          <div className={s.main_left_title}>
            <div className={s.container}>
              <h3 className={s.title_row}>
                Profile Intro <span className={s.dots}>•••</span>
              </h3>
            </div>
          </div>
          <div className={s.container}>
            {!props.isEditablePage ? (
              <div className={s.left_row}>
                <div className={s.info__left}>
                  <div className={s.info__left_item}>
                    <h4 className={s.status_title}>My Status:</h4>
                    <ProfileStatusHook
                      sendStatusThunk={props.sendStatusThunk}
                      userId={props.userId}
                      status={props.status}
                      isFetchingStatus={props.isFetchingStatus}
                    />
                  </div>
                  {props.profile.aboutMe && (
                    <div className={s.info__left_item}>
                      <h4>About Me:*</h4>
                      <div className={s.about_me + " " + s.grey}>
                        {props.profile.aboutMe}
                      </div>
                    </div>
                  )}
                  <div className={s.info__left_item + " " + s.grey}>
                    <h4>About Job:*</h4>
                    <div className={s.look_job + " " + s.grey}>
                      {props.profile.lookingForAJob
                        ? "I am looking for a job"
                        : "I have a job"}
                    </div>
                  </div>
                  <div className={s.info__left_item}>
                    {props.profile.lookingForAJob &&
                      props.profile.lookingForAJobDescription && (
                        <>
                          <h4>Job Description:*</h4>
                          <div className={s.look_job_desc + " " + s.grey}>
                            {props.profile.lookingForAJobDescription}
                          </div>
                        </>
                      )}
                  </div>
                  <Contacts {...props.profile.contacts} />
                </div>
              </div>
            ) : (
              <EditablePage
                profile={props.profile}
                sendStatusThunk={props.sendStatusThunk}
                userId={props.userId}
                status={props.status}
                isFetchingStatus={props.isFetchingStatus}
                updateProfileThunk={props.updateProfileThunk}
                editPageMode={editPageMode}
                initialValues={props.profile}
                onSubmit={submitForm}
              />
            )}
          </div>
        </div>
        <Music music={props.music} />
        <Video videos={props.videos} />
      </div>
      <Posts
        posts={props.posts}
        photo={props.profile.photos ? props.profile.photos.small : ""}
        name={props.profile.fullName}
        changeMyLike={props.changeMyLike}
        deletePost={props.deletePost}
        userId={props.userId}
        addComment={props.addComment}
        addPost={props.addPost}
      />
      <RightBlock
        photos={props.photos}
        rightPosts={props.rightPosts}
        favPages={props.favPages}
      />
    </div>
  );
};

export default About;
