import Messages from "./Messages";
import { connect } from "react-redux";
import authCheck from "../../HOC/authCheck";
import { compose } from "redux";
import { addImgAC, addMessageCreator } from "../../redux/messages";
import { getNameAC } from "../../redux/app";
import {
  getDialogs,
  getMessages,
  getMessageImg,
  getMyDataSelector,
} from "../../selectors/selectors";

const mapStateToProps = (state) => {
  return {
    humanDialogs: getDialogs(state),
    messages: getMessages(state),
    messageImg: getMessageImg(state),
    ...getMyDataSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, { addMessageCreator, getNameAC, addImgAC }),
  authCheck
)(Messages);
