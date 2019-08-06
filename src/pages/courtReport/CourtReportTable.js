import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";

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
      { title: "Period", field: "period" },
      {
        title: "Status",
        field: "status",
        lookup: { S: "Send Success", W: "Wait Send" },
        render: rowData =>
          rowData.status !== "W" ? (
            <Chip label="Send Success" color="secondary" size="small" />
          ) : (
            <Chip label="Wait Send" size="small" />
          )
      }
    ],
    actions: [
      {
        icon: "edit",
        iconProps: { color: "primary" },
        tooltip: "แก้ไขผู้ใช้งาน",
        onClick: (event, rowData) => onEdit(rowData)
      }
      // rowData => ({
      //   icon: "delete",
      //   iconProps: { color: "error" },
      //   tooltip: "ลบผู้ใช้งาน",
      //   onClick: (event, rowData) => onDelete(rowData)
      // })
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
      <AssignmentIndIcon className={classes.titleIcon} fontSize="large" />
      {"รายงานการตรวจรับพัศดุจ้างเหมารักษาความปลอดภัยประจำเดือน"}
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
      <Tooltip title="เพิ่มเจ้าหน้าที่รักษาความปลอดภัย" aria-label="Add">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          component={Link}
          to="/courtreports/add"
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
