import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

import { options } from "./chart";

import { apiUrl } from "../../../../config";
import { useDataApi } from "../../../../components/FetchData";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: "relative"
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { data } = useDataApi(`${apiUrl}/dashboard/bar`, []);

  const dataChart = {
    labels: data.depart && data.depart.map((d, i) => d.name),
    datasets: [
      {
        label: "จำนวน",
        backgroundColor: "#03a9f4",
        data: data.sec_total && data.sec_total.map((s, i) => s.total)
      }
    ]
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="จำนวนเจ้าหน้าที่รักษาความปลอดภัยแยกรายภาค" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={dataChart} options={options} />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
