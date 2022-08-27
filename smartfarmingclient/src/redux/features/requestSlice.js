import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";

export const getRequests = createAsyncThunk(
  "request/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchRequests();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendRequest = createAsyncThunk(
  "request/send",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.sendRequest(formData);
      toast.success(
        "Request sent!. We'll send you an email after we review your application asap!",
        {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveRequest = createAsyncThunk(
  "request/approve",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.approveRequest(id);
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const declineRequest = createAsyncThunk(
  "request/decline",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.rejectRequest(id);
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "request/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteRequest(id);
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data.message);
    }
  }
);

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    loading: false,
    success: false,
    message: "",
    isApproved: false,
    isDeclined: false,
    isDeleted: false,
  },
  reducers: {
    reset: (state) => {
      state.isApproved = false;
      state.isDeclined = false;
      state.isDeleted = false;
    },
  },
  extraReducers: {
    [getRequests.pending]: (state) => {
      state.loading = true;
    },
    [getRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requests = payload;
      state.success = true;
    },
    [getRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
    [sendRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requests.push(payload);
      state.success = true;
    },
    [sendRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
    [approveRequest.pending]: (state) => {
      state.loading = true;
    },
    [approveRequest.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.isApproved = true;
    },
    [approveRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
    [declineRequest.pending]: (state) => {
      state.loading = true;
    },
    [declineRequest.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.isDeclined = true;
    },
    [declineRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
    [deleteRequest.pending]: (state) => {
      state.loading = true;
    },
    [deleteRequest.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.isDeleted = true;
    },
    [deleteRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload;
    },
  },
});

export const { reset } = requestSlice.actions;
export default requestSlice.reducer;
