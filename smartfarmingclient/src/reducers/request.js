import {
  APPROVE_REQUEST,
  APPROVE_REQUEST_ERROR,
  APPROVE_REQUEST_SUCCESS,
  DECLINE_REQUEST,
  DECLINE_REQUEST_ERROR,
  DECLINE_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_ERROR,
  DELETE_REQUEST_SUCCESS,
  FETCHING_ERROR,
  FETCHING_SUCCESS,
  FETCH_ALL_REQUESTS,
  SEND_REQUEST,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_SUCCESS,
} from "../constants/requestConstants";

export const requestReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUESTS:
      return { loading: true };
    case FETCHING_SUCCESS:
      return { loading: false, requests: action.payload, success: true };
    case FETCHING_ERROR:
      return { loading: false, success: false };

    default:
      return state;

    // case "SEND":
    //   return [...requests, action.payload];
    // case "DELETE":
    //   return requests.filter((req) => req._id !== action.payload);
    // case "APPROVE":
    //   return requests.filter((r) => r.status !== action.payload.status);
    // case "REJECT":
    //   return requests.filter((r) => r.status !== action.payload.status);
  }
};
export const sendRequest = (state = { request: [] }, action) => {
  switch (action.type) {
    case SEND_REQUEST:
      return { loading: true };
    case SEND_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case SEND_REQUEST_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const approveRequest = (state = { request: [] }, action) => {
  switch (action.type) {
    case APPROVE_REQUEST:
      return { loading: true };
    case APPROVE_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case APPROVE_REQUEST_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const rejectRequest = (state = { request: [] }, action) => {
  switch (action.type) {
    case DECLINE_REQUEST:
      return { loading: true };
    case DECLINE_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case DECLINE_REQUEST_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const deleteRequest = (state = { request: [] }, action) => {
  switch (action.type) {
    case DELETE_REQUEST:
      return { loading: true };
    case DELETE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_REQUEST_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
