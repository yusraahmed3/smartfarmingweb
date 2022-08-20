import * as api from "../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export const fetchRequests = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_REQUESTS });
    const { data } = await api.fetchRequests();
    dispatch({ type: FETCHING_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.configure();
    toast.error("Something went wrong. Could not fetch requests", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: false,
      hideProgressBar: true,
    });
    dispatch({ type: FETCHING_ERROR });
  }
};

export const sendRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_REQUEST });
    const { data } = await api.sendRequest(formData);
    dispatch({ type: SEND_REQUEST_SUCCESS, payload: data });
    toast.configure();
    toast.success(
      "Request sent!. We'll notify you after we review your application asap!",
      {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      }
    );
  } catch (error) {
    console.log(error);
    toast.configure();
    toast.error(error.response.data.message, {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
    dispatch({ type: SEND_REQUEST_ERROR });
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });
    await api.deleteRequest(id);
    //console.log(data);
    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: id });
    toast.configure();
    toast.success("Request deleted", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
  } catch (error) {
    console.log(error);
    toast.configure();
    toast.error("Something went wrong. Please try again", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
    dispatch({ type: DELETE_REQUEST_ERROR });
  }
};

export const approveRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_REQUEST });
    const { data } = await api.approveRequest(id);

    dispatch({ type: APPROVE_REQUEST_SUCCESS, payload: data });
    console.log(data);
    toast.configure();
    toast.success("Request approved", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
  } catch (error) {
    console.log(error);
    toast.configure();
    toast.error(error.response.data.message, {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
    dispatch({ type: APPROVE_REQUEST_ERROR });
  }
};

export const rejectRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECLINE_REQUEST });
    const { data } = await api.rejectRequest(id);
    dispatch({ type: DECLINE_REQUEST_SUCCESS, payload: data });
    toast.configure();
    toast.success("Request declined", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
  } catch (error) {
    console.log(error);
    toast.configure();
    toast.error("Something went wrong. Please try again", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
    dispatch({ type: DECLINE_REQUEST_ERROR });
  }
};
