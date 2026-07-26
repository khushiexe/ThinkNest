import { createContext, useContext, useEffect, useState } from "react";
import {
  getChatsAPI,
  createChatAPI,
  addMessageAPI,
  deleteChatAPI,
} from "../services/chatHistoryService";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const savedChats = await getChatsAPI();

      const formattedChats = savedChats.map((chat) => ({
        id: chat._id,
        title: chat.title,
        createdAt: chat.createdAt,
        messages: chat.messages.map((message, index) => ({
          id: `${chat._id}-${index}`,
          role: message.role,
          text: message.text,
        })),
      }));

      setChats(formattedChats);

      if (formattedChats.length > 0) {
        setCurrentChatId(formattedChats[0].id);
      }
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  };

  const createNewChat = async (firstMessage = null) => {
    try {
      const title =
        typeof firstMessage === "string"
          ? firstMessage.length > 30
            ? firstMessage.slice(0, 30) + "..."
            : firstMessage
          : "New Chat";

      const chat = await createChatAPI(title);

      const newChat = {
        id: chat._id,
        title: chat.title,
        createdAt: chat.createdAt,
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(newChat.id);

      return newChat;
    } catch (error) {
      console.error("Create chat error:", error);
      return null;
    }
  };

  const updateChatTitle = (chatId, title) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title } : chat
      )
    );
  };

  const addMessage = async (chatId, message) => {
    try {
      await addMessageAPI(chatId, {
        role: message.role,
        text: message.text,
      });

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, message],
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Add message error:", error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await deleteChatAPI(chatId);

      setChats((prev) => {
        const updated = prev.filter((chat) => chat.id !== chatId);

        if (currentChatId === chatId) {
          setCurrentChatId(updated.length ? updated[0].id : null);
        }

        return updated;
      });
    } catch (error) {
      console.error("Delete chat error:", error);
    }
  };

  const currentChat =
    chats.find((chat) => chat.id === currentChatId) || null;

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        currentChatId,
        setCurrentChatId,
        createNewChat,
        updateChatTitle,
        addMessage,
        deleteChat,
        loadChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);