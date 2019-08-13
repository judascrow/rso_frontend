import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputBase from "@material-ui/core/InputBase";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";

import ReactSelect from "react-select";
import Select from "../../components/SelectOption";
import {
  YearOptionsList,
  MonthOptionsList,
  DateNoOptionsList,
  MapMonth
} from "../../components/DateComponents/DateOptionsList";

import { Formik, Field, Form, FieldArray } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import { createCourtReport } from "../../store/actions/courtReport";
import { getSecPersons } from "../../store/actions/secPerson";

const optionsType = [
  { value: 1, label: "ทำงาน 7 วัน/สัปดาห์" },
  { value: 2, label: "ทำงาน 6 วัน/สัปดาห์" }
];

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

/* table sec_person */
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#29b6f6",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    // width: "20px",
    padding: "5px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

/* table sec_person */

const CourtReportAdd = ({
  createCourtReport,
  history,
  secPerson: { secPersons, loading },
  getSecPersons
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSecPersons("A");
    // eslint-disable-next-line
  }, []);
  console.log(secPersons);

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
            total_shuffle_absence: 0,
            day_month: ["31"]
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
                  <Field
                    name="total_shuffle_absence"
                    reactSelectID={"total_shuffle_absence"}
                    options={DateNoOptionsList}
                    onChange={value =>
                      setFieldValue("total_shuffle_absence", value.value)
                    }
                    labelName={
                      "จำนวนผลัดที่ขาดทำงาน (ไม่รวมวันที่มีผู้มาทำงานแทน)"
                    }
                    defaultValue={DateNoOptionsList[0]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Table className={classes.table} size="small">
                    {/* <colgroup>
                      <col style={{ width: "5%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "45%" }} />
                    </colgroup> */}
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" width="20px">
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="center" width="300px">
                          ชื่อเจ้าหน้าที่รักษาความปลอดภัย
                        </StyledTableCell>
                        <StyledTableCell align="center" width="200px">
                          ประเภท
                        </StyledTableCell>
                        <StyledTableCell align="center" width="100">
                          จำนวนวันทำงานในรอบเดือน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          จำนวนวันที่มาทำงาน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          จำนวนผลัดที่มีผู้มาทำงานแทน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          ว/ด/ป ที่มีผู้มาทำงานแทน(ชื่อ)
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          จำนวนผลัดที่ขาดงาน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          ว/ด/ป ที่ขาดงาน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          จำนวนชั่วโมงที่มาทำงานไม่ครบ 12 ชม./ผลัด
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          ว/ด/ป ที่มาทำงานไม่ครบ 12 ชม./ผลัด
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          หมายเหตุ
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <FieldArray
                        name="friends"
                        render={arrayHelpers => (
                          <Fragment>
                            {!loading &&
                              secPersons !== null &&
                              secPersons.data.map((row, i) => (
                                <TableRow key={i}>
                                  <TableCell component="th" scope="row">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {row.full_name}
                                  </TableCell>
                                  <TableCell>
                                    <ReactSelect
                                      name={`type${i}`}
                                      options={optionsType}
                                      defaultValue={optionsType[0]}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    {" "}
                                    <Field
                                      type="number"
                                      name={`day_month.${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 31,
                                        step: 1
                                      }}
                                      onInput={e => {
                                        e.target.value = Math.max(
                                          0,
                                          parseInt(e.target.value)
                                        )
                                          .toString()
                                          .slice(0, 2);
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    {" "}
                                    <Field
                                      name={`day_month_work${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      inputProps={{
                                        maxLength: 2
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`shuffle${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      inputProps={{
                                        maxLength: 2
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`shuffle_date_name${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      hiddenlabel="true"
                                      multiline="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`shuffle_Absence${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      inputProps={{
                                        maxLength: 2
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`shuffle_Absence_date${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      hiddenlabel="true"
                                      multiline="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`h_not_12${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      inputProps={{
                                        maxLength: 2
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`h_not_12_date_h${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      hiddenlabel="true"
                                      multiline="true"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Field
                                      name={`remark${i}`}
                                      component={BootstrapInput}
                                      margin="dense"
                                      hiddenlabel="true"
                                      multiline="true"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                          </Fragment>
                        )}
                      />
                    </TableBody>
                  </Table>
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
  createCourtReport: PropTypes.func.isRequired,
  getSecPersons: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  secPerson: state.secPerson
});

export default connect(
  mapStateToProps,
  { createCourtReport, getSecPersons }
)(withRouter(CourtReportAdd));
