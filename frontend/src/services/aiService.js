import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getHeaders = () => ({
  headers: {
    localStorage.setItem("token", data.token);
  },
});

export const createChat = async (title = "New Chat") => {
  const { data } = await axios.post(
    `${backendUrl}/api/chat-history`,
    { title },
    getHeaders()
  );

  return data.chat;
};

export const getChats = async () => {
  const { data } = await axios.get(
    `${backendUrl}/api/chat-history`,
    getHeaders()
  );

  return data.chats;
};

export const addMessage = async (chatId, role, text) => {
  const { data } = await axios.post(
    `${backendUrl}/api/chat-history/${chatId}/message`,
    { role, text },
    getHeaders()
  );

  return data.chat;
};

export const deleteChat = async (chatId) => {
  await axios.delete(
    `${backendUrl}/api/chat-history/${chatId}`,
    getHeaders()
  );
};