/**
 * Name: Valeria Heredia
 * Date: September 29, 2025
 * Course: IT302 – 451
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import express from "express";
import BooksCtrl from "./books.controller.js";

const router = express.Router();

router.route("/").get(BooksCtrl.apiGetBooks);

export default router;
