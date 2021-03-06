import axios from "axios";
//import { setAlert } from "./alert";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import { apiUrl } from "../../config";
import setAuthToken from "../../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${apiUrl}/me/`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(`${apiUrl}/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      dispatch({
        type: LOGIN_FAIL,
        error: errors.message
      });
    }
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
