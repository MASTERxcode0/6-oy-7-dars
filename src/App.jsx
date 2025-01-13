import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home.jsx";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuth = !!token;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      navigate("/login");
    }
  }, []);

  function PrivateRoute({ children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          index
          element={
            <PrivateRoute>
              <Home></Home>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
