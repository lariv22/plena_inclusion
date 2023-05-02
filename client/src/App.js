import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddActivity from "./components/AddActivity.js";
import Dashboard from "./components/Dashboard.js";
import Footer from "./components/Footer.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";
import ActivityProfile from "./components/ActivityProfile.js";
import SearchActivities from "./components/SearchActivities.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SearchActivities" element={<SearchActivities />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
