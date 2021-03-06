import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";

import { getUsers, deleteUser } from "../../store/actions/user";

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

const UserTable = ({
  getUsers,
  deleteUser,
  user: { users, loading },
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onDelete = async rowData => {
    var r = confirm("You want to delete " + rowData.username); //eslint-disable-line
    if (r) {
      await deleteUser(rowData.id);
      await getUsers();
    }
  };

  const onEdit = rowData => {
    history.push(`/user/edit/` + rowData.id);
    // alert(rowData.id);
  };

  const [state] = useState({
    columns: [
      { title: "Username", field: "username" },
      {
        title: "Full Name",
        field: "first_name",
        render: rowData => rowData.first_name + " " + rowData.last_name
      },
      { title: "Court", field: "court.name" },
      {
        title: "Status",
        field: "status",
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
      },
      rowData => ({
        icon: "delete",
        iconProps: { color: "error" },
        tooltip: "ลบผู้ใช้งาน",
        onClick: (event, rowData) => onDelete(rowData)
      })
    ],
    options: {
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
      <PeopleOutlineIcon className={classes.titleIcon} fontSize="large" />
      {"ผู้ใช้งาน"}
    </div>
  );

  return (
    <Fragment>
      {users !== null && !loading ? (
        <MaterialTable
          columns={state.columns}
          data={users.data}
          title={TableTitle}
          actions={state.actions}
          options={state.options}
        />
      ) : (
        <LinearProgress />
      )}
      <Tooltip title="เพิ่มผู้ใช้งาน" aria-label="Add">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          component={Link}
          to="/user/add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Fragment>
  );
};

UserTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(withRouter(UserTable));
