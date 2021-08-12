import { connect } from "react-redux";
import { getNameAC } from "../../redux/app";
import { loginThunk } from "../../redux/auth";
import {
  getCaptchaUrl,
  getFields,
  getIsLogged,
} from "../../selectors/selectors";
import Login from "./Login";

const mapStateToProps = (state) => {
  return {
    fields: getFields(state),
    captchaUrl: getCaptchaUrl(state),
    isLogged: getIsLogged(state),
  };
};

export default connect(mapStateToProps, { loginThunk, getNameAC })(Login);
