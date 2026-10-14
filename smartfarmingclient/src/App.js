
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

import LoginForm from "./components/LoginForm";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Request from "./components/Request";
import ActiveRequests from "./components/ActiveRequests";
import ManageAccount from "./components/ManageAccount";
import ReviewedRequests from "./components/ReviewedRequests";
import CardDetail from "./components/CardDetail";
import RequestDetail from "./components/RequestDetail";
import FarmSettings from "./components/FarmSettings";

import { logout } from "./redux/features/authSlice";
import { isDemoMode } from "./demoMode";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const demoRoutes = [
  "/",
  "/about",
  "/contact",
  "/dashboard",
  "/carddetail",
  "/settings",
  "/account",
  "/request"
];

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Public demo: allow visitors to explore without a backend.
    if (isDemoMode) {
      if (!demoRoutes.includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
      return;
    }

    // Normal authentication mode.
    if (user) {
      try {
        const decodedToken = jwtDecode(user.token);

        if (decodedToken.exp * 1000 < Date.now()) {
          toast.warn("Session expired. Login again", {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: true,
          });

          dispatch(logout());
          navigate("/", { replace: true });
        }
      } catch (error) {
        dispatch(logout());
        navigate("/", { replace: true });
      }
    } else if (
      !["/", "/about", "/contact"].includes(location.pathname)
    ) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, user, dispatch, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<ManageAccount />} />
        <Route path="/active" element={<ActiveRequests />} />
        <Route path="/reviewed" element={<ReviewedRequests />} />
        <Route path="/request" element={<Request />} />
        <Route path="/carddetail" element={<CardDetail />} />
        <Route path="/settings" element={<FarmSettings />} />
        <Route path="/requestdetail" element={<RequestDetail />} />
        <Route path="*" element={<LoginForm />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
