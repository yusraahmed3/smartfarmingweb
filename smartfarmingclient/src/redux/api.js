import axios from "axios";

const API = axios.create({ baseURL: "https://smartfarming-app.herokuapp.com" });

API.interceptors.request.use(function (req) {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// authentication
export const signIn = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/register-user", formData);
export const updateUser = (user) => API.put("/users/profile/", user);

// requests
export const fetchRequests = () => API.get("/requests/");
export const sendRequest = (formData) => API.post("/requests/", formData);
export const deleteRequest = (id) => API.delete(`/requests/${id}`);
export const approveRequest = (id) => API.patch(`/requests/approve/${id}`);
export const rejectRequest = (id) => API.patch(`/requests/reject/${id}`);

// channel api requests
export const fetchChannels = () => API.get("/channel/");
export const addNewChannel = (channel) =>
  API.post("/channel/addchannel/", channel);
