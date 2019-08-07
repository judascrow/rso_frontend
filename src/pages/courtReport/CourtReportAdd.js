import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";

import Select from "../../components/SelectOption";
import {
  YearOptionsList,
  MonthOptionsList,
  DateNoOptionsList,
  MapMonth
} from "../../components/DateComponents/DateOptionsList";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import { createCourtReport } from "../../store/actions/courtReport";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  title: {
    marginTop: "-0.5rem",
    marginBottom: "1rem"
  },
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1)
  }
}));

const SignupSchema = Yup.object().shape({
  work_7day: Yup.number()
    .min(0, "จำนวนวันต้องไม่น้อยกว่า 0 วัน")
    .max(31, "จำนวนวันต้องไม่เกิน 31 วัน"),
  work_6day: Yup.number()
    .min(0, "จำนวนวันต้องไม่น้อยกว่า 0 วัน")
    .max(31, "จำนวนวันต้องไม่เกิน 31 วัน")
});

const CourtReportAdd = ({ createCourtReport, history }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Typography
          variant="h6"
          component="h3"
          className={classes.title}
          gutterBottom
        >
          <AssignmentIndIcon className={classes.titleIcon} fontSize="large" />
          {"เพิ่มบัญชีวันทำงานของเจ้าหน้าที่รักษาความปลอดภัย"}
        </Typography>
        <Formik
          initialValues={{
            year: YearOptionsList[0].value,
            month: MonthOptionsList[0].value,
            work_7day: 0,
            work_6day: 0,
            total_shuffle: 0,
            total_shuffle_except: 0,
            total_shuffle_absence: 0
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            // same shape as initial values
            setSubmitting(false);
            console.log(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="year"
                    reactSelectID={"year"}
                    options={YearOptionsList}
                    onChange={value => setFieldValue("year", value.value)}
                    labelName={"ปี"}
                    defaultValue={YearOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="month"
                    reactSelectID={"month"}
                    options={MonthOptionsList}
                    onChange={value => setFieldValue("month", value.value)}
                    labelName={"เดือน"}
                    defaultValue={
                      MonthOptionsList[new Date().getUTCMonth() - 1]
                    }
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="work_7day"
                    reactSelectID={"work_7day"}
                    options={DateNoOptionsList}
                    onChange={value => setFieldValue("work_7day", value.value)}
                    labelName={"จำนวนวันทำงาน ประเภท 12 ชั่วโมง / 7 วัน"}
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="work_6day"
                    reactSelectID={"work_6day"}
                    options={DateNoOptionsList}
                    onChange={value => setFieldValue("work_6day", value.value)}
                    labelName={"จำนวนวันทำงาน ประเภท 12 ชั่วโมง / 6 วัน"}
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="total_shuffle"
                    reactSelectID={"total_shuffle"}
                    options={DateNoOptionsList}
                    onChange={value =>
                      setFieldValue("total_shuffle", value.value)
                    }
                    labelName={"จำนวนผลัดที่มีผู้มาทำงานแทน"}
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="total_shuffle_except"
                    reactSelectID={"total_shuffle_except"}
                    options={DateNoOptionsList}
                    onChange={value =>
                      setFieldValue("total_shuffle_except", value.value)
                    }
                    labelName={"(เป็นกรณีควงเวร กี่ผลัด)"}
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="total_shuffle_absence"
                    reactSelectID={"total_shuffle_absence"}
                    options={DateNoOptionsList}
                    onChange={value =>
                      setFieldValue("total_shuffle_absence", value.value)
                    }
                    labelName={
                      "จำนวนผลัดที่ขาดทำงาน (ไม่รวมวันที่มีผู่มาทำงานแทน)"
                    }
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    บันทึก
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/courtreport"
                    className={classes.button}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fragment>
  );
};

CourtReportAdd.propTypes = {
  createCourtReport: PropTypes.func.isRequired
};

export default connect(
  null,
  { createCourtReport }
)(withRouter(CourtReportAdd));
