import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const generateQuiz = async (quizData) => {
  const { data } = await axios.post(
    backendUrl + "/api/quiz/generate",
    quizData,
    {
      headers: {
        atoken: localStorage.getItem("token"),
      },
    }
  );

  return data;
};