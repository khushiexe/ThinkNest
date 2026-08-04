import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getHeaders = () => ({
  headers: {
    atoken: localStorage.getItem("token"),
  },
});

export const createQuizAPI = async (quiz) => {
  const { data } = await axios.post(
    backendUrl + "/api/quiz",
    quiz,
    getHeaders()
  );

  return data.quiz;
};

export const getQuizzesAPI = async () => {
  const { data } = await axios.get(
    backendUrl + "/api/quiz",
    getHeaders()
  );

  return data.quizzes;
};

export const submitQuizAPI = async (quizId, quizData) => {
  const { data } = await axios.put(
    backendUrl + `/api/quiz/${quizId}`,
    quizData,
    getHeaders()
  );

  return data.quiz;
};

export const deleteQuizAPI = async (quizId) => {
  await axios.delete(
    backendUrl + `/api/quiz/${quizId}`,
    getHeaders()
  );
};