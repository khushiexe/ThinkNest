import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getHeaders = () => ({
  headers: {
    atoken: localStorage.getItem("token"),
  },
});

export const getChatsAPI = async () => {
  const { data } = await axios.get(
    backendUrl + "/api/chat-history",
    getHeaders()
  );

  console.log("API Response:", data);
  return data.chats;
};

export const createChatAPI = async (title) => {
  const { data } = await axios.post(
    backendUrl + "/api/chat-history",
    { title },
    getHeaders()
  );

  return data.chat;
};

export const addMessageAPI = async (chatId, message) => {
  const { data } = await axios.post(
    backendUrl + `/api/chat-history/${chatId}/message`,
    message,
    getHeaders()
  );

  return data.chat;
};

export const deleteChatAPI = async (chatId) => {
  await axios.delete(
    backendUrl + `/api/chat-history/${chatId}`,
    getHeaders()
  );
};