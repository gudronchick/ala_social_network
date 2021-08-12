import React from "react";
import { Field, reduxForm } from "redux-form";
import EditableContacts from "./EditableContacts";
import s from "./Info.module.css";
import ProfileStatusHook from "./ProfileStatusHook";

const EditablePage = (props) => {
  const submitForm = (values) => {
    props.updateProfileThunk(values);
  };

  return (
    <form onSubmit={props.handleSubmit} className={s.about_form}>
      <div className={s.left_row}>
        <div className={s.info__left}>
          <div className={s.info__left_item}>
            <h4 className={s.status_title}>My Status:</h4>
            <ProfileStatusHook
              sendStatusThunk={props.sendStatusThunk}
              userId={props.userId}
              status={props.status}
              isFetchingStatus={props.isFetchingStatus}
              classAdd={s.edit_status}
            />
          </div>
          {props.profile.aboutMe && (
            <div className={s.info__left_item + " " + s.info__left_item}>
              <h4>About Me:</h4>
              <Field
                component={"textarea"}
                type="text"
                name={"aboutMe"}
                className={s.edit_textarea}
              />
            </div>
          )}
          <div>
            <label className={s.info__left_item + " " + s.info__left_checkbox}>
              <h4 className={s.edit_job_title}>Need A Job:</h4>
              <div className={s.look_job + " " + s.grey}>
                <Field
                  component={"input"}
                  type="checkbox"
                  className={s.edit_checkbox}
                  name={"lookingForAJob"}
                />
              </div>
            </label>
          </div>
          <div className={s.info__left_item}>
            <h4>Job Description:</h4>
            <div className={s.look_job_desc + " " + s.grey}>
              <Field
                component={"textarea"}
                type="text"
                name={"lookingForAJobDescription"}
                className={s.edit_textarea}
              />
            </div>
          </div>
          <EditableContacts
            contacts={props.profile.contacts}
            onSubmit={submitForm}
            editPageMode={props.editPageMode}
          />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({ form: "aboutMe" })(EditablePage);
