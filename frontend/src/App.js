/**
 * Name: Valeria Heredia
 * Date: December 8, 2025
 * Course: IT302 – 451
 * Assignment: Phase 5 CUD Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/App.js
import React, { useState, useCallback } from "react";
import { Routes, Route, Link } from "react-router-dom";

import BooksList from "./components/BooksList";
import Book from "./components/Book";
import Login from "./components/Login";
import AddComment from "./components/AddComment";

function App() {
  const [user, setUser] = useState(null);

  // this gets passed into <Login />
  const handleLogin = useCallback((userObj) => {
    setUser(userObj);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light px-3">
        <Link to="/vvh_books" className="navbar-brand">
          VVH Books Gallery
        </Link>

        <div className="navbar-nav">
          <li className="nav-item">
            <Link to="/vvh_books" className="nav-link">
              Books
            </Link>
          </li>
        </div>

        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3">
                Logged in as <strong>{user.name}</strong> ({user.id})
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/vvh_login" className="btn btn-outline-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* list view */}
          <Route path="/" element={<BooksList />} /> 
          <Route path="/vvh_books" element={<BooksList />} />
          
          {/* single book detail */} 
          <Route path="/vvh_books/:id" element={<Book user={user} />} /> 

          <Route
            path="/vvh_books/:id/comment"
            element={<AddComment user={user} />} //add or edit comment
          />

          <Route
            path="/vvh_login"
            element={<Login onLogin={handleLogin} />} //login component
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;