import * as api from "../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FETCH_CHANNEL_ERROR,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from "../constants/channelConstants";

export const fetchChannels = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CHANNEL_REQUEST });

    const { data } = await api.fetchChannels();

    dispatch({ type: FETCH_CHANNEL_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_CHANNEL_ERROR });
  }
};
