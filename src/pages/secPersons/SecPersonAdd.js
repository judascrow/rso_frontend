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
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import Select from "../../components/SelectOption";

import { createSecPerson } from "../../store/actions/secPerson";

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

// Status Options
const statusOptionsList = [
  { value: "A", label: "Active - เปิดใช้งาน" },
  { value: "I", label: "Inactive - ปิดใช้งาน" }
];

const SecPersonAdd = ({ createSecPerson, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    nid: "",
    full_name: "",
    status: ""
  });

  const { nid, full_name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    createSecPerson(formData, history);
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
          <AssignmentIndIcon className={classes.titleIcon} fontSize="large" />
          {"เพิ่มเจ้าหน้าที่รักษาความปลอดภัย"}
        </Typography>

        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nid"
                name="nid"
                label="เลขบัตรประจำตัวประชาชน"
                fullWidth
                autoComplete="close"
                value={nid}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="full_name"
                name="full_name"
                label="ชื่อ-นามสกุล"
                fullWidth
                autoComplete="close"
                value={full_name}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                reactSelectID={"status"}
                options={statusOptionsList}
                onChange={handleChangeStatus}
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
                to="/secperson"
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

SecPersonAdd.propTypes = {
  createSecPerson: PropTypes.func.isRequired
};

export default connect(
  null,
  { createSecPerson }
)(withRouter(SecPersonAdd));
