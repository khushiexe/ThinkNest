import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const message = input.trim();

    if (!message || loading) return;

    onSend(message);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-5">

      <div className="flex items-center gap-4">

        <input
          type="text"
          value={input}
          placeholder="Ask anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            px-5
            py-4
            outline-none
            text-gray-700
            focus:border-secondary
            transition
          "
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="
            bg-deep
            hover:bg-opacity-90
            disabled:opacity-60
            disabled:cursor-not-allowed
            text-white
            h-14
            w-14
            rounded-xl
            flex
            items-center
            justify-center
            transition
          "
        >
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
};

export default ChatInput;