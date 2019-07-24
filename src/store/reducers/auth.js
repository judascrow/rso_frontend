import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", "Bearer " + payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        error: error,
        isAuthenticated: false,
        loading: false
      };
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        error: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
