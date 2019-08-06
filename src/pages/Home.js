import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2)
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperRoot}>
      Home page
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
