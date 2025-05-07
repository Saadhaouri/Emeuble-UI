import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Reservations from "../pages/Reservations";
import Clients from "../pages/Clients";
import Payments from "../pages/Payments";
import Immeubles from "../pages/Immeubles";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/immeubles" element={<Immeubles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
