import axios from "axios";
import {
  GET_COURT_REPORTS,
  GET_COURT_REPORT,
  //   ADD_COURT_REPORT,
  DELETE_COURT_REPORT,
  UPDATE_COURT_REPORT,
  COURT_REPORT_ERROR
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Get SecPersons
export const getCourtReports = () => async dispatch => {
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
      "http://localhost:8080/api/v1/court_reports/",
      config
    );

    dispatch({
      type: GET_COURT_REPORTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: COURT_REPORT_ERROR,
        error: errors.message
      });
    }
  }
};

// Get CourtReport
export const getCourtReport = id => async dispatch => {
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
      `http://localhost:8080/api/v1/court_reports/${id}`,
      config
    );

    dispatch({
      type: GET_COURT_REPORT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: COURT_REPORT_ERROR,
        error: errors.message
      });
    }
  }
};

// Delete CourtReport
export const deleteCourtReport = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/court_reports/${id}`);

    dispatch({
      type: DELETE_COURT_REPORT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: COURT_REPORT_ERROR
    });
  }
};

// createCourtReport
export const createCourtReport = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `http://localhost:8080/api/v1/court_reports/`,
      formData,
      config
    );

    dispatch({
      type: GET_COURT_REPORTS,
      payload: res.data
    });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    history.push("/courtreport");
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      //errors.forEach(error => dispatch(error.Message));
      if (errors.message === "already have this period") {
        alert("มีข้อมูลของ ปี-เดือนที่ ท่านเลือกอยู่แล้ว");
      }

      dispatch({
        type: COURT_REPORT_ERROR,
        error: errors.message
      });
    }

    dispatch({
      type: COURT_REPORT_ERROR
    });
  }
};

// Update CourtReport
export const updateCourtReport = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/court_reports/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_COURT_REPORT,
      payload: res.data
    });

    history.push("/secperson");
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: COURT_REPORT_ERROR,
        payload: errors.message
      });
    }
  }
};
