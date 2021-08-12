import React, { useCallback, useEffect } from "react";
import Home from "./Home";
import {
  changeMainFlasIsFetching,
  editPageMode,
  getProfileData,
  getStatusThunk,
  getUserThunk,
  sendPhotoThunk,
} from "../../redux/main";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getMainFlagIsFetch,
  getMyDataSelector,
  getUserId,
  getPhotos,
  getImgError,
  getProfile,
  getIsEditablePage,
  getProfilePhoto,
} from "../../selectors/selectors";
import { compose } from "redux";
import { getNameAC } from "../../redux/app";

const HomeContainer = ({
  getUserThunk,
  getStatusThunk,
  changeMainFlasIsFetching,
  getNameAC,
  myData,
  ...props
}) => {
  let pageNumber = props.match.params.pageNumber || props.userId;

  if (!(typeof +pageNumber === "number" && !Number.isNaN(+pageNumber))) {
    pageNumber = props.userId;
  }

  const checkPageNumber = useCallback(() => {
    if (myData) {
      if (pageNumber === myData.userId) {
        getNameAC("Profile page");
      } else {
        getNameAC("User page");
      }
    }
  }, [getNameAC, pageNumber, myData]);

  useEffect(() => {
    checkPageNumber();
  }, [myData, checkPageNumber]);

  useEffect(() => {
    checkPageNumber();
    getUserThunk(pageNumber);
    getStatusThunk(pageNumber);
    return function () {
      changeMainFlasIsFetching(0);
    };
  }, [
    pageNumber,
    checkPageNumber,
    getUserThunk,
    getStatusThunk,
    changeMainFlasIsFetching,
  ]);

  return <Home {...props} />;
};

const mapStateToProps = (state) => {
  return {
    userId: getUserId(state),
    mainFlagIsFetching: getMainFlagIsFetch(state),
    myData: getMyDataSelector(state),
    photos: getPhotos(state),
    imgError: getImgError(state),
    profile: getProfile(state),
    isEditablePage: getIsEditablePage(state),
    profilePhoto: getProfilePhoto(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileData,
    getUserThunk,
    getStatusThunk,
    withRouter,
    changeMainFlasIsFetching,
    getNameAC,
    sendPhotoThunk,
    editPageMode,
  })(HomeContainer)
);
