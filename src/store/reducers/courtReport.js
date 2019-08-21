import {
  GET_COURT_REPORTS,
  GET_COURT_REPORT,
  ADD_COURT_REPORT,
  DELETE_COURT_REPORT,
  UPDATE_COURT_REPORT,
  COURT_REPORT_ERROR
} from "../actions/types";

const initialState = {
  courtReports: [],
  courtReportData: "",
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case GET_COURT_REPORT:
    case UPDATE_COURT_REPORT:
      return {
        ...state,
        courtReportData: payload,
        loading: false
      };
    case GET_COURT_REPORTS:
      return {
        ...state,
        courtReports: payload,
        courtReportData: "",
        loading: false
      };
    case ADD_COURT_REPORT:
      return {
        ...state,
        courtReports: [payload, ...state.courtReports],
        loading: false
      };
    case DELETE_COURT_REPORT:
      return {
        ...state,
        courtReports: state.courtReports.filter(
          courtReport => courtReport._id !== payload
        ),
        loading: false
      };
    case COURT_REPORT_ERROR:
      return {
        ...state,
        error: error
      };
    default:
      return state;
  }
};
