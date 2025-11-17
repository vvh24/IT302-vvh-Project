/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

// src/services/BooksDataService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // e.g. http://localhost:8000

class BooksDataService {
  // GET all books (optionally with filters: title, author)
  getAll(params) {
    return axios.get(`${API_URL}/api/v1/vvh/books`, { params });
  }

  // GET one book by id
  get(id) {
    return axios.get(`${API_URL}/api/v1/vvh/books/id/${id}`);
  }
  // GET comments for a book by its book key
  getComments(bookKey) {
    return axios.get(`${API_URL}/api/v1/vvh/comments`, {
      params: { bookKey }
    });
  }
}

export default new BooksDataService();