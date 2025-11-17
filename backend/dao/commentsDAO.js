/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */
import { ObjectId } from "mongodb";

let comments;

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) return;
    try {
      const dbName = process.env.DB_NAME;
      const coll = process.env.COMMENTS_COLLECTION;
      comments = await conn.db(dbName).collection(coll);
      await comments.createIndex({ bookKey: 1, lastModified: -1 });
    } catch (e) {
      console.error(`CommentsDAO.injectDB error: ${e}`);
    }
  }

  // CREATE
  static async addComment({ bookKey, text, userName, userId, date }) {
    try {
      const doc = { bookKey, text, userName, userId, lastModified: date };
      const result = await comments.insertOne(doc);
      return { success: true, insertedId: result.insertedId };
    } catch (e) {
      console.error(`addComment error: ${e}`);
      return { error: e.message };
    }
  }

  // UPDATE (only by same userId)
  static async updateComment({ commentId, userId, text, date }) {
    try {
      const updateResponse = await comments.updateOne(
        { _id: new ObjectId(commentId), userId },
        { $set: { text, lastModified: date } }
      );
      return { success: updateResponse.matchedCount === 1 };
    } catch (e) {
      console.error(`updateComment error: ${e}`);
      return { error: e.message };
    }
  }

  // DELETE (only by same userId)
  static async deleteComment({ commentId, userId }) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: new ObjectId(commentId),
        userId,
      });
      return { success: deleteResponse.deletedCount === 1 };
    } catch (e) {
      console.error(`deleteComment error: ${e}`);
      return { error: e.message };
    }
  }
  // GET
  static async getComments(filters = {}) {
    let query = {};
    if (filters.bookKey) {
      query.bookKey = filters.bookKey;
    }
    try {
      const cursor = await comments.find(query);
      const commentsList = await cursor.toArray();
      return commentsList;
    } catch (e) {
      console.error(`Unable to get comments: ${e}`);
      return [];
    }
  }
}