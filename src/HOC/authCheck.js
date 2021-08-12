import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsLogged } from "../selectors/selectors";

const authCheck = (Component) => {
  const authCheckContainer = (props) => {
    if (!props.isLogged) return <Redirect to="/login" />;
    return <Component {...props} />;
  };

  const mapStateToProps = (state) => {
    return {
      isLogged: getIsLogged(state),
    };
  };

  return connect(mapStateToProps, {})(authCheckContainer);
};

export default authCheck;
