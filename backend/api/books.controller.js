/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

import BooksDAO from "../dao/booksDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class BooksController {
  static async apiGetBooks(req, res, next) {
    const booksPerPage = req.query.booksPerPage ? parseInt(req.query.booksPerPage) : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.author) {
      filters.author = req.query.author;
    }

    const { booksList, totalNumBooks } = await BooksDAO.getBooks({
      filters,
      page,
      booksPerPage,
    });

    res.json({
      books: booksList,
      page,
      filters,
      entries_per_page: booksPerPage,
      total_results: totalNumBooks,
    });
  }

  static async apiGetBookById(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "invalid id format" });
      }

      const book = await BooksDAO.getBookById(id);
      if (!book) return res.status(404).json({ error: "not found" });
      res.json(book);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
}
