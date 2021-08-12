import { connect } from "react-redux";
import { getAuthData, authCheckThunk, logoutThunk } from "../redux/auth";
import { getMyData } from "../redux/main";
import {
  getMyDataSelector,
  getIsLogged,
  getLogin,
  getPageName,
  getStatus,
  getMyStatus,
} from "../selectors/selectors";
import Header from "./Header";

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
    login: getLogin(state),
    pageName: getPageName(state),
    status: getStatus(state),
    myStatus: getMyStatus(state),
    ...getMyDataSelector(state),
  };
};

export default connect(mapStateToProps, {
  getAuthData,
  authCheckThunk,
  logoutThunk,
  getMyData,
})(Header);
