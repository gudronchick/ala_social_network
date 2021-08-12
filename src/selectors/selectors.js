import { createSelector } from "reselect";

export const getUserId = (state) => state.auth.id;

export const getMainFlagIsFetch = (state) => state.main.mainFlagIsFetching;

export const getMainPageText = (state) => state.main.mainPageText;

export const getUsersSel = (state) => state.users.users;

export const getUsers = createSelector(getUsersSel, (users) => {
  return users;
});

export const getUsersCountOnThePage = (state) => {
  return state.users.usersCountOnThePage;
};

export const getPageCount = (state) => state.users.pageCount;

export const getUserCount = (state) => state.users.userCount;

export const getActiveItem = (state) => state.users.activeItem;

export const getIsFetching = (state) => state.users.isFetching;

export const getIsInFollowing = (state) => state.users.isInFollowing;

export const getMyDataSelector = (state) => state.main.myData;

export const getPhotos = (state) => state.main.profile.photos;

export const getImgError = (state) => state.main.imgError;

export const getProfile = (state) => state.main.profile;

export const getIsEditablePage = (state) => state.main.isEditablePage;

export const getProfilePhoto = (state) => state.main.profilePhoto;

export const getRightPhotos = (state) => state.main.rightPhotos;

export const getVideos = (state) => state.main.videos;

export const getRightPosts = (state) => state.main.rightPosts;

export const getIsLogged = (state) => state.auth.isLogged;

export const getIsInitialized = (state) => state.app.initialized;

export const getLogin = (state) => state.auth.login;

export const getPageName = (state) => state.app.pageName;

export const getStatus = (state) => state.main.status;

export const getMyStatus = (state) => state.main.myStatus;

export const getProfileId = (state) => state.main.profile.userId;

export const getIsFetchingStatus = (state) => state.main.isFetchingStatus;

export const getMusic = (state) => state.main.music;

export const getMyPosts = (state) => state.main.posts;

export const getFavPages = (state) => state.main.favPages;

export const getDialogs = (state) => state.messages.humanDialogs;

export const getMessages = (state) => state.messages.messages;

export const getMessage = (state) => state.messages.message;

export const getMessageImg = (state) => state.messages.messageImg;

export const getFields = (state) => state.login.fields;

export const getCaptchaUrl = (state) => state.auth.captchaUrl;
