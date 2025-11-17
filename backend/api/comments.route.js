/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */
import express from "express";
import CommentsController from "./comments.controller.js";

const router = express.Router();

router.post("/comments", CommentsController.apiPostComment);
router.put("/comments", CommentsController.apiUpdateComment);
router.delete("/comments", CommentsController.apiDeleteComment);
router.get("/comments", CommentsController.apiGetComments);

export default router;