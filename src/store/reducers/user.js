import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  FILTER_USERS,
  USER_ERROR,
  CLEAR_USERS
} from "../actions/types";

const initialState = {
  users: [],
  userdata: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        userdata: payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        // userdata: "",
        loading: false
      };
    // case GET_USER:
    //   return {
    //     ...state,
    //     userdata: payload,
    //     loading: false
    //   };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false
      };
    // case UPDATE_USER:
    //   return {
    //     ...state,
    //     users: state.users.map(user =>
    //       user._id === payload._id ? payload : user
    //     ),
    //     loading: false
    //   };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        filtered: null,
        error: null,
        current: null
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: state.users.filter(user => {
          const regex = new RegExp(`${payload}`, "gi");
          return user.name.match(regex) || user.email.match(regex);
        })
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
