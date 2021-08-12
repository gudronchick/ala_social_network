import { addImgAC, addMessageCreator } from "../../../redux/messages";
import SendMessage from "./SendMessage";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { getMessage, getMessageImg } from "../../../selectors/selectors";

const mapStateToProps = (state) => {
  return {
    message: getMessage(state),
    messageImg: getMessageImg(state),
  };
};

export default compose(
  connect(mapStateToProps, { addMessageCreator, addImgAC }),
  reduxForm({ form: "addMessage" })
)(SendMessage);
