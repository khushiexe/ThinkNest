import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  options: [
    {
      type: String,
    },
  ],

  correctAnswer: {
    type: String,
    required: true,
  },

  explanation: {
    type: String,
    default: "",
  },

  selectedAnswer: {
    type: String,
    default: "",
  },
});

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      default: "New Quiz",
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      default: "Easy",
    },

    questions: [questionSchema],

    submitted: {
      type: Boolean,
      default: false,
    },

    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const quizModel = mongoose.models.quiz || mongoose.model("quiz", quizSchema);

export default quizModel;