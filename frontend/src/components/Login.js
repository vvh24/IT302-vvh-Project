/**
 * Name: Valeria Heredia
 * Date: December 8, 2025
 * Course: IT302 – 451
 * Assignment: Phase 5 CUD Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //validation so empty fields can't "log in"
    if (!name.trim() || !id.trim()) {
      setError("Please enter both a user name and a user id.");
      return;
    }

    // Send user info up to App
    onLogin({
      name: name.trim(),
      id: id.trim(),
    });

    setError("");
    navigate("/vvh_books");
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Login</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginName">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginId">
              <Form.Label>User id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your User ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;