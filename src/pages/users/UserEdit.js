import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonOutlined";
import Select from "../../components/SelectOption";

import CourtSelectOptions from "../courts/CourtSelectOptions";
import { getUser, updateUser } from "../../store/actions/user";

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
  }
}));

// Role Options
const roleOptionsList = [
  { value: 2, label: "เจ้าหน้าที่ศาล" },
  { value: 1, label: "ผู้ดูแลระบบ" }
];

// Status Options
const statusOptionsList = [
  { value: "A", label: "Active - เปิดใช้งาน" },
  { value: "I", label: "Inactive - ปิดใช้งาน" }
];

const UserEdit = ({
  getUser,
  updateUser,
  user: { userdata, loading },
  history,
  match
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role_id: 0,
    court_id: 0,
    status: ""
  });

  useEffect(() => {
    getUser(match.params.id);

    setFormData({
      username: loading || !userdata.username ? "" : userdata.username,
      password: loading || !userdata.password ? "" : userdata.password,
      first_name: loading || !userdata.first_name ? "" : userdata.first_name,
      last_name: loading || !userdata.last_name ? "" : userdata.last_name,
      role_id: loading || !userdata.role_id ? 0 : userdata.role_id,
      court_id: loading || !userdata.court_id ? 0 : userdata.court_id,
      status: loading || !userdata.status ? "" : userdata.status
    });
    // eslint-disable-next-line
  }, [
    loading,
    getUser,
    match.params.id,
    userdata.username,
    userdata.password,
    userdata.first_name,
    userdata.last_name,
    userdata.role_id,
    userdata.court_id,
    userdata.status
  ]);

  const {
    username,
    password,
    first_name,
    last_name,
    role_id,
    court_id,
    status
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Court Options
  //const [courtOptions, setCourtOptions] = useState(null);
  const handleChangeCourt = e => {
    //setCourtOptions(e);
    if (e !== null) {
      setFormData({ ...formData, court_id: e.value });
    } else {
      setFormData({ ...formData, court_id: 0 });
    }
  };

  // Change Role Options
  const handleChangeRole = e => {
    if (e !== null) {
      setFormData({ ...formData, role_id: e.value });
    } else {
      setFormData({ ...formData, role_id: 0 });
    }
  };

  const handleChangeStatus = e => {
    if (e !== null) {
      setFormData({ ...formData, status: e.value });
    } else {
      setFormData({ ...formData, status: "" });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    updateUser(match.params.id, formData, history);
    // addUser(user);
    // props.history.push("/users");
    // setAlert("บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Typography
          variant="h6"
          component="h3"
          className={classes.title}
          gutterBottom
        >
          <PersonAddOutlinedIcon
            className={classes.titleIcon}
            fontSize="large"
          />
          {"แก้ไขผู้ใช้งาน"}
        </Typography>

        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                autoComplete="close"
                value={username}
                onChange={onChange}
                InputProps={{
                  readOnly: true
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="close"
                value={password}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="first_name"
                name="first_name"
                label="ชื่อ"
                fullWidth
                autoComplete="fname"
                value={first_name}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="last_name"
                name="last_name"
                label="นามสกุล"
                fullWidth
                autoComplete="lname"
                value={last_name}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CourtSelectOptions
                reactSelectID={"court"}
                name={"court"}
                labelName={"ศาล"}
                value={court_id}
                onChange={handleChangeCourt}
                isClearable={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                reactSelectID={"role"}
                options={roleOptionsList}
                onChange={handleChangeRole}
                value={roleOptionsList.find(s => s.value === role_id)}
                labelName={"ระดับของผู้ใช้งาน"}
                defaultValue={roleOptionsList[0]}
                isClearable={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="status"
                reactSelectID={"status"}
                options={statusOptionsList}
                onChange={handleChangeStatus}
                value={statusOptionsList.find(s => s.value === status)}
                labelName={"สถานะ"}
                defaultValue={statusOptionsList[0]}
                isClearable={false}
              />
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
                to="/user"
                className={classes.button}
              >
                ยกเลิก
              </Button>
            </div>
          </Grid>
        </form>
      </Paper>
    </Fragment>
  );
};

UserEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(withRouter(UserEdit));
