import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const sendMessage = async (message) => {
  const { data } = await API.post("/chat", {
    message,
  });

  return data.reply;
};