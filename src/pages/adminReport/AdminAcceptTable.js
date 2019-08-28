import React, { Fragment, useState } from "react";
import { patch } from "axios";
import setAuthToken from "../../utils/setAuthToken";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import { apiUrl, apiHost } from "../../config";

import { useDataApi } from "../../components/FetchData";
import { MonthOptionsList } from "../../components/DateComponents/DateOptionsList";

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

const AdminAcceptTable = () => {
  const classes = useStyles();
  const { data, isLoading, doFetch } = useDataApi(
    `${apiUrl}/court_reports/?year=${new Date().getUTCFullYear() + 543}&month=${
      MonthOptionsList[new Date().getUTCMonth() - 1].value
    }`,
    []
  );

  const [values, setValues] = React.useState({
    year: new Date().getUTCFullYear() + 543,
    month: MonthOptionsList[new Date().getUTCMonth() - 1].value
  });

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
        await doFetch(
          `${apiUrl}/court_reports/?year=${values.year}&month=${values.month}&status=Z`
        );
      }
    } else if (rowData.status === "A") {
      var r = confirm("คุณต้องการยกเลิกการลงรับใช่หรือไม่ ?"); //eslint-disable-line
      if (r) {
        await patch(
          `${apiUrl}/admin_reports/unaccept/${rowData.id}`,
          rowData,
          config
        );
        await doFetch(
          `${apiUrl}/court_reports/?year=${values.year}&month=${values.month}&status=`
        );
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
        iconProps: { color: rowData.status !== "S" && rowData.status !== "A" ? "disabled" : "error" },
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
              : "primary"
        },
        tooltip: "ลงรับเอกสาร",
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
      exportFileName: "data"
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
        <form
          onSubmit={event => {
            if (values.year !== "0000" && values.month !== "00") {
              doFetch(
                `${apiUrl}/court_reports/?year=${values.year}&month=${values.month}`
              );
            } else if (values.year !== "0000" && values.month === "00") {
              doFetch(`${apiUrl}/court_reports/?year=${values.year}`);
            } else if (values.year === "0000" && values.month !== "00") {
              doFetch(`${apiUrl}/court_reports/?month=${values.month}`);
            } else {
              doFetch(`${apiUrl}/court_reports/`);
            }

            event.preventDefault();
          }}
        >
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
              <FormControl style={{ paddingTop: "10px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  //color="primary"
                  size="small"
                >
                  ค้นหา
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {isLoading ? (
        <LinearProgress />
      ) : (
        <MaterialTable
          columns={state.columns}
          data={data.data}
          title={TableTitle}
          actions={state.actions}
          options={state.options}
        />
      )}
    </Fragment>
  );
};
export default AdminAcceptTable;
