import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const fetchChannels = createAsyncThunk(
  "channel/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchChannels();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: { channels: [], success: false, loading: false, message: "" },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.loading = true;
    },
    [fetchChannels.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.channels = payload;
      state.success = true;
    },
    [fetchChannels.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
  },
});

export default channelSlice.reducer;
