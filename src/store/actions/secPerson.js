import axios from "axios";
import {
  GET_SEC_PERSONS,
  GET_SEC_PERSON,
  SEC_PERSON_ERROR,
  DELETE_SEC_PERSON,
  UPDATE_SEC_PERSON
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { apiUrl } from "../../config";

// Get SecPersons
export const getSecPersons = (status = "") => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    let url = `${apiUrl}/sec_persons/`;
    if (status !== "") {
      url = `${apiUrl}/sec_persons/?status=${status}`;
    }

    const res = await axios.get(url, config);

    dispatch({
      type: GET_SEC_PERSONS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: SEC_PERSON_ERROR,
        error: errors.message
      });
    }
  }
};

// Get SecPerson
export const getSecPerson = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const res = await axios.get(`${apiUrl}/sec_persons/${id}`, config);

    dispatch({
      type: GET_SEC_PERSON,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch({
        type: SEC_PERSON_ERROR,
        error: errors.message
      });
    }
  }
};

// Delete deleteSecPerson
export const deleteSecPerson = id => async dispatch => {
  try {
    await axios.delete(`${apiUrl}/sec_persons/${id}`);

    dispatch({
      type: DELETE_SEC_PERSON,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: SEC_PERSON_ERROR
    });
  }
};

// createSecPerson
export const createSecPerson = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`${apiUrl}/sec_persons/`, formData, config);

    dispatch({
      type: GET_SEC_PERSONS,
      payload: res.data
    });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    history.push("/secperson");
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      //errors.forEach(error => dispatch(error.Message));
      dispatch({
        type: SEC_PERSON_ERROR,
        error: errors.message
      });
    }

    dispatch({
      type: SEC_PERSON_ERROR
    });
  }
};

// Update SecPerson
export const updateSecPerson = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      `${apiUrl}/sec_persons/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_SEC_PERSON,
      payload: res.data
    });

    history.push("/secperson");
  } catch (err) {
    dispatch({
      type: SEC_PERSON_ERROR,
      payload: err.response.msg
    });
  }
};
