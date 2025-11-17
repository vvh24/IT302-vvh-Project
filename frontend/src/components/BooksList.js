/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/components/BooksList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksDataService from "../services/BooksDataService";

function BooksList() {
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");

    useEffect(() => {
        retrieveBooks();
    }, []);

    const retrieveBooks = () => {
        BooksDataService.getAll()
            .then((response) => {
                setBooks(response.data.books || []);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    };

    const onChangeSearchAuthor = (e) => {
        setSearchAuthor(e.target.value);
    };

    const findByTitle = () => {
        BooksDataService.getAll({ title: searchTitle })
            .then((response) => {
                setBooks(response.data.books || []);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const findByAuthor = () => {
        BooksDataService.getAll({ author: searchAuthor })
            .then((response) => {
                setBooks(response.data.books || []);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div>
            <h2 className="fw-bold mb-1">Books</h2>
            <p className="text-muted mb-4">
                Browse classic literature, explore authors, and read comments from book lovers.
            </p>

            {/* Search section */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={onChangeSearchTitle}
                        />
                        <button className="btn btn-primary" onClick={findByTitle}>
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by author"
                            value={searchAuthor}
                            onChange={onChangeSearchAuthor}
                        />
                        <button className="btn btn-primary" onClick={findByAuthor}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* List of books */}
            <div className="row">
                {books.map((book) => (
                    <div
                        className="col-sm-6 col-md-4 col-lg-3 mb-4"
                        key={book._id}
                    >
                        <div
                            className="card shadow-sm mx-auto"
                            style={{
                                width: "290px",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            {book.coverUrl && (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="mt-3"
                                    style={{
                                        width: "140px",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "6px"
                                    }}
                                />
                            )}

                            <div
                                className="card-body text-center"
                                style={{ padding: "0.75rem 1rem 1rem" }}
                            >
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text mb-3">
                                    {book.author}
                                    {book.year && <> ({book.year})</>}
                                </p>
                                <Link
                                    to={`/vvh_books/${book._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    View Reviews
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BooksList;