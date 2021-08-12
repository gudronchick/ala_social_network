import Info from "./Info";
import { connect } from "react-redux";
import authCheck from "../../../HOC/authCheck";
import { compose } from "redux";
import {
  getRightPosts,
  getRightPhotos,
  getVideos,
} from "../../../selectors/selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    photos: getRightPhotos(state),
    videos: getVideos(state),
    rightPosts: getRightPosts(state),
  };
};

export default compose(
  connect(mapStateToProps, {}),
  authCheck,
  withRouter
)(Info);
