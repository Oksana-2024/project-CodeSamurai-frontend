import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import Loader from "./Loader/Loader.jsx";
import ModalConfirmLogout from "./ModalConfirmLogout/ModalConfirmLogout.jsx";
import ModalAddTransaction from "./ModalAddTransaction/ModalAddTransaction.jsx";
import { useDispatch } from "react-redux";
import { currentUser } from "../redux/auth/operations.js";

const Login = lazy(() => import("../pages/LoginPage/LoginPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const Registration = lazy(() => import("../pages/RegistrationPage/RegistrationPage"));
const HomeTab = lazy(() => import("../pages/DashboardPage/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("../pages/DashboardPage/StatisticsTab/StatisticsTab"));
const CurrencyTab = lazy(() => import("../pages/DashboardPage/CurrencyTab/CurrencyTab"));

function App() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<RestrictedRoute redirectTo="/dashboard" component={<Login />} />} />
          <Route path="/register" element={<RestrictedRoute redirectTo="/dashboard" component={<Registration />} />} />
          <Route path="/dashboard" element={<PrivateRoute redirectTo="/login" component={<Dashboard />} />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />

            <Route path="statistics" element={<StatisticsTab />} />

            {isSmallScreen && <Route path="currency" element={<CurrencyTab />} />}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer
        pauseOnHover
        position="bottom-left"
        draggable
        theme="colored"
      />
      <ModalConfirmLogout />
      <ModalAddTransaction />
      <Loader />
    </>
  );
}

export default App;
