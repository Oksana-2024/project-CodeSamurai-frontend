import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("../pages/LoginPage/LoginPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const Registration = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute redirectTo="/login" component={<Dashboard />} />
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
