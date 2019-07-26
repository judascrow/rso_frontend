import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import Select from "../../components/SelectOption";
import CourtSelectOptions from "../courts/CourtSelectOptions";

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

const UserAdd = () => {
  const classes = useStyles();

  //   console.log(CourtSelectOptions());
  //const options = CourtSelectOptions();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    court: 0
  });

  const { username, email, first_name, last_name } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const [single, setSingle] = useState(null);

  function handleChangeSingle(e) {
    //   setSingle(e);
    //   if (e !== null) {
    //     setUser({ ...user, court: e.value });
    //   } else {
    //     setUser({ ...user, court: 0 });
    //   }
  }

  const onSubmit = e => {
    //   e.preventDefault();
    //   user.password = user.username;
    //   addUser(user);
    //   props.history.push("/users");
    //   setAlert("บันทึกข้อมูลเรียบร้อยแล้ว", "success");
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
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="close"
                defaultValue="รหัสผ่านตั้งต้นจะเหมือนกับ Username"
                onChange={onChange}
                disabled
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
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="off"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CourtSelectOptions />
              {/* <Select
                name={"court"}
                labelName={"ศาล"}
                value={single}
                onChange={handleChangeSingle}
                options={options}
              /> */}
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

export default UserAdd;
