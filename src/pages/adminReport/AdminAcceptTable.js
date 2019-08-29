import React, { Fragment, useState, useEffect } from "react";
import { patch } from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
//import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import { apiUrl, apiHost } from "../../config";

import { MonthOptionsList } from "../../components/DateComponents/DateOptionsList";

import { getCourtReports } from "../../store/actions/courtReport";

const useStyles = makeStyles(theme => ({
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1)
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  paperRoot: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const AdminAcceptTable = ({
  getCourtReports,
  courtReport: { courtReports, loading }
}) => {
  const classes = useStyles();
  // const { doFetch } = useDataApi(
  //   `${apiUrl}/court_reports/?year=${new Date().getUTCFullYear() + 543}&month=${
  //     MonthOptionsList[new Date().getUTCMonth() - 1].value
  //   }`,
  //   []
  // );

  const [values, setValues] = useState({
    year: new Date().getUTCFullYear() + 543,
    month: MonthOptionsList[new Date().getUTCMonth() - 1].value
  });

  useEffect(() => {
    getCourtReports(values.year, values.month);
  }, [getCourtReports, values.year, values.month]);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  const onAccept = async rowData => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (rowData.status === "S") {
      var r = confirm("คุณต้องการลงรับใช่หรือไม่ ?"); //eslint-disable-line
      if (r) {
        await patch(
          `${apiUrl}/admin_reports/accept/${rowData.id}`,
          rowData,
          config
        );
        await getCourtReports(rowData.year, rowData.month);
      }
    } else if (rowData.status === "A") {
      var r = confirm("คุณต้องการยกเลิกการลงรับใช่หรือไม่ ?"); //eslint-disable-line
      if (r) {
        await patch(
          `${apiUrl}/admin_reports/unaccept/${rowData.id}`,
          rowData,
          config
        );
        await getCourtReports(rowData.year, rowData.month);
      }
    }
  };

  const [state] = useState({
    columns: [
      {
        title: "รหัสศาล",
        field: "court.court_code"
      },
      {
        title: "ชื่อศาล",
        field: "court.name"
      },
      {
        title: "สังกัด",
        field: "court.department_name"
      },
      {
        title: "สถานะการส่งรายงาน",
        field: "status",
        lookup: {
          A: "ลงรับแล้ว",
          S: "รอลงรับ",
          W: "ยังไม่ได้ส่งรายงาน"
        },
        render: rowData =>
          rowData.status === "A" ? (
            <Chip label="ลงรับแล้ว" color="secondary" size="small" />
          ) : rowData.status === "S" ? (
            <Chip label="รอลงรับ" color="primary" size="small" />
          ) : (
            <Chip label="ยังไม่ได้ส่งรายงาน" size="small" />
          )
      }
    ],
    actions: [
      rowData => ({
        icon: "picture_as_pdf",
        iconProps: {
          color:
            rowData.status !== "S" && rowData.status !== "A"
              ? "disabled"
              : "error"
        },
        tooltip: "Download เอกสาร",
        onClick: (event, rowData) =>
          window.open(`${apiHost}/files/${rowData.file_path}`, "_blank"),
        disabled: rowData.status !== "S" && rowData.status !== "A"
      }),
      rowData => ({
        icon: "cloud_download",
        iconProps: {
          color:
            rowData.status !== "S" && rowData.status !== "A"
              ? "disabled"
              : rowData.status === "A"
              ? "error"
              : "primary"
        },
        tooltip:
          rowData.status !== "A" ? "ลงรับเอกสาร" : "ยกเลิกการลงรับเอกสาร",
        onClick: (event, rowData) => onAccept(rowData),
        disabled: rowData.status !== "S" && rowData.status !== "A"
      })
    ],
    options: {
      filtering: true,
      actionsColumnIndex: -1,
      pageSize: 10,
      headerStyle: {
        backgroundColor: "#29b6f6",
        color: "#fff"
      },
      padding: "dense",
      exportButton: true,
      exportFileName: "data",
      grouping: true
    }
  });

  const TableTitle = (
    <div>
      <CloudDownloadOutlined className={classes.titleIcon} fontSize="large" />
      {"ตรวจสอบการส่งรายงานจากศาล"}
    </div>
  );

  return (
    <Fragment>
      <Paper className={classes.paperRoot}>
        <form>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="year">ปี</InputLabel> */}
                <Select
                  value={values.year}
                  onChange={handleChange}
                  inputProps={{
                    name: "year",
                    id: "year"
                  }}
                >
                  <MenuItem value={"0000"}>ทั้งหมด</MenuItem>
                  <MenuItem value={"2562"}>2562</MenuItem>
                  <MenuItem value={"2563"}>2563</MenuItem>
                  <MenuItem value={"2564"}>2564</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="month">เดือน</InputLabel> */}
                <Select
                  value={values.month}
                  onChange={handleChange}
                  inputProps={{
                    name: "month",
                    id: "month"
                  }}
                >
                  <MenuItem value={"00"}>ทั้งหมด</MenuItem>
                  <MenuItem value={"01"}>มกราคม</MenuItem>
                  <MenuItem value={"02"}>กุมภาพันธ์</MenuItem>
                  <MenuItem value={"03"}>มีนาคม</MenuItem>
                  <MenuItem value={"04"}>เมษายน</MenuItem>
                  <MenuItem value={"05"}>พฤษภาคม</MenuItem>
                  <MenuItem value={"06"}>มิถุนายน</MenuItem>
                  <MenuItem value={"07"}>กรกฎาคม</MenuItem>
                  <MenuItem value={"08"}>สิงหาคม</MenuItem>
                  <MenuItem value={"09"}>กันยายน</MenuItem>
                  <MenuItem value={"10"}>ตุลาคม</MenuItem>
                  <MenuItem value={"11"}>พฤศจิกายน</MenuItem>
                  <MenuItem value={"12"}>ธันวาคม</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl style={{ paddingTop: "10px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  //color="primary"
                  size="small"
                >
                  ค้นหา
                </Button>
              </FormControl> */}
            </Grid>
          </Grid>
        </form>
      </Paper>

      {courtReports !== null && !loading ? (
        <MaterialTable
          columns={state.columns}
          data={courtReports.data}
          title={TableTitle}
          actions={state.actions}
          options={state.options}
        />
      ) : (
        <LinearProgress />
      )}
    </Fragment>
  );
};

AdminAcceptTable.propTypes = {
  getCourtReports: PropTypes.func.isRequired,
  courtReport: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courtReport: state.courtReport
});
export default connect(
  mapStateToProps,
  { getCourtReports }
)(withRouter(AdminAcceptTable));
