import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getNameAC } from "../../redux/app";
import s from "./Settings.module.css";
import authCheck from "../../HOC/authCheck";
import { Field, reduxForm } from "redux-form";
import Setting from "./Setting";

const Settings = ({ getNameAC, ...props }) => {
  const [geoDataMode, geoDataModeSet] = useState(false);
  useEffect(() => {
    getNameAC("Settings");
  }, [getNameAC]);

  return (
    <div className={s.settings}>
      <div className={s.settings_wrap}>
        <h1 className={s.title}>Main Account Settings</h1>
        <div className={s.main_setting}>
          <Setting text="Name" name="fullName" value="Andrey Kislov" />
          <Setting text="Main Address" name="address" value="Kiev" />
          <Setting
            text="Account Contacts"
            name="number"
            value="+380-9792-373-92"
          />
          <div
            className={s.setting_item}
            onClick={() => {
              geoDataModeSet(!geoDataMode);
            }}
          >
            <h3 className={s.name}>Show Your Geodata?</h3>
            <p className={s.name_value}>
              <Field
                name="check"
                component="input"
                type="checkbox"
                checked={geoDataMode}
                className={s.name_value}
              />
              {" " + (geoDataMode ? "Yes" : "No")}
            </p>
            <span className={s.change}>Change</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.main.myData,
  };
};

export default compose(
  connect(mapStateToProps, { getNameAC }),
  authCheck,
  reduxForm({ form: "Settings" })
)(Settings);
