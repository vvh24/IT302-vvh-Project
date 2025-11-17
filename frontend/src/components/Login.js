/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // fake password
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username");
      return;
    }

    // Fake login — set user in parent component (can improver for nexr phase)
    setUser({
      name: username,
      id: username.toLowerCase() + "123"
    });

    // Redirect to book list
    navigate("/vvh_books");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;