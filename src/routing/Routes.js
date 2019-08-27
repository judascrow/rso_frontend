import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import PrivateRoute from "./PrivateRoute";

// Page
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/users/User";
import UserAdd from "../pages/users/UserAdd";
import UserEdit from "../pages/users/UserEdit";
import SecPersonTable from "../pages/secPersons/SecPersonTable";
import SecPersonAdd from "../pages/secPersons/SecPersonAdd";
import SecPersonEdit from "../pages/secPersons/SecPersonEdit";

import CourtReportTable from "../pages/courtReport/CourtReportTable";
import CourtReportAdd from "../pages/courtReport/CourtReportAdd";
import CourtReportEdit from "../pages/courtReport/CourtReportEdit";

import AdminReportTable from "../pages/adminReport/AdminReportTable";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2)
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return <Paper className={classes.paperRoot}>PAGE NOT FOUND</Paper>;
};

const Routes = ({ user }) => {
  let AdminRoute = false;
  if (user && user.roleID === 1) {
    AdminRoute = true;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute
          exact
          path="/user"
          component={AdminRoute ? User : NotFound}
        />
        <PrivateRoute
          path="/user/add"
          component={AdminRoute ? UserAdd : NotFound}
        />
        <PrivateRoute
          path="/user/edit/:id"
          component={AdminRoute ? UserEdit : NotFound}
        />
        <PrivateRoute exact path="/secperson" component={SecPersonTable} />
        <PrivateRoute path="/secperson/add" component={SecPersonAdd} />
        <PrivateRoute path="/secperson/edit/:id" component={SecPersonEdit} />
        <PrivateRoute exact path="/courtreport" component={CourtReportTable} />
        <PrivateRoute path="/courtreport/add" component={CourtReportAdd} />
        <PrivateRoute
          path="/courtreport/edit/:id"
          component={CourtReportEdit}
        />
        <PrivateRoute
          exact
          path="/admin_report"
          component={AdminRoute ? AdminReportTable : NotFound}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

//export default Routes;

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Routes)
);
