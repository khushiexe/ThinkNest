import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const uploadNotesQuiz = async (file, questions) => {

  const formData = new FormData();

  formData.append("notes", file);

  formData.append("questions", questions);

  const { data } = await axios.post(
    backendUrl + "/api/quiz/upload",
    formData,
    {
      headers: {
        atoken: localStorage.getItem("token"),
      },
    }
  );

  return data;
};