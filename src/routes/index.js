import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
const Game = React.lazy(() => import("../pages/GameScreen"));
const PageNotFound = React.lazy(() => import("../pages/pageNotFound"));

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route path={rest.path} component={Component} />;
};

const NotFound = () => {
  return <Route component={PageNotFound} />;
};
const loading = () => (
  <div className="animated fadeIn pt-1 text-center">Loading...</div>
);

const Routes = (props) => {
  return (
    <BrowserRouter>
      {/* <Layout isLoggedIn={isLoggedIn}> */}

      <Suspense fallback={loading()}>
        <Switch>
          <PublicRoute exact path="/" component={Game} />
          <NotFound />
        </Switch>
      </Suspense>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default Routes;
