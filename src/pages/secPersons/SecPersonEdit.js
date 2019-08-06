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
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import Select from "../../components/SelectOption";

import { getSecPerson, updateSecPerson } from "../../store/actions/secPerson";

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

const SecPersonEdit = ({
  getSecPerson,
  updateSecPerson,
  secPerson: { secPersonData, loading },
  history,
  match
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    nid: "",
    full_name: "",
    status: ""
  });

  useEffect(() => {
    getSecPerson(match.params.id);

    setFormData({
      nid: loading || !secPersonData.nid ? "" : secPersonData.nid,
      full_name:
        loading || !secPersonData.full_name ? "" : secPersonData.full_name,
      status: loading || !secPersonData.status ? "" : secPersonData.status
    });
    // eslint-disable-next-line
  }, [
    loading,
    getSecPerson,
    match.params.id,
    secPersonData.nid,
    secPersonData.full_name,
    secPersonData.status
  ]);

  const { nid, full_name, status } = formData;
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
    updateSecPerson(match.params.id, formData, history);
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
          {"แก้ไขข้อมูลเจ้าหน้าที่รักษาความปลอดภัย"}
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
                autoComplete="off"
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
                autoComplete="off"
                value={full_name}
                onChange={onChange}
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

SecPersonEdit.propTypes = {
  updateSecPerson: PropTypes.func.isRequired,
  getSecPerson: PropTypes.func.isRequired,
  secPerson: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  secPerson: state.secPerson
});
export default connect(
  mapStateToProps,
  { updateSecPerson, getSecPerson }
)(withRouter(SecPersonEdit));
