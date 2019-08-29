import React, { Fragment, useState } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import ViewListOutlined from "@material-ui/icons/ViewListOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";

import { apiUrl } from "../../config";

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

const AdminReportTable = () => {
  const classes = useStyles();
  const { data, isLoading, doFetch } = useDataApi(
    `${apiUrl}/admin_reports/?year=${new Date().getUTCFullYear() + 543}&month=${
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

  const [state] = useState({
    columns: [
      {
        title: "สถานที่ปฏิบัติงาน",
        field: "court_name",
        headerStyle: {
          width: "200px"
        }
      },
      {
        title: "สังกัด",
        field: "department_name",
        headerStyle: {
          width: "250px"
        }
      },

      {
        title: "12 ชม./7 วัน (หัวหน้า)",
        field: "type_7day_boss",
        type: "numeric"
      },

      {
        title: "12 ชม./7 วัน (ปฏิบัติ)",
        field: "type_7day_operator",
        type: "numeric"
      },
      {
        title: "12 ชม./6 วัน (หัวหน้า)",
        field: "type_6day_boss",
        type: "numeric"
      },
      {
        title: "12 ชม./6 วัน (ปฏิบัติ)",
        field: "type_6day_operator",
        type: "numeric"
      },
      {
        title: "รวม",
        field: "total",
        type: "numeric"
      },
      {
        title: "ขาดงาน (วัน/ผลัด)",
        field: "shuffle_absence",
        type: "numeric"
      },
      {
        title: "ควงเวร (วัน/ผลัด)",
        field: "shuffle_except",
        type: "numeric"
      },
      {
        title: "ไม่ครบ 12 ชม. (ชั่วโมง)",
        field: "h_not_12",
        type: "numeric"
      },
      {
        title: "เลขที่หนังสือ",
        field: "doc_no",
        headerStyle: {
          width: "150px"
        }
      }
    ],
    options: {
      filtering: false,
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
      <ViewListOutlined className={classes.titleIcon} fontSize="large" />
      {"รายงานการตรวจรับพัศดุการจ้างเหมารักษาความปลอดภัยฯ"}
    </div>
  );

  return (
    <Fragment>
      <Paper className={classes.paperRoot}>
        <form
          onSubmit={event => {
            if (values.year !== "0000" && values.month !== "00") {
              doFetch(
                `${apiUrl}/admin_reports/?year=${values.year}&month=${values.month}`
              );
            } else if (values.year !== "0000" && values.month === "00") {
              doFetch(`${apiUrl}/admin_reports/?year=${values.year}`);
            } else if (values.year === "0000" && values.month !== "00") {
              doFetch(`${apiUrl}/admin_reports/?month=${values.month}`);
            } else {
              doFetch(`${apiUrl}/admin_reports/`);
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
          data={data}
          title={TableTitle}
          actions={state.actions}
          options={state.options}
        />
      )}
    </Fragment>
  );
};
export default AdminReportTable;
