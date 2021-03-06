import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
//import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CircularProgress from "@material-ui/core/CircularProgress";

import { apiUrl } from "../../../../config";
import { useDataApi } from "../../../../components/FetchData";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const Budget = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { data, isLoading } = useDataApi(`${apiUrl}/dashboard/total_court`, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              จำนวนศาลที่ใช้ระบบ
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3">{data.total}</Typography>
            )}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountBalanceIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div> */}
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
