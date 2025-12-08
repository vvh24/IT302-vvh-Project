/**
 * Name: Valeria Heredia
 * Date: December 8, 2025
 * Course: IT302 – 451
 * Assignment: Phase 5 CUD Node.js Data using React.js Assignment
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

  // CREATE a new comment
  createComment(data) {
    // data should match what your backend expects:
    // { bookKey, text, userName, userId }
    return axios.post(`${API_URL}/api/v1/vvh/comments`, data);
  }

  // UPDATE an existing comment
  updateComment(data) {
    // data: { commentId, text, userId }
    return axios.put(`${API_URL}/api/v1/vvh/comments`, data);
  }

  // DELETE a comment
  deleteComment(commentId, userId) {
    // Axios DELETE sends body via "data"
    return axios.delete(`${API_URL}/api/v1/vvh/comments`, {
      data: { commentId, userId },
    });
  }
}

export default new BooksDataService();