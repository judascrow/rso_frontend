import React from "react";
import { Doughnut, defaults } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import { apiUrl } from "../../../../config";
import { useDataApi } from "../../../../components/FetchData";

defaults.global.animation = false;

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  chartContainer: {
    position: "relative",
    height: "280px"
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { data } = useDataApi(`${apiUrl}/dashboard/donut`, []);

  const dataDonut = {
    datasets: [
      {
        data: [
          data.donut1 && data.donut1.value,
          data.donut1 && data.donut2.value,
          data.donut1 && data.donut3.value
        ],
        backgroundColor: ["#2196f3", "orange", "red"],
        borderWidth: 8,
        borderColor: "white",
        hoverBorderColor: "white"
      }
    ],
    labels: ["มาทำงาน", "ผลัดที่มีผู้มาทำงานแทน", "ขาดงาน"]
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 70,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      //borderColor: theme.palette.divider,
      backgroundColor: "white",
      titleFontColor: "#03a9f4",
      bodyFontColor: "green",
      footerFontColor: "green"
    }
  };

  const devices = [
    {
      title: "มาทำงาน",
      value: data.donut1 && data.donut1.value,
      color: "#03a9f4"
    },
    {
      title: "ผลัดที่มีผู้มาทำงานแทน",
      value: data.donut2 && data.donut2.value,
      color: "orange"
    },
    {
      title: "ขาดงาน",
      value: data.donut3 && data.donut3.value,
      color: "red"
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="สถิติการการมาทำงาน" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={dataDonut} options={options} />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div className={classes.device} key={device.title}>
              {/* <span className={classes.deviceIcon}>{device.icon}</span> */}
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h5">
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
