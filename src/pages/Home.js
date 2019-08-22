import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import Logo from "../img/logo.svg";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2),
    textAlign: "center"
  },
  avatar: {
    margin: 10,
    width: 160,
    height: 160
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperRoot}>
      <Grid container justify="center" alignItems="center">
        <Avatar alt="logo" src={Logo} className={classes.avatar} />
      </Grid>
      <br />
      <Typography variant="h5" align="center" gutterBottom>
        {"ระบบรายงานการตรวจรับพัสดุการจ้างเหมารักษาความปลอดภัยฯ"}
        <br />
        {"Security Contract Report System"}
      </Typography>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Paper>
  );
};
export default Home;
