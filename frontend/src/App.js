import React, { useState } from "react";
import "./styles/App.css";
import Home from "./pages/Home";
import Login from "./components/login"; 
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [page, setPage] = useState("home"); // State for navigation

  return (
    <div className="App">
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </nav>

      {/* Conditional Rendering Instead of Routing */}
      {page === "home" && <Home />}
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "profile" && <Profile />}
    </div>
  );
};

export default App;
