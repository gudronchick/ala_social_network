export const followOrUnfollow = (response, dispatch, id, { ...props }) => {
  if (!response.data.resultCode) {
    dispatch(props.changeFlagIsFollowCreator(id));
  }
  dispatch(props.isInFollowingAC(false, id));
};
