import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">ChatApp</h1>
        <div className="nav-links">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">Login</button>
          <button className="nav-btn">Register</button>
          <button className="nav-btn">Profile</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1>🚀 Welcome to the Future of Chat!</h1>
        <p>Experience seamless and real-time messaging like never before.</p>
        <button className="cta-btn">Get Started</button>
      </header>
    </div>
  );
};

export default Home;
