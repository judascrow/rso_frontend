import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";
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

import AssignmentIndIcon from "@material-ui/icons/AssignmentTurnedInOutlined";

import ReactSelect from "react-select";
import Select from "../../components/SelectOption";
import {
  YearOptionsList,
  MonthOptionsList,
  DateNoOptionsList
} from "../../components/DateComponents/DateOptionsList";
import BootstrapInput from "../../components/BootstrapInput";

import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";

import { createCourtReport } from "../../store/actions/courtReport";
import { getSecPersons } from "../../store/actions/secPerson";
import { TextField } from "@material-ui/core";

const optionsType = [
  { value: 1, label: "ทำงาน 7 วัน/สัปดาห์" },
  { value: 2, label: "ทำงาน 6 วัน/สัปดาห์" }
];

const optionsRole = [
  { value: 2, label: "ผู้ปฏิบัติงาน" },
  { value: 1, label: "หัวหน้างาน" }
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
  },
  tableCell: {
    padding: 5
  }
}));

const SignupSchema = Yup.object().shape({
  reporter_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  reporter_position: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  inspector_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  inspector_position: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")

  // work_7day: Yup.number()
  //   .min(0, "จำนวนวันต้องไม่น้อยกว่า 0 วัน")
  //   .max(31, "จำนวนวันต้องไม่เกิน 31 วัน"),
  // work_6day: Yup.number()
  //   .min(0, "จำนวนวันต้องไม่น้อยกว่า 0 วัน")
  //   .max(31, "จำนวนวันต้องไม่เกิน 31 วัน")
});

/* table sec_person */
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#29b6f6",
    color: theme.palette.common.white,
    padding: 5
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

/* table sec_person */

