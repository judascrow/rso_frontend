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

import { getSecPersons } from "../../store/actions/secPerson";

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

const SecPersonTable = ({
  getSecPersons,
  //deleteUser,
  secPerson: { secPersons, loading },
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSecPersons();
  }, [getSecPersons]);

  // const onDelete = async rowData => {
  //   // var r = confirm("You want to delete " + rowData.username); //eslint-disable-line
  //   // if (r) {
  //   //   await deleteUser(rowData.id);
  //   //   await getUsers();
  //   // }
  // };

  const onEdit = rowData => {
    history.push(`/secperson/edit/` + rowData.id);
    // alert(rowData.id);
  };

  const [state] = useState({
    columns: [
      { title: "เลขบัตรประชาชน", field: "nid" },
      {
        title: "Full Name",
        field: "full_name"
      },
      {
        title: "Status",
        field: "status",
        lookup: { A: "Active", I: "Inactive" },
        render: rowData =>
          rowData.status === "A" ? (
            <Chip label="Active" color="secondary" size="small" />
          ) : (
            <Chip label="Inactive" size="small" />
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
      {"รายการเจ้าหน้าที่รักษาความปลอดภัย"}
    </div>
  );

  return (
    <Fragment>
      {secPersons !== null && !loading ? (
        <MaterialTable
          columns={state.columns}
          data={secPersons.data}
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
          to="/secperson/add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Fragment>
  );
};

SecPersonTable.propTypes = {
  getSecPersons: PropTypes.func.isRequired,
  secPerson: PropTypes.object.isRequired
  // deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  secPerson: state.secPerson
});

export default connect(
  mapStateToProps,
  { getSecPersons }
)(withRouter(SecPersonTable));
