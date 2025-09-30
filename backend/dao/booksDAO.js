/**
 * Name: Valeria Heredia
 * Date: September 29, 2025
 * Course: IT302 – 451
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
let books

export default class BooksDAO {
    static async injectDB(conn) {
        if (books) {
            return
        }
        try {
            books = await conn.db(process.env.BOOKSREVIEWS_NS).collection('books')
        } catch (e) {
            console.error(`unable to connect in BooksDAO: ${e}`)
        }
    }

    static async getBooks({
        filters = null,
        page = 0,
        booksPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { title: { $regex: filters['title'], $options: "i" } }
            } else if ("author" in filters) {
                query = { author: { $regex: filters['author'], $options: "i" } }
            }
        }

        let cursor
        try {
            cursor = await books
                .find(query)
                .limit(booksPerPage)
                .skip(booksPerPage * page)

            const booksList = await cursor.toArray()
            const totalNumBooks = await books.countDocuments(query)

            return { booksList, totalNumBooks }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            console.error(e)
            return { booksList: [], totalNumBooks: 0 }
        }
    }
}
