/**
 * Name: Valeria Heredia
 * Date: November 16, 2025
 * Course: IT302 – 451
 * Assignment: Phase 4 Read Node.js Data using React.js Assignment
 * Email: vvh@njit.edu
 */
import express from "express";
import BooksCtrl from "./books.controller.js";

const router = express.Router();

router.route("/").get(BooksCtrl.apiGetBooks);
router.route("/id/:id").get(BooksCtrl.apiGetBookById);

export default router;
