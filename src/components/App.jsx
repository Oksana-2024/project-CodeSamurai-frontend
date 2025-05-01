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
import ModalEditTransaction from "./ModalEditTransaction/ModalEditTransaction.jsx";
import UserModal from "./UserModal/UserModal.jsx";
import { useAuth } from "../redux/auth/slice.js";

const Login = lazy(() => import("../pages/LoginPage/LoginPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const Registration = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const HomeTab = lazy(() => import("../pages/DashboardPage/HomeTab/HomeTab"));
const StatisticsTab = lazy(() =>
  import("../pages/DashboardPage/StatisticsTab/StatisticsTab")
);
const CurrencyTab = lazy(() =>
  import("../pages/DashboardPage/CurrencyTab/CurrencyTab")
);

function App() {
  const { isLoggedIn } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(currentUser());
  }, [dispatch, isLoggedIn]);
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute redirectTo="/dashboard" component={<Login />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/dashboard"
                component={<Registration />}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute redirectTo="/login" component={<Dashboard />} />
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />

            <Route path="statistics" element={<StatisticsTab />} />

            {isSmallScreen && (
              <Route path="currency" element={<CurrencyTab />} />
            )}
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
      <ModalEditTransaction />
      <UserModal />
      <Loader />
    </>
  );
}

export default App;
