import { connect } from "react-redux";
import {
  addComment,
  addPost,
  changeMyLike,
  deletePost,
  editPageMode,
  sendStatusThunk,
  updateProfileThunk,
} from "../../../../redux/main";
import {
  getIsEditablePage,
  getProfile,
  getRightPhotos,
  getRightPosts,
  getStatus,
  getVideos,
  getIsFetchingStatus,
  getMusic,
  getMyPosts,
  getFavPages,
  getProfileId,
} from "../../../../selectors/selectors";
import About from "./About";

const mapStateToProps = (state) => {
  return {
    isEditablePage: getIsEditablePage(state),
    userId: getProfileId(state),
    status: getStatus(state),
    isFetchingStatus: getIsFetchingStatus(state),
    profile: getProfile(state),
    music: getMusic(state),
    videos: getVideos(state),
    posts: getMyPosts(state),
    rightPosts: getRightPosts(state),
    favPages: getFavPages(state),
    photos: getRightPhotos(state),
  };
};

export default connect(mapStateToProps, {
  updateProfileThunk,
  editPageMode,
  sendStatusThunk,
  changeMyLike,
  addPost,
  addComment,
  deletePost,
})(About);
