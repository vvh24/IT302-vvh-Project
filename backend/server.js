/**
 * Name: Valeria Heredia
 * Date: October 26, 2025
 * Course: IT302 – 451
 * Assignment: Phase 3 CUD MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import express from "express";
import cors from "cors";
import books from "./api/books.route.js";
import commentsRouter from "./api/comments.route.js";

const app = express();

// Allow local dev + your GitHub Pages site
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:8000",
  "https://vvh24.github.io", // <-- your GitHub Pages domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/vvh/books", books);
app.use("/api/v1/vvh", commentsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
