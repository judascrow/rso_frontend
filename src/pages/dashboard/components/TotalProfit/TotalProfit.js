import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from "@material-ui/core";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
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
    backgroundColor: "#00bcd4",
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { data, isLoading } = useDataApi(
    `${apiUrl}/dashboard/total_sec_work`,
    []
  );

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
              ร้อยละการมาทำงานของ รปภ.
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3">{data.total}%</Typography>
            )}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <VerifiedUser className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={parseInt(data.total)}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
