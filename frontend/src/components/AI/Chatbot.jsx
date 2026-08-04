import React, { useEffect, useRef, useState } from "react";
import EmptyState from "./EmptyState";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../api/chat";
import { useChat } from "../../context/ChatContext";
import Quiz from "../../pages/Quiz";

const Chatbot = () => {
  const {
    currentChat,
    currentChatId,
    createNewChat,
    addMessage,
    updateChatTitle,
  } = useChat();

  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages, loading]);
  useEffect(() => {

    if (!currentChat) {
  
      setShowQuiz(false);
  
    }
  
  }, [currentChat]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    let chat = currentChat;
    let chatId = currentChatId;

    // Create a new chat if none exists
    if (!chat) {
      chat = await createNewChat(text);

      if (!chat) return;

      chatId = chat.id;
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
    };

    if (chat.title === "New Chat") {
      updateChatTitle(
        chatId,
        text.length > 30 ? `${text.slice(0, 30)}...` : text
      );
    }

    await addMessage(chatId, userMessage);

    setLoading(true);

    try {
      const reply = await sendMessage(text);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: reply,
      };

      await addMessage(chatId, aiMessage);
    } catch (error) {
      console.error(error);

      await addMessage(chatId, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "❌ Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleNewChat = async () => {

    setShowQuiz(false);
  
    await createNewChat();
  
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {showQuiz ? (
 <Quiz
 key={quizKey}
 onHome={() => setShowQuiz(false)}
/>
) : (currentChat?.messages?.length || 0) === 0 ? (
  <EmptyState
    onPromptClick={handleSend}
    onQuizClick={() => {
      setQuizKey((prev) => prev + 1);
      setShowQuiz(true);
    }}
  />
) : (
  <div className="flex-1 overflow-y-auto p-6">
    {currentChat.messages.map((message) => (
      <Message
        key={message.id}
        role={message.role}
        text={message.text}
      />
    ))}

    {loading && <Message role="assistant" text="⏳ Thinking..." />}

    <div ref={bottomRef} />
  </div>
)}

      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
};

export default Chatbot;