import quizModel from "../models/quizModel.js";
import ai from "../config/gemini.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import mammoth from "mammoth";

export const generateQuiz = async (req, res) => {
  try {

    const { topic, difficulty, questions } = req.body;

    const response = await ai.models.generateContent({

      model: "gemini-flash-latest",

      contents: `
You are an expert teacher.

Generate exactly ${questions} multiple choice questions.

Topic: ${topic}

Difficulty: ${difficulty}

Return ONLY valid JSON.

Format:

[
  {
    "question":"",
    "options":["","","",""],
    "correctAnswer":"",
    "explanation":""
  }
]
`

    });

    const quiz = JSON.parse(response.text);

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const generateQuizFromNotes = async (req, res) => {
  try {

    let extractedText = "";

    const file = req.file;
    const numberOfQuestions = req.body.questions || 5;
    console.log("===== UPLOAD DEBUG =====");
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("========================");

    if (!file) {

      return res.status(400).json({

        success: false,

        message: "No file uploaded",

      });

    }

    const extension = file.originalname.split(".").pop().toLowerCase();

    if (extension === "pdf") {

      const data = new Uint8Array(fs.readFileSync(file.path));
    
      const pdf = await pdfjsLib.getDocument({ data }).promise;
    
      let text = "";
    
      for (let i = 1; i <= pdf.numPages; i++) {
    
        const page = await pdf.getPage(i);
    
        const content = await page.getTextContent();
    
        text += content.items.map(item => item.str).join(" ") + "\n";
    
      }
    
      extractedText = text;
    
    }

    else if (extension === "docx") {

      const result = await mammoth.extractRawText({

        path: file.path,

      });

      extractedText = result.value;

    }

    else if (extension === "txt") {

      extractedText = fs.readFileSync(file.path, "utf8");

    }

    else {

      return res.status(400).json({

        success: false,

        message: "Only PDF, DOCX and TXT files are supported.",

      });

    }

    const response = await ai.models.generateContent({

      model: "gemini-flash-latest",

      contents: `

Generate exactly ${numberOfQuestions} multiple choice questions ONLY from the following study notes.

Return ONLY valid JSON.

Format:

[
{
"question":"",
"options":["","","",""],
"correctAnswer":"",
"explanation":""
}
]

Study Notes:

${extractedText}

`

    });

    const quiz = JSON.parse(response.text);

    fs.unlinkSync(file.path);

    res.json({

      success: true,

      quiz,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// Create Quiz

export const createQuiz = async (req, res) => {
  try {

    const { topic, difficulty, questions } = req.body;

    const quiz = await quizModel.create({

      user: req.userId,

      title: `${topic} Quiz`,

      topic,

      difficulty,

      questions,

    });

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get All Quizzes

export const getQuizzes = async (req, res) => {
  try {

    const quizzes = await quizModel
      .find({ user: req.userId })
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      quizzes,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Single Quiz

export const getQuizById = async (req, res) => {
  try {

    const quiz = await quizModel.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });

    }

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Submit Quiz

export const submitQuiz = async (req, res) => {
  try {

    const { questions, score } = req.body;

    const quiz = await quizModel.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });

    }

    quiz.questions = questions;
    quiz.score = score;
    quiz.submitted = true;

    await quiz.save();

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Delete Quiz

export const deleteQuiz = async (req, res) => {
  try {

    const quiz = await quizModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });

    }

    res.json({
      success: true,
      message: "Quiz deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};