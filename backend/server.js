/**
 * Name: Valeria Heredia
 * Date: September 29, 2025
 * Course: IT302 – 451
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import express from 'express'
import cors from 'cors'
import books from './api/books.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/vvh/books", books)

app.use((req,res) => {
  res.status(404).json({error: "not found"})
})

export default app
