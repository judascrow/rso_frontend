import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Logo from "../img/logo.svg";

import { login } from "../store/actions/auth";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#f5f5f5"
    }
  },
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1e88e5"
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
    backgroundColor: "#fff"
  }
}));

const Login = ({ login, isAuthenticated, error }) => {
  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = (
      <Typography variant="caption" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.bigAvatar}>
          <img src={Logo} width={96} alt="" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Security Contract Report
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            login(values.username, values.password);
          }}
          render={({ submitForm, isSubmitting, values, setFieldValue }) => (
            <Form className={classes.form} noValidate>
              <Field
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                component={TextField}
                autoFocus
              />
              <Field
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={TextField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              {errorMessage}
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
