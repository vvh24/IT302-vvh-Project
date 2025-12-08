/**
 * Name: Valeria Heredia
 * Date: December 8, 2025
 * Course: IT302 – 451
 * Assignment: Phase 5 CUD Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/components/Book.js
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BooksDataService from "../services/BooksDataService";

function Book({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load book details and its comments
  useEffect(() => {
    async function load() {
      try {
        const bookRes = await BooksDataService.get(id);
        const loadedBook = bookRes.data;
        setBook(loadedBook);

        const commentsRes = await BooksDataService.getComments(loadedBook.key);
        setComments(commentsRes.data.comments || []);
      } catch (err) {
        console.error("Error loading book or comments:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const handleDeleteComment = async (commentId, commentUserId) => {
    if (!user || user.id !== commentUserId) return;

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await BooksDataService.deleteComment(commentId, user.id);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading book...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mt-4">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/vvh_books" className="btn btn-secondary mb-3">
        ← Back to Books
      </Link>

      <div className="card p-4 shadow-sm">
        {/* Book Info */}
        <div className="d-flex mb-3">
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="me-4"
              style={{
                width: "180px",
                height: "260px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}

          <div>
            <h2>{book.title}</h2>
            <h5 className="text-muted">by {book.author}</h5>
            {book.year && <p className="mt-2">Published: {book.year}</p>}
          </div>
        </div>

        <hr />

        {/* Comments Header + Add button */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0">Comments</h4>
          {user && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                navigate(`/vvh_books/${book._id}/comment`, {
                  state: { book }, // pass book to AddComment
                })
              }
            >
              Add Comment
            </button>
          )}
        </div>

        {/* Comments List */}
        {comments.length === 0 ? (
          <p>No comments yet for this book.</p>
        ) : (
          comments.map((comment) => {
            const rawDate =
              comment.date ||
              comment.lastModified ||
              (comment.lastModified && comment.lastModified.$date);

            let formattedDate = "";
            if (rawDate) {
              try {
                formattedDate = new Date(rawDate).toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                });
              } catch (e) {
                console.error("Error formatting comment date:", e);
              }
            }

            return (
              <div key={comment._id} className="p-3 border rounded mb-2">
                <p className="mb-1">{comment.text}</p>
                <small className="text-muted">
                  — {comment.userName}
                  {formattedDate && <> ({formattedDate})</>}
                </small>

                {user && user.id === comment.userId && (
                  <div className="mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() =>
                        navigate(`/vvh_books/${book._id}/comment`, {
                          state: { book, comment }, // pass both book & comment for EDIT
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleDeleteComment(comment._id, comment.userId)
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Book;