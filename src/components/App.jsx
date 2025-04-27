import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import Loader from "./Loader/Loader.jsx";
import ModalConfirmLogout from "./ModalConfirmLogout/ModalConfirmLogout.jsx";

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
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
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
        position="top-right"
        draggable
        theme="colored"
      />
      <ModalConfirmLogout />
      <Loader />
    </>
  );
}

export default App;
