import React, { useState, useEffect } from "react";
import s from "./Info.module.css";

const ProfileStatusHook = (props) => {
  const [editStatusMode, setEditStatueMode] = useState(false);
  const [status, setStatus] = useState(props.status || "");
  const [checkStatus, setCheckStatus] = useState(props.status);

  useEffect(() => {
    if (props.status) {
      setStatus(props.status);
      setCheckStatus(props.status);
    }
  }, [props.status]);

  const sendStatusFunc = () => {
    if (editStatusMode && status !== checkStatus) {
      props.sendStatusThunk(status);
      setCheckStatus(status);
    }
  };

  const changeStatusMode = (e) => {
    setEditStatueMode(!editStatusMode);
    sendStatusFunc();
  };

  const sendStatus = (e) => {
    if (e.key === "Enter") {
      sendStatusFunc();
      e.target.blur();
    }
  };

  const writeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={s.status_parent}>
      {props.isFetchingStatus && (
        <div className={s.wait}>{status || "Wait..."}</div>
      )}
      {!props.isFetchingStatus && !editStatusMode && (
        <>
          <div
            onClick={(e) => {
              props.userId === 11516 && changeStatusMode(e);
            }}
            className={s.status + " " + props.classAdd}
          >
            {status.trim().length ? props.status || status : "I have no status"}
          </div>
        </>
      )}
      {editStatusMode && (
        <input
          className={s.statusField}
          value={status}
          autoFocus={true}
          onChange={writeStatus}
          onBlur={changeStatusMode}
          onKeyPress={(e) => {
            sendStatus(e);
          }}
        />
      )}
    </div>
  );
};

export default ProfileStatusHook;
