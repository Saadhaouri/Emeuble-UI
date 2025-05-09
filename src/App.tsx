import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../src/Components/ui/Header";
import SideMenu from "../src/Components/ui/Header";
import ProtectedRoute from "../src/Auth/ProtectedRoute";
import authStore from "./Auth/authStore";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import ReservationManagementPage from "./pages/ReservationManagementPage";
import Immeubles from "./pages/Immeubles";
import NotFound from "./pages/NotFound";
// Create a client

const App: React.FC = () => {
  const isAuth = authStore((state) => state.isAuth);

  return (
      <div className="flex flex-col h-screen">
        <Router>
          {isAuth && <Header />}
          <div className="flex flex-1 overflow-hidden">
            {isAuth && <SideMenu />}
            <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={<ProtectedRoute element={<Home />} />}
                />
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                  path="/reservations"
                  element={<ProtectedRoute element={<ReservationManagementPage />} />}
                />
             
                <Route
                  path="/payments"
                  element={<ProtectedRoute element={<Payments />} />}
                />
                <Route
                  path="/immeubles"
                  element={<ProtectedRoute element={<Immeubles />} />}
                />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
  );
};

export default App;