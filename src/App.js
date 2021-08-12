import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeContainer from "./Content/Home/HomeContainer";
import Sidebar from "./Sidebar/Sidebar";
import LoginContainer from "./Content/Login/LoginContainer";
import { connect } from "react-redux";
import { initializedThunk } from "./redux/app";
import UsersContainer from "./Content/Users/UsersContainer";
import { withSuspense } from "./HOC/Suspense";
import { getMyDataThunk } from "./redux/main";
import HeaderContainer from "./Header/HeaderContainer";
import Preloader from "./Content/Users/Preloader";
import { getIsLogged, getIsInitialized } from "./selectors/selectors";

const Settings = React.lazy(() => import("./Content/Settings/Settings"));
const MessagesContainer = React.lazy(() =>
  import("./Content/Messages/MessagesContainer")
);

const App = ({ initializedThunk, getMyDataThunk, ...props }) => {
  useEffect(() => {
    initializedThunk();
  }, [initializedThunk]);

  useEffect(() => {
    getMyDataThunk();
  }, [props.isLogged, getMyDataThunk]);

  if (!props.initialized) return <Preloader />;

  return (
    <div className="main">
      <HeaderContainer />
      <Sidebar />
      <main className="main__content">
        <Switch>
          <Route path="/page/:pageNumber?" component={HomeContainer} />
          <Route
            path="/messages"
            render={withSuspense(MessagesContainer)}
            exact
          />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/settings" render={withSuspense(Settings)} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/" exact>
            <Redirect to="/page" />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: getIsInitialized(state),
    isLogged: getIsLogged(state),
  };
};

export default connect(mapStateToProps, { initializedThunk, getMyDataThunk })(
  App
);
