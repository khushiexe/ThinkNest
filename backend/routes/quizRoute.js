import express from "express";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/upload.js";

import {
  generateQuiz,
  generateQuizFromNotes,
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";


const quizRouter = express.Router();
quizRouter.post( "/upload",authUser,upload.single("notes"),generateQuizFromNotes);
quizRouter.post("/generate", authUser, generateQuiz);
// Create Quiz
quizRouter.post("/", authUser, createQuiz);

// Get All Quizzes
quizRouter.get("/", authUser, getQuizzes);

// Get Single Quiz
quizRouter.get("/:id", authUser, getQuizById);

// Submit Quiz
quizRouter.put("/:id", authUser, submitQuiz);

// Delete Quiz
quizRouter.delete("/:id", authUser, deleteQuiz);

export default quizRouter;