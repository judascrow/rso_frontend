import axios from "axios";
import {
  GET_SEC_PERSONS,
  GET_SEC_PERSON,
  SEC_PERSON_ERROR,
  // DELETE_SEC_PERSON,
  UPDATE_SEC_PERSON
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

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

    let url = "http://localhost:8080/api/v1/sec_persons/";
    if (status !== "") {
      url = `http://localhost:8080/api/v1/sec_persons/?status=${status}`;
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

    const res = await axios.get(
      `http://localhost:8080/api/v1/sec_persons/${id}`,
      config
    );

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

// // Delete user
// export const deleteUser = id => async dispatch => {
//   try {
//     await axios.delete(`http://localhost:8080/api/v1/users/${id}`);

//     dispatch({
//       type: DELETE_USER,
//       payload: id
//     });
//   } catch (err) {
//     dispatch({
//       type: USER_ERROR
//     });
//   }
// };

// createSecPerson
export const createSecPerson = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `http://localhost:8080/api/v1/sec_persons/`,
      formData,
      config
    );

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
      `http://localhost:8080/api/v1/sec_persons/${id}`,
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
