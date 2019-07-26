import { GET_COURTS, COURTS_ERROR, SET_LOADING } from "../actions/types";

const initialState = {
  courts: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COURTS:
      return {
        ...state,
        courts: payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case COURTS_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
