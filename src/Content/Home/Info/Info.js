import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AboutContainer from "./InfoComponents/AboutContainer";
import Photos from "./InfoComponents/Photos";
import RightPosts from "./InfoComponents/RightPosts";
import Videos from "./InfoComponents/Videos";

const Info = (props) => {
  let id = props.match.params.pageNumber || "";
  id = +id ? id + "/" : "";

  return (
    <Switch>
      <Route path={`/page/${id}about`} component={AboutContainer} />
      <Route
        path={`/page/${id}photos`}
        render={() => <Photos photos={props.photos} />}
      />
      <Route
        path={`/page/${id}videos`}
        render={() => <Videos videos={props.videos} />}
      />
      <Route
        path={`/page/${id}posts`}
        render={() => <RightPosts rightPosts={props.rightPosts} />}
      />
      <Route path={`/page/${id}`} exact>
        <Redirect to={`/page/${id}about`} />
      </Route>
    </Switch>
  );
};

export default Info;
