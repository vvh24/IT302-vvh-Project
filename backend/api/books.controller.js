/**
 * Name: Valeria Heredia
 * Date: September 29, 2025
 * Course: IT302 – 451
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import BooksDAO from '../dao/booksDAO.js';

export default class BooksController {
    static async apiGetBooks(req, res, next) {
        const booksPerPage = req.query.booksPerPage ? parseInt(req.query.booksPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.title) {
            filters.title = req.query.title
        } else if (req.query.author) {
            filters.author = req.query.author
        }
        const { booksList, totalNumBooks } = await BooksDAO.getBooks({
            filters,page,booksPerPage
        })

        let response = {
            books: booksList,
            page: page,
            filters: filters,
            entries_per_page: booksPerPage,
            total_results: totalNumBooks,
        }
        res.json(response)
    }
}