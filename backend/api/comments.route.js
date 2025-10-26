/**
 * Name: Valeria Heredia
 * Date: October 26, 2025
 * Course: IT302 – 451
 * Assignment: Phase 3 CUD MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import express from "express";
import CommentsController from "./comments.controller.js";

const router = express.Router();

router.post("/comments", CommentsController.apiPostComment);
router.put("/comments", CommentsController.apiUpdateComment);
router.delete("/comments", CommentsController.apiDeleteComment);

export default router;