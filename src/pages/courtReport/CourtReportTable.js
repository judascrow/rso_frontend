import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";

import { getCourtReports } from "../../store/actions/courtReport";
import ConvertMonth from "../../components/ConvertMonth";

const useStyles = makeStyles(theme => ({
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1)
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  }
}));

const CourtReportTable = ({
  getCourtReports,
  //deleteUser,
  courtReport: { courtReports, loading },
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCourtReports();
  }, [getCourtReports]);

  const onDelete = async rowData => {
    // var r = confirm("You want to delete " + rowData.username); //eslint-disable-line
    // if (r) {
    //   await deleteUser(rowData.id);
    //   await getUsers();
    // }
  };

  const onEdit = rowData => {
    history.push(`/courtreports/edit/` + rowData.id);
    // alert(rowData.id);
  };

  const [state] = useState({
    columns: [
      {
        title: "เดือน - ปี",
        field: "year",
        lookup: { 2019: "2019", 2020: "2020" },
        render: rowData => ConvertMonth(rowData.month) + " " + rowData.year
      },
      {
        title: "สถานะการส่งรายงาน",
        field: "status",
        lookup: { S: "ส่งเรียบร้อยแล้ว", W: "รอส่ง" },
        render: rowData =>
          rowData.status !== "W" ? (
            <Chip label="ส่งเรียบร้อยแล้ว" color="secondary" size="small" />
          ) : (
            <Chip label="รอส่ง" size="small" />
          )
      }
    ],
    actions: [
      {
        icon: "edit",
        iconProps: { color: "primary" },
        tooltip: "แก้ไขรายงาน",
        onClick: (event, rowData) => onEdit(rowData)
      },
      rowData => ({
        icon: "send",
        iconProps: { color: "secondary" },
        tooltip: "ส่งรายงาน",
        onClick: (event, rowData) => onDelete(rowData)
      }),
      rowData => ({
        icon: "delete",
        iconProps: { color: "error" },
        tooltip: "ลบรายงาน",
        onClick: (event, rowData) => onDelete(rowData)
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
      padding: "dense"
    }
  });

  const TableTitle = (
    <div>
      <ReceiptIcon className={classes.titleIcon} fontSize="large" />
      {"รายงานการตรวจรับพัสดุจ้างเหมารักษาความปลอดภัยประจำเดือน"}
    </div>
  );

  return (
    <Fragment>
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
      <Tooltip title="เพิ่มบัญชีวันทำงานฯ" aria-label="Add">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          component={Link}
          to="/courtreport/add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Fragment>
  );
};

CourtReportTable.propTypes = {
  getCourtReports: PropTypes.func.isRequired,
  courtReport: PropTypes.object.isRequired
  // deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courtReport: state.courtReport
});

export default connect(
  mapStateToProps,
  { getCourtReports }
)(withRouter(CourtReportTable));
