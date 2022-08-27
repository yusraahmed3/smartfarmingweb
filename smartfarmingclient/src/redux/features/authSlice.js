import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/dashboard");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "auth/update",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUser(formData);
      toast.success("Changes saved!", {
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

const user = JSON.parse(localStorage.getItem("profile"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    loading: false,
    message: "",
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("profile");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify(payload));
      state.user = payload;
      state.success = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
    [updateUserAction.pending]: (state) => {
      state.loading = true;
    },
    [updateUserAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
    },
    [updateUserAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.message;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
