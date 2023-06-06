import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Footer from "./components/Footer.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import NavbarNoLogin from "./components/NavbarNoLogin.js";
import NavbarLogin from "./components/NavbarLogin.js";
import Register from "./components/Register.js";
import SearchActivities from "./components/SearchActivities.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarNoLogin /> <Login />{" "}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <NavbarNoLogin /> <Login />{" "}
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <NavbarNoLogin /> <Register />{" "}
              </>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <>
                <NavbarLogin /> <Dashboard />{" "}
              </>
            }
          />
          <Route
            path="/Profile"
            element={
              <>
                <NavbarLogin /> <Profile />{" "}
              </>
            }
          />
          <Route
            path="/SearchActivities"
            element={
              <>
                <NavbarLogin /> <SearchActivities />{" "}
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;