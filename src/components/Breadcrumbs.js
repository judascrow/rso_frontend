/* eslint-disable no-nested-ternary */
import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";

const fontSize = "14px";

const breadcrumbNameMap = {
  "/": "หน้าหลัก",
  "/user": "ผู้ใช้งาน",
  "/user/add": "สร้างผู้ใช้งาน",
  "/test": "ทดสอบ"
};

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360,
    marginBottom: theme.spacing(1)
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    width: 20,
    height: 20,
    verticalAlign: "middle"
  }
});

const LinkRouter = props => (
  <Link
    {...props}
    component={RouterLink}
    color="secondary"
    style={{ fontSize: fontSize }}
  />
);

const RouterBreadcrumbs = props => {
  const { classes, location } = props;
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="Breadcrumb">
        <LinkRouter color="inherit" to="/">
          <HomeIcon className={classes.icon} />
          หน้าหลัก
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography
              color="textPrimary"
              key={to}
              style={{ fontSize: fontSize }}
            >
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

RouterBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RouterBreadcrumbs));
