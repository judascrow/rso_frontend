import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Select from "../../components/SelectOption";

import CourtSelectOptions from "../courts/CourtSelectOptions";
import { createUser } from "../../store/actions/user";

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

const UserAdd = ({ createUser, history }) => {
  const classes = useStyles();

  //   console.log(CourtSelectOptions());
  //const options = CourtSelectOptions();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role_id: 2,
    court_id: 0
  });

  const { username, password, first_name, last_name, role_id } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [courtOptions, setCourtOptions] = useState(null);

  const handleChangeCourt = e => {
    setCourtOptions(e);
    if (e !== null) {
      setFormData({ ...formData, court_id: e.value });
    } else {
      setFormData({ ...formData, court_id: 0 });
    }
  };

  const roleOptionsList = [
    { value: 2, label: "เจ้าหน้าที่ศาล" },
    { value: 1, label: "ผู้ดูแลระบบ" }
  ];

  const [roleOptions, setRoleOptions] = useState(null);

  const handleChangeRole = e => {
    setRoleOptions(e);
    if (e !== null) {
      setFormData({ ...formData, role_id: e.value });
    } else {
      setFormData({ ...formData, role_id: 0 });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    createUser(formData, history);
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
          {"เพิ่มผู้ใช้งาน"}
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
            {/* <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="off"
                value={email}
                onChange={onChange}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <CourtSelectOptions
                name={"court"}
                labelName={"ศาล"}
                value={courtOptions}
                onChange={handleChangeCourt}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                options={roleOptionsList}
                onChange={handleChangeRole}
                //value={roleOptions}
                labelName={"ระดับของผู้ใช้งาน"}
                defaultValue={roleOptionsList[0]}
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

UserAdd.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { createUser }
)(withRouter(UserAdd));
