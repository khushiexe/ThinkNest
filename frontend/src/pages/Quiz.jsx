import React, { useEffect, useState } from "react";
import { generateQuiz } from "../api/quiz";
import { createQuizAPI, submitQuizAPI } from "../services/quizService";
import { useQuiz } from "../context/QuizContext";
import { uploadNotesQuiz } from "../api/uploadQuiz";
import jsPDF from "jspdf";

const Quiz = ({ onHome }) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const [quiz, setQuiz] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});


  const [submitted, setSubmitted] = useState(false);
  const { loadQuizzes } = useQuiz();
  const { currentQuiz } = useQuiz();

  const handleOptionSelect = (questionIndex, option) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  }
  const handleSubmit = async () => {

    const updatedQuestions = quiz.map((question, index) => ({

      ...question,

      selectedAnswer: selectedAnswers[index] || "",

    }));

    const score = updatedQuestions.reduce(

      (total, question) =>

        question.selectedAnswer === question.correctAnswer
          ? total + 1
          : total,

      0

    );

    try {

      await submitQuizAPI(quizId, {

        questions: updatedQuestions,

        score,

      });

      setQuiz(updatedQuestions);

      setSubmitted(true);

      await loadQuizzes();

    } catch (error) {

      console.log(error);

    }

  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const data = await generateQuiz({ topic, difficulty, questions, });
      if (data.success) {

        setQuiz(data.quiz);

        setSelectedAnswers({});

        setSubmitted(false);

        const savedQuiz = await createQuizAPI({

          topic,

          difficulty,

          questions: data.quiz,

        });

        setQuizId(savedQuiz._id);
        await loadQuizzes();
        setShowQuiz(true);

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };
  const handleUploadQuiz = async () => {

    if (!selectedFile) {

      alert("Please select a file.");

      return;

    }

    setLoading(true);

    try {

      const data = await uploadNotesQuiz(selectedFile, questions);

      if (data.success) {

        setQuiz(data.quiz);

        setSelectedAnswers({});

        setSubmitted(false);

        const savedQuiz = await createQuizAPI({

          topic: selectedFile.name,

          difficulty: "From Notes",

          questions: data.quiz,

        });

        setQuizId(savedQuiz._id);

        await loadQuizzes();

        setShowQuiz(true);

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.log(error);

      alert("Upload failed.");

    }

    finally {

      setLoading(false);

    }

  };

  const handleBack = () => {
    setShowQuiz(false);      // Local quiz page (show form next time)

      setQuiz([]);
    
      setSelectedAnswers({});
    
      setSubmitted(false);
    
      setTopic("");
    
      setDifficulty("Easy");
    
      setQuestions(5);
    
      setShowQuiz(false);
    
      if (onHome) {
    
        onHome();
    
      }
    
    };
  const downloadPDF = () => {

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("ThinkNest AI Quiz", 20, y);

    y += 12;

    doc.setFontSize(12);
    doc.text(`Topic: ${topic}`, 20, y);

    y += 8;

    doc.text(`Difficulty: ${difficulty}`, 20, y);

    y += 12;

    quiz.forEach((question, index) => {

      if (y > 260) {

        doc.addPage();

        y = 20;

      }

      doc.setFontSize(14);

      doc.text(`${index + 1}. ${question.question}`, 20, y);

      y += 8;

      question.options.forEach((option) => {

        doc.setFontSize(11);

        const splitOption = doc.splitTextToSize(option, 165);

        doc.text(splitOption, 28, y);

        y += splitOption.length * 6;

      });

      doc.setFontSize(11);

      doc.text(
        `Correct Answer: ${question.correctAnswer}`,
        20,
        y
      );

      y += 8;

      const explanation = doc.splitTextToSize(
        `Explanation: ${question.explanation}`,
        170
      );

      doc.text(explanation, 20, y);

      y += explanation.length * 6 + 8;

    });

    doc.save(`${topic}_Quiz.pdf`);

  };


  useEffect(() => {

    if (!currentQuiz) return;

    setTopic(currentQuiz.topic);

    setDifficulty(currentQuiz.difficulty);

    setQuiz(currentQuiz.questions);

    setQuizId(currentQuiz._id);

    setShowQuiz(true);

    setSubmitted(currentQuiz.submitted);

    const answers = {};

    currentQuiz.questions.forEach((question, index) => {

      answers[index] = question.selectedAnswer || "";

    });

    setSelectedAnswers(answers);

  }, [currentQuiz]);


  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-8">

      <div className="max-w-4xl mx-auto">
        {!showQuiz ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-deep"> AI Quiz Generator </h1>

            <p className="text-center text-gray-500 mt-2"> Generate quizzes instantly using AI </p>

            {/* Topic */}
            <div className="mt-8">

              <label className="block font-medium mb-2">  Topic </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3" />
            </div>

            {/* Difficulty */}
            <div className="mt-6">
              <label className="block font-medium mb-2"> Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div className="mt-6">
              <label className="block font-medium mb-2"> Number of Questions </label>
              <select value={questions} onChange={(e) => setQuestions(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3" >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            {/* Upload Notes */}

            <div className="mt-6">

              <label className="block font-medium mb-2">

                Upload Notes (PDF / DOCX / TXT)

              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-8 bg-secondary text-deep font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all" >
              {loading ? "Generating..." : "Generate Quiz"}
            </button>
            <button
              onClick={handleUploadQuiz}
              disabled={loading}
              className="w-full mt-4 bg-deep text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all"
            >

              {loading ? "Uploading..." : "Generate Quiz from Notes"}

            </button>
          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex justify-between items-center mb-8">

                <button  onClick={handleBack} className="text-secondary font-semibold">
                  🏠 AI Home
                </button>
              <button
                onClick={downloadPDF}
                className="bg-secondary text-deep px-5 py-2 rounded-lg font-semibold"
              >
                Download PDF
              </button>

            </div>

            <h1 className="text-3xl font-bold mb-8">
              {topic} Quiz
            </h1>

            {quiz.map((question, index) => (

              <div
                key={index}
                className="border rounded-xl p-6 mb-6"
              >

                <h3 className="font-semibold text-lg mb-4">
                  {index + 1}. {question.question}
                </h3>

                <div className="space-y-3">

                  {question.options.map((option, optionIndex) => (

                    <label
                      key={optionIndex}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all
          
                        ${submitted
                          ? option === question.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : selectedAnswers[index] === option
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          : selectedAnswers[index] === option
                            ? "border-secondary bg-yellow-50"
                            : "border-gray-300"
                        }
                        `}
                    >

                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={selectedAnswers[index] === option}
                        onChange={() => handleOptionSelect(index, option)}
                      />

                      <span>{option}</span>

                    </label>

                  ))}

                </div>

                {submitted && (

                  <div className="mt-5 p-4 rounded-lg border border-blue-200 bg-blue-50">

                    <h4 className="font-semibold">
                      Explanation
                    </h4>

                    <p className="text-gray-600 mt-2">
                      {question.explanation}
                    </p>

                  </div>

                )}

              </div>

            ))}

            {submitted && (

              <div className="bg-green-100 border border-green-400 rounded-xl p-6 mb-6 text-center">

                <h2 className="text-3xl font-bold text-green-700">

                  Score : {

                    quiz.reduce(
                      (score, question, index) =>
                        selectedAnswers[index] === question.correctAnswer
                          ? score + 1
                          : score,
                      0
                    )

                  } / {quiz.length}

                </h2>

              </div>

            )}

            <div className="flex justify-center mt-8">

              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="bg-secondary text-deep font-semibold px-8 py-3 rounded-lg hover:scale-[1.02] transition-all disabled:opacity-50"
              >

                {submitted ? "Quiz Submitted" : "Submit Quiz"}

              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;