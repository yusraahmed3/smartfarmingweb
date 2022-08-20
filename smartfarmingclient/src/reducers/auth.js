import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_ERROR,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userAuth = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userData: action.payload };
    case LOGIN_ERROR:
      return { loading: false };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userUpdate = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return { loading: true };
    case UPDATE_SUCCESS:
      return { loading: false, userData: action.payload };
    case UPDATE_ERROR:
      return { loading: false };
    default:
      return state;
  }
};
