/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let books;

export default class BooksDAO {
  static async injectDB(conn) {
    if (books) return;
    try {
      books = await conn.db(process.env.DB_NAME).collection("books_vvh");
    } catch (e) {
      console.error(`unable to connect in BooksDAO: ${e}`);
    }
  }

  static async getBooks({
    filters = null,
    page = 0,
    booksPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { title: { $regex: filters["title"], $options: "i" } };
      } else if ("author" in filters) {
        query = { author: { $regex: filters["author"], $options: "i" } };
      }
    }

    try {
      const cursor = await books
        .find(query)
        .limit(booksPerPage)
        .skip(booksPerPage * page);

      const booksList = await cursor.toArray();
      const totalNumBooks = await books.countDocuments(query);

      return { booksList, totalNumBooks };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { booksList: [], totalNumBooks: 0 };
    }
  }

  static async getBookById(id) {
    try {
      return await books.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      console.error(`getBookById error: ${e}`);
      return null;
    }
  }
}
