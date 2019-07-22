import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";

const NotFound = () => <div>PAGE NOT PUUND</div>;

const User = () => <div>PAGE User</div>;

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/user" component={User} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
