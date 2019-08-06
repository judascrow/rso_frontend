import {
  GET_SEC_PERSONS,
  GET_SEC_PERSON,
  ADD_SEC_PERSON,
  DELETE_SEC_PERSON,
  UPDATE_SEC_PERSON,
  SEC_PERSON_ERROR
} from "../actions/types";

const initialState = {
  secPersons: [],
  secPersonData: "",
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEC_PERSON:
    case UPDATE_SEC_PERSON:
      return {
        ...state,
        secPersonData: payload,
        loading: false
      };
    case GET_SEC_PERSONS:
      return {
        ...state,
        secPersons: payload,
        secPersonData: "",
        loading: false
      };
    case ADD_SEC_PERSON:
      return {
        ...state,
        secPersons: [payload, ...state.secPersons],
        loading: false
      };
    case DELETE_SEC_PERSON:
      return {
        ...state,
        secPersons: state.secPersons.filter(
          secPerson => secPerson._id !== payload
        ),
        loading: false
      };
    case SEC_PERSON_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
