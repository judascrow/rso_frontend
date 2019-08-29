import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI stuff
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

// Components
import Menus from "./Menus";
import Breadcrumbs from "./Breadcrumbs";
import Logo from "../img/logo.svg";
import Config from "../config";

// Store
import { logout } from "../store/actions/auth";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    color: "#9e9e9e",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paperRoot: {
    padding: theme.spacing(3, 2)
  },
  list: {
    backgroundColor: "#1e88e5",
    color: "#fff"
  },
  listIcon: {
    color: "#fff"
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    // fontWeight: "bold",
    padding: theme.spacing(1, 1)
  },
  userMenu: {
    color: "#9e9e9e"
  },
  menuRoot: {
    backgroundColor: "#1e88e5",
    flex: "1 0 auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    zIndex: "1200"
  },
  menuFooter: {
    backgroundColor: "#1565c0",
    display: "block"
  },
  MenuFooterUser: {
    flexGrow: 1,
    color: "#fff",
    padding: theme.spacing(1, 1)
  },
  circle: {
    width: "12px",
    height: "12px",
    marginRight: "4px",
    backgroundColor: "#76ff03",
    display: "inline-block",
    marginBottom: "-0.5px",
    borderRadius: "50%"
  },
  appFooter: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    textAlign: "center"
  }
}));

const Layout = props => {
  const { container, user, logout } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.menuRoot}>
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "block"
        }}
      >
        <Toolbar style={{ backgroundColor: "#1565c0" }}>
          <Avatar alt="logo" src={Logo} className={classes.avatar} />
          <Typography className={classes.title} variant="button">
            {Config.siteName}
          </Typography>
        </Toolbar>

        <List
          className={classes.list}
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{ color: "#fff" }}
            >
              {"Main"}
            </ListSubheader>
          }
        >
          {Menus.map(menu =>
            user && menu.roleID.indexOf(user.roleID) > -1 ? (
              <ListItem
                button
                key={menu.text}
                component={Link}
                to={menu.path}
                selected={menu.path === getLocalPath(props.location.pathname)}
                color="inherit"
              >
                <ListItemIcon className={classes.listIcon}>
                  {menu.icon}
                </ListItemIcon>
                {/* <ListItemText primary={menu.text} /> */}
                <Typography variant="subtitle2">{menu.text}</Typography>
              </ListItem>
            ) : (
              ""
            )
          )}
        </List>
      </div>
      <div className={classes.menuFooter}>
        {" "}
        <Toolbar>
          <Avatar
            alt="Remy Sharp"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            className={classes.avatar}
          />
          <Typography className={classes.MenuFooterUser} variant="caption">
            {user && user.username}
            <br />
            {user && user.courtName}
            <br />
            <span className={classes.circle} /> {"Online"}
          </Typography>
        </Toolbar>
      </div>
    </div>
  );

  const authLinks = (
    <Fragment>
      <div>
        <IconButton
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          className={classes.userMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle2" className={classes.title}>
            {/* {title} */}
          </Typography>
          {authLinks}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs />
        {/* <Paper className={classes.paperRoot}>{props.children}</Paper> */}
        <div>{props.children}</div>
        <div className={classes.appFooter}>
          <Typography variant="caption" color="textSecondary">
            {Config.copyright}
          </Typography>
        </div>
      </main>
    </div>
  );
};

const getLocalPath = path => {
  const path_len = (path.match(/\//g) || []).length;
  return path_len === 1
    ? path
    : path_len === 2
    ? path.substr(0, path.lastIndexOf("/"))
    : path.substr(0, path.lastIndexOf("/", path.lastIndexOf("/") - 1));
};

Layout.propTypes = {
  // title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  container: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Layout)
);
