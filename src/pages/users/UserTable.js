import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    //history.push(`/users/edit/` + rowData.id);
    alert(rowData.id);
  };

  const [state] = useState({
    columns: [
      { title: "Username", field: "username" },
      {
        title: "Full Name",
        field: "first_name",
        render: rowData => rowData.first_name + " " + rowData.last_name
      },
      { title: "Court", field: "court.name" }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ],
    actions: [
      {
        icon: "edit",
        iconProps: { color: "primary" },
        tooltip: "Edit User",
        onClick: (event, rowData) => onEdit(rowData)
      },
      rowData => ({
        icon: "delete",
        iconProps: { color: "error" },
        tooltip: "Delete User",
        onClick: (event, rowData) => onDelete(rowData)
      })
    ],
    options: {
      actionsColumnIndex: -1,
      pageSize: 5,
      headerStyle: {
        backgroundColor: "#03a9f4",
        color: "#fff"
      }
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
      <Tooltip title="เพิ่มข้อมูล" aria-label="Add">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          component={Link}
          to="/users/add"
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
)(UserTable);
