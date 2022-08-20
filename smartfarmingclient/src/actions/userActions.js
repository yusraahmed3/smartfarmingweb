import * as api from "../api/index";
import { toast } from "react-toastify";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_ERROR,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
} from "../constants/userConstants";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.signIn(formData);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("profile", JSON.stringify(data));
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.configure();
    toast.error("Username/password incorrect!", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
  }
};

export const logout = (navigate) => async (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: LOGOUT });
  navigate("/");
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST });

    const { data } = await api.updateUser(user);
    dispatch({ type: UPDATE_SUCCESS, payload: data });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("profile", JSON.stringify(data));
    toast.configure();
    toast.success("Changes saved!", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: false,
      hideProgressBar: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ERROR });
    toast.configure();
    toast.error("Error saving changes", {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
    });
  }
};

// export const signUp =  (formData, navigate) =>  async(dispatch) =>{
//     try {
//         const { data } = await api.signUp(formData)
//         dispatch({type: 'SIGNUP', data} )
//         navigate('/dashboard')
//     } catch (error) {
//         console.log(error)
//     }
// }
