/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import BooksList from "./components/BooksList";
import Book from "./components/Book";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ name: "Valeria", id: "vvh123" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <Link to="/" className="navbar-brand fw-bold">
          VVH Books Gallery
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/vvh_books" className="nav-link">
                Books
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE LOGIN / LOGOUT */}
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-3">Hello, {user.name}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/vvh_books" element={<BooksList />} />
          <Route path="/vvh_books/:id" element={<Book user={user} />} />
          <Route path="/vvh_login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;