import axios from "axios";
import {
  GET_USERS,
  GET_USER,
  USER_ERROR,
  DELETE_USER,
  UPDATE_USER
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Get users
export const getUsers = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const res = await axios.get("http://localhost:8080/api/v1/users/", config);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: USER_ERROR,
        error: errors.message
      });
    }
  }
};

// Get users
export const getUser = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const res = await axios.get(
      `http://localhost:8080/api/v1/users/${id}`,
      config
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: USER_ERROR,
        error: errors.message
      });
    }
  }
};

// Delete user
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/users/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};

// Create or update profile
export const createUser = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `http://localhost:8080/api/v1/users/`,
      formData,
      config
    );

    dispatch({
      type: GET_USERS,
      payload: res.data
    });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push("/user");
    }
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      //errors.forEach(error => dispatch(error.Message));
      dispatch({
        type: USER_ERROR,
        error: errors.message
      });
    }

    dispatch({
      type: USER_ERROR
    });
  }
};

// Update User
export const updateUser = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/users/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    history.push("/user");
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.msg
    });
  }
};
