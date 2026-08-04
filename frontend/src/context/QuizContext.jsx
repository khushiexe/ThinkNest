import { createContext, useContext, useEffect, useState } from "react";

import {
  getQuizzesAPI,
  deleteQuizAPI,
} from "../services/quizService";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

  const [quizzes, setQuizzes] = useState([]);

  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {

    loadQuizzes();

  }, []);

  const loadQuizzes = async () => {

    try {

      const data = await getQuizzesAPI();

      setQuizzes(data);

      if (data.length > 0) {

        setCurrentQuiz(data[0]);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const deleteQuiz = async (quizId) => {

    try {

      await deleteQuizAPI(quizId);

      const updated = quizzes.filter(
        (quiz) => quiz._id !== quizId
      );

      setQuizzes(updated);

      if (currentQuiz?._id === quizId) {

        setCurrentQuiz(
            updated.length ? updated[0] : null
        );
    
    }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <QuizContext.Provider
    value={{
        quizzes,
        setQuizzes,
    
        currentQuiz,
        setCurrentQuiz,
    
        loadQuizzes,
        deleteQuiz,
    }}
    >

      {children}

    </QuizContext.Provider>

  );

};

export const useQuiz = () => useContext(QuizContext);