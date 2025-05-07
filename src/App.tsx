import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import Header from "./Components/ui/Header";
import SideMenu from "./Components/SideMenu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import Immeubles from "./pages/Immeubles";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="flex">
        <SideMenu />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
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
        </main>
      </div>
    </Router>
  );
};

export default App;
2