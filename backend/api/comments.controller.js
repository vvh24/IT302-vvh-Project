/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */
import CommentsDAO from "../dao/commentsDAO.js";

export default class CommentsController {
  // POST 
  static async apiPostComment(req, res) {
    try {
      const { bookKey, text, userName, userId } = req.body;
      if (!bookKey || !text || !userName || !userId) {
        return res.status(400).json({ error: "bookKey, text, userName, userId are required." });
      }
      const date = new Date();
      const result = await CommentsDAO.addComment({ bookKey, text, userName, userId, date });
      if (result.error) return res.status(500).json(result);
      return res.json({ status: "success", id: result.insertedId });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // PUT 
  static async apiUpdateComment(req, res) {
    try {
      const { commentId, userId, text } = req.body;
      if (!commentId || !userId || !text) {
        return res.status(400).json({ error: "commentId, userId, text are required." });
      }
      const date = new Date();
      const result = await CommentsDAO.updateComment({ commentId, userId, text, date });
      if (result.error) return res.status(500).json(result);
      if (!result.success) return res.status(400).json({ error: "No match or not authorized." });
      return res.json({ status: "success" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // DELETE 
  static async apiDeleteComment(req, res) {
    try {
      const { commentId, userId } = req.body;
      if (!commentId || !userId) {
        return res.status(400).json({ error: "commentId and userId are required." });
      }
      const result = await CommentsDAO.deleteComment({ commentId, userId });
      if (result.error) return res.status(500).json(result);
      if (!result.success) return res.status(400).json({ error: "No match or not authorized." });
      return res.json({ status: "success" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  // GET
  static async apiGetComments(req, res, next) {
    try {
      const bookKey = req.query.bookKey; // e.g. "/works/OL149867W"
      const filters = {};
      if (bookKey) {
        filters.bookKey = bookKey;
      }
      const commentsList = await CommentsDAO.getComments(filters);
      res.json({ comments: commentsList });
    } catch (e) {
      console.error(`apiGetComments error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}