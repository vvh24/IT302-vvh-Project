/**
 * Name: Valeria Heredia
 * Date: December 8, 2025
 * Course: IT302 – 451
 * Assignment: Phase 5 CUD Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/components/AddComment.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import BooksDataService from "../services/BooksDataService";

function AddComment({ user }) {
  const { id } = useParams(); // book _id from route
  const location = useLocation();
  const navigate = useNavigate();

  // If we came from Book.js, these will be provided
  const initialBookFromState = location.state?.book || null;
  const commentFromState = location.state?.comment || null;

  const [book, setBook] = useState(initialBookFromState);
  const [text, setText] = useState(commentFromState?.text || "");
  const [isEditing, setIsEditing] = useState(!!commentFromState);
  const [message, setMessage] = useState("");

  // If book wasn't passed in state (e.g., page refresh), fetch it
  useEffect(() => {
    if (!book) {
      BooksDataService.get(id)
        .then((res) => setBook(res.data))
        .catch((err) => {
          console.error("Error loading book for comment form:", err);
          setMessage("Unable to load book information.");
        });
    }
  }, [book, id]);

  if (!user) {
    return (
      <div className="container mt-4">
        <p>You must be logged in to add or edit a comment.</p>
        <Link to="/vvh_login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!book) {
    // still loading or failed to fetch
    return (
      <div className="container mt-4">
        <p>Loading book information...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!text.trim()) {
      setMessage("Comment text cannot be empty.");
      return;
    }

    try {
      if (isEditing && commentFromState) {
        // UPDATE existing comment
        await BooksDataService.updateComment({
          commentId: commentFromState._id,
          text,
          userId: user.id,
        });
        setMessage("Comment updated successfully.");
      } else {
        // CREATE new comment
        await BooksDataService.createComment({
          bookKey: book.key, // this matches backend field name
          text,
          userName: user.name,
          userId: user.id,
        });
        setMessage("Comment created successfully.");
      }

      // After success, go back to the book detail page
      navigate(`/vvh_books/${book._id}`);
    } catch (err) {
      console.error("Error saving comment:", err);
      setMessage("Error creating or updating comment.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isEditing ? "Edit Comment" : "Add Comment"}</h3>
      <p className="text-muted mb-3">
        Book: <strong>{book.title}</strong> by {book.author}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {message && (
          <div
            className={`alert ${
              message.toLowerCase().startsWith("error")
                ? "alert-warning"
                : "alert-success"
            }`}
          >
            {message}
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Comment" : "Submit Comment"}
        </button>

        <button
          type="button"
          className="btn btn-link ms-2"
          onClick={() => navigate(`/vvh_books/${book._id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddComment;