import React from "react";
import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import PrivateRoute from "./PrivateRoute";

// Page
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/users/User";
import UserAdd from "../pages/users/UserAdd";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2)
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return <Paper className={classes.paperRoot}>PAGE NOT PUUND</Paper>;
};
const Test = () => {
  const classes = useStyles();
  return <Paper className={classes.paperRoot}>PAGE TEST</Paper>;
};

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/user" component={User} />
        <PrivateRoute path="/user/add" component={UserAdd} />
        <PrivateRoute exact path="/test" component={Test} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
