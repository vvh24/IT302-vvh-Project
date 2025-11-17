/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/components/Book.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BooksDataService from "../services/BooksDataService";

function Book({ user }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    //Get the book details
    BooksDataService.get(id)
      .then((response) => {
        const bookData = response.data;
        setBook(bookData);

        //Once we have the book, use its key to get comments
        if (bookData.key) {
          BooksDataService.getComments(bookData.key)
            .then((res) => {
              setComments(res.data.comments || []);
            })
            .catch((e) => console.log("Error getting comments:", e));
        }
      })
      .catch((e) => console.log("Error getting book:", e));
  }, [id]);

  if (!book) {
    return <p className="text-center mt-4">Loading book...</p>;
  }

  return (
    <div className="container mt-4">
      <Link to="/vvh_books" className="btn btn-secondary mb-3">
        ← Back to Books
      </Link>

      <div className="card p-4 shadow-sm">
        {/* Book Cover & Title Row */}
        <div className="d-flex">
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
          </div>
        </div>

        <hr />

        <h4>Comments</h4>

        {comments.length === 0 ? (
          <p>No comments yet for this book.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-2 border rounded mb-2">
              <p>{comment.text}</p>
              <small className="text-muted">
                — {comment.userName} ({new Date(comment.lastModified).toLocaleString?.() || ""})
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Book;