const GetTotalDayFromMonth = month => {
  const array30 = ["04", "06", "09", "11"];
  let day = 31;
  if (array30.indexOf(month) > -1) {
    day = 30;
  } else if (month === "02") {
    day = 28;
  }
  return day;
};

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
          enableReinitialize
          initialValues={{
            year: YearOptionsList[0].value,
            month: MonthOptionsList[new Date().getUTCMonth() - 1].value,
            work_7day: GetTotalDayFromMonth(new Date().getUTCMonth() - 1),
            work_6day: 25,
            reporter_name: "",
            reporter_position: "",
            inspector_name: "",
            inspector_position: "",
            court_report_sec_persons:
              !loading &&
              secPersons !== null &&
              secPersons.data.map((secPerson, i) => ({
                sec_person_name: secPerson.full_name,
                type: 1,
                role: 2,
                day_month_work: GetTotalDayFromMonth(
                  new Date().getUTCMonth() - 1
                ),
                shuffle: 0,
                shuffle_except: 0,
                shuffle_date_name: "",
                shuffle_Absence: 0,
                shuffle_Absence_date: "",
                h_not_12: 0,
                h_not_12_date_h: "",
                remark: ""
              }))
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            var r = confirm("คุณต้องการบันทึกข้อมูลใช่หรือไม่ ? "); //eslint-disable-line
            if (r) {
              console.log(values);

              createCourtReport(values, history);
            }
          }}
        >
          {({
            errors,
            touched,
            setFieldValue,
            values,
            handleChange,
            handleBlur
          }) => (
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
                    onChange={value => {
                      setFieldValue("month", value.value);
                      setFieldValue(
                        "work_7day",
                        GetTotalDayFromMonth(value.value)
                      );
                      setFieldValue("work_6day", 25);
                    }}
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
                    defaultValue={DateNoOptionsList.find(
                      s => s.value === GetTotalDayFromMonth(values.month)
                    )}
                    value={DateNoOptionsList[values.work_7day]}
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
                    defaultValue={DateNoOptionsList[25]}
                    value={DateNoOptionsList[values.work_6day]}
                    isClearable={false}
                    component={Select}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    id="reporter_name"
                    name="reporter_name"
                    label={"ผู้รายงาน"}
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    fullWidth
                  />
                  {errors.reporter_name && touched.reporter_name ? (
                    <Typography variant="caption" color="error">
                      {errors.reporter_name}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    id="reporter_position"
                    name="reporter_position"
                    label={"ตำแหน่งของผู้รายงาน"}
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    fullWidth
                  />
                  {errors.reporter_position && touched.reporter_position ? (
                    <Typography variant="caption" color="error">
                      {errors.reporter_position}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    id="inspector_name"
                    name="inspector_name"
                    label={"ผู้ตรวจสอบ"}
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    fullWidth
                  />
                  {errors.inspector_name && touched.inspector_name ? (
                    <Typography variant="caption" color="error">
                      {errors.inspector_name}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    id="inspector_position"
                    name="inspector_position"
                    label={"ตำแหน่งของผู้ตรวจสอบ"}
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    fullWidth
                  />
                  {errors.inspector_position && touched.inspector_position ? (
                    <Typography variant="caption" color="error">
                      {errors.inspector_position}
                    </Typography>
                  ) : null}
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
                        <StyledTableCell align="center" width="10px">
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="center" width="250px">
                          ชื่อเจ้าหน้าที่รักษาความปลอดภัย
                        </StyledTableCell>
                        <StyledTableCell align="center" width="200px">
                          ประเภท
                        </StyledTableCell>
                        <StyledTableCell align="center" width="170px">
                          ระดับ
                        </StyledTableCell>
                        <StyledTableCell align="center" width="60px">
                          จำนวนวันที่มาทำงาน
                        </StyledTableCell>
                        <StyledTableCell align="center" width="60px">
                          จำนวนผลัดที่มีผู้มาทำงานแทน
                        </StyledTableCell>
                        <StyledTableCell align="center" width="60px">
                          (เป็นกรณีควงเวร กี่ผลัด)
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          ว/ด/ป ที่มีผู้มาทำงานแทน(ชื่อ)
                        </StyledTableCell>
                        <StyledTableCell align="center" width="60px">
                          จำนวนผลัดที่ขาดงาน
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          ว/ด/ป ที่ขาดงาน
                        </StyledTableCell>
                        <StyledTableCell align="center" width="70px">
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
                        name="court_report_sec_persons"
                        render={arrayHelpers => (
                          <Fragment>
                            {values.court_report_sec_persons &&
                              values.court_report_sec_persons.map((row, i) => (
                                <TableRow key={i}>
                                  <TableCell component="th" scope="row">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {row.sec_person_name}
                                  </TableCell>
                                  <TableCell>
                                    <ReactSelect
                                      name={`court_report_sec_persons[${i}].type`}
                                      options={optionsType}
                                      onChange={value => {
                                        setFieldValue(
                                          `court_report_sec_persons[${i}].type`,
                                          value.value
                                        );
                                        setFieldValue(
                                          `court_report_sec_persons[${i}].day_month_work`,
                                          value.value === 1
                                            ? values.work_7day
                                            : values.work_6day
                                        );
                                      }}
                                      defaultValue={optionsType[0]}
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <ReactSelect
                                      id={`court_report_sec_persons[${i}].role`}
                                      name={`court_report_sec_persons[${i}].role`}
                                      options={optionsRole}
                                      onChange={value => {
                                        setFieldValue(
                                          `court_report_sec_persons[${i}].role`,
                                          value.value
                                        );
                                      }}
                                      defaultValue={optionsRole[0]}
                                    />
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    {" "}
                                    <Field
                                      type="number"
                                      id={`court_report_sec_persons[${i}].day_month_work`}
                                      name={`court_report_sec_persons[${i}].day_month_work`}
                                      onChange={handleChange}
                                      component={BootstrapInput}
                                      margin="dense"
                                      // defaultValue={0}
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max:
                                          values.court_report_sec_persons[i]
                                            .type === 1
                                            ? values.work_7day
                                            : values.work_6day,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                      value={row.day_month_work}
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      type="number"
                                      id={`court_report_sec_persons[${i}].shuffle`}
                                      name={`court_report_sec_persons[${i}].shuffle`}
                                      onChange={handleChange}
                                      component={BootstrapInput}
                                      margin="dense"
                                      defaultValue={0}
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max:
                                          values.work_7day -
                                          values.court_report_sec_persons[i]
                                            .day_month_work -
                                          values.court_report_sec_persons[i]
                                            .shuffle_Absence,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      type="number"
                                      id={`court_report_sec_persons[${i}].shuffle_except`}
                                      name={`court_report_sec_persons[${i}].shuffle_except`}
                                      onChange={handleChange}
                                      component={BootstrapInput}
                                      margin="dense"
                                      defaultValue={0}
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max:
                                          values.court_report_sec_persons[i]
                                            .shuffle,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      id={`court_report_sec_persons[${i}].shuffle_date_name`}
                                      name={`court_report_sec_persons[${i}].shuffle_date_name`}
                                      component={BootstrapInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="dense"
                                      hiddenlabel="true"
                                      rowsMax="4"
                                      multiline
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    {" "}
                                    <Field
                                      type="number"
                                      id={`court_report_sec_persons[${i}].shuffle_Absence`}
                                      name={`court_report_sec_persons[${i}].shuffle_Absence`}
                                      onChange={handleChange}
                                      component={BootstrapInput}
                                      margin="dense"
                                      defaultValue={0}
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max:
                                          values.work_7day -
                                          values.court_report_sec_persons[i]
                                            .day_month_work -
                                          values.court_report_sec_persons[i]
                                            .shuffle,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      id={`court_report_sec_persons[${i}].shuffle_Absence_date`}
                                      name={`court_report_sec_persons[${i}].shuffle_Absence_date`}
                                      component={BootstrapInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="dense"
                                      hiddenlabel="true"
                                      rowsMax="4"
                                      multiline
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      type="number"
                                      id={`court_report_sec_persons[${i}].h_not_12`}
                                      name={`court_report_sec_persons[${i}].h_not_12`}
                                      onChange={handleChange}
                                      component={BootstrapInput}
                                      margin="dense"
                                      defaultValue={0}
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 1000,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      id={`court_report_sec_persons[${i}].h_not_12_date_h`}
                                      name={`court_report_sec_persons[${i}].h_not_12_date_h`}
                                      component={BootstrapInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="dense"
                                      hiddenlabel="true"
                                      rowsMax="4"
                                      multiline
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.tableCell}
                                  >
                                    <Field
                                      id={`court_report_sec_persons[${i}].remark`}
                                      name={`court_report_sec_persons[${i}].remark`}
                                      component={BootstrapInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="dense"
                                      hiddenlabel="true"
                                      rowsMax="4"
                                      multiline
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
  getSecPersons: PropTypes.func.isRequired,
  secPerson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  secPerson: state.secPerson
});

export default connect(
  mapStateToProps,
  { createCourtReport, getSecPersons }
)(withRouter(CourtReportAdd));
