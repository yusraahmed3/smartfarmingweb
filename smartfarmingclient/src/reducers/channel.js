import {
  FETCH_CHANNEL_ERROR,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from "../constants/channelConstants";

export const fetchChannels = (state = { channels: [] }, action) => {
  switch (action.type) {
    case FETCH_CHANNEL_REQUEST:
      return { loading: true };
    case FETCH_CHANNEL_SUCCESS:
      return { loading: false, channels: action.payload, success: true };
    case FETCH_CHANNEL_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
