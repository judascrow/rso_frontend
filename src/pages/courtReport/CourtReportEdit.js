import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
// import * as Yup from "yup";

import {
  getCourtReport,
  updateCourtReport
} from "../../store/actions/courtReport";

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
  },
  tableCell: {
    padding: 5
  }
}));

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

const CourtReportEdit = ({
  getCourtReport,
  history,
  match,
  courtReport: { courtReportData, loading },
  updateCourtReport
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCourtReport(match.params.id);
    // eslint-disable-next-line
  }, [getCourtReport, match.params.id]);

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
            year:
              loading || !courtReportData.year
                ? YearOptionsList[0].value
                : courtReportData.year,
            month:
              loading || !courtReportData.month
                ? MonthOptionsList[new Date().getUTCMonth() - 1].value
                : courtReportData.month,
            work_7day:
              loading || !courtReportData.work_7day
                ? GetTotalDayFromMonth(new Date().getUTCMonth() - 1)
                : courtReportData.work_7day,
            work_6day:
              loading || !courtReportData.work_6day
                ? 25
                : courtReportData.work_6day,
            reporter_name:
              loading || !courtReportData.reporter_name
                ? ""
                : courtReportData.reporter_name,
            reporter_position:
              loading || !courtReportData.reporter_position
                ? ""
                : courtReportData.reporter_position,
            inspector_name:
              loading || !courtReportData.inspector_name
                ? ""
                : courtReportData.inspector_name,
            inspector_position:
              loading || !courtReportData.inspector_position
                ? ""
                : courtReportData.inspector_position,
            court_report_sec_persons:
              loading || !courtReportData
                ? []
                : courtReportData.court_report_sec_persons.map((cs, i) => ({
                    id: cs.id,
                    court_report_id: cs.court_report_id,
                    sec_person_name: cs.sec_person_name,
                    type: cs.type,
                    day_month_work: cs.day_month_work,
                    shuffle: cs.shuffle,
                    shuffle_date_name: cs.shuffle_date_name,
                    shuffle_Absence: cs.shuffle_Absence,
                    shuffle_Absence_date: cs.shuffle_Absence_date,
                    h_not_12: cs.h_not_12,
                    h_not_12_date_h: cs.h_not_12_date_h,
                    remark: cs.remark
                  }))
          }}
          // validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            var r = confirm("คุณต้องการบันทึกข้อมูลใช่หรือไม่ ? "); //eslint-disable-line
            if (r) {
              console.log(values);

              updateCourtReport(match.params.id, values, history);
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
                    value={YearOptionsList.find(s => s.value === values.year)}
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
                    value={MonthOptionsList.find(s => s.value === values.month)}
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
                    isClearable={false}
                    component={Select}
                    value={DateNoOptionsList.find(
                      s => s.value === values.work_7day
                    )}
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
                    isClearable={false}
                    component={Select}
                    value={DateNoOptionsList.find(
                      s => s.value === values.work_6day
                    )}
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
                    value={values.reporter_name}
                  />
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
                    value={values.reporter_position}
                  />
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
                    value={values.inspector_name}
                  />
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
                    value={values.inspector_position}
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
                        <StyledTableCell align="center" width="10px">
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="center" width="250px">
                          ชื่อเจ้าหน้าที่รักษาความปลอดภัย
                        </StyledTableCell>
                        <StyledTableCell align="center" width="200px">
                          ประเภท
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
                                      }}
                                      defaultValue={optionsType[0]}
                                      value={optionsType.find(
                                        s => s.value === row.type
                                      )}
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
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 31,
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
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 31,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                      value={row.shuffle}
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
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 31,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                      value={row.shuffle_except}
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
                                      value={row.shuffle_date_name}
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
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 31,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                      value={row.shuffle_Absence}
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
                                      value={row.shuffle_Absence_date}
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
                                      inputProps={{
                                        maxLength: 2,
                                        min: 0,
                                        max: 1000,
                                        step: 1
                                      }}
                                      hiddenlabel="true"
                                      value={row.h_not_12}
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
                                      value={row.h_not_12_date_h}
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
                                      value={row.remark}
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

CourtReportEdit.propTypes = {
  updateCourtReport: PropTypes.func.isRequired,
  getCourtReport: PropTypes.func.isRequired,
  courtReport: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courtReport: state.courtReport
});

export default connect(
  mapStateToProps,
  { updateCourtReport, getCourtReport }
)(withRouter(CourtReportEdit));
