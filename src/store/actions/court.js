import axios from "axios";
import { GET_COURTS, COURTS_ERROR, SET_LOADING } from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Get techs from server
export const getCourts = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    setLoading();

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const res = await axios.get("http://localhost:8080/api/v1/courts/", config);

    dispatch({
      type: GET_COURTS,
      payload: res.data.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: COURTS_ERROR,
        error: errors.message
      });
    }
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
