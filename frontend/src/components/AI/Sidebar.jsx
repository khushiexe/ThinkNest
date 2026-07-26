import React from "react";
import { FaPlus, FaCommentDots, FaStickyNote, FaCog, FaTrash } from "react-icons/fa";
import { useChat } from "../../context/ChatContext";

const Sidebar = () => {
  const { chats, currentChatId, setCurrentChatId, createNewChat, deleteChat } = useChat();

  return (
    <aside className="bg-white border-r border-gray-200 h-full flex flex-col">

      {/* Header */}
      <div className="px-6 py-7 bg-deep text-white">
        <h2 className="text-3xl font-bold">AI Tutor</h2>

        <p className="text-white/70 text-sm mt-2">
          Learn smarter with ThinkNest AI
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-6">

        {/* New Chat */}
        <button onClick={() => createNewChat()} className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-semibold bg-secondary text-deep hover:scale-[1.02] transition-all duration-300">
          <FaPlus />
          New Chat
        </button>

        {/* Recent Chats */}
        <div className="mt-10">

          <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-4">
            Recent Chats
          </p>

          <div className="space-y-1">

            {chats.length === 0 ? (
              <p className="text-sm text-gray-400 px-2">No chats yet</p>
            ) : (
              chats.map((chat) => (
                <div key={chat.id} className={`group flex items-center justify-between rounded-lg transition-all ${currentChatId === chat.id ? "bg-deep" : "hover:bg-secondary/10"}`}>
                  <button
                    onClick={() => setCurrentChatId(chat.id)}
                    className={`flex-1 flex items-center gap-3 px-3 py-3 text-left rounded-lg ${currentChatId === chat.id ? "text-white" : "text-gray-700 hover:text-deep"}`}
                  >
                    <FaCommentDots className={currentChatId === chat.id ? "text-white text-sm" : "text-deep text-sm"} />

                    <span className="truncate">
                      {chat.title}
                    </span>
                  </button>

                  <button
                    onClick={() => deleteChat(chat.id)}
                    className={`mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${currentChatId === chat.id ? "text-white hover:text-red-300" : "text-gray-400 hover:text-red-500"}`}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              ))
            )}

          </div>

        </div>

        {/* Library */}
        <div className="mt-10">

          <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-4">
            Library
          </p>

          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left text-gray-700 hover:bg-secondary/10 hover:text-deep transition-all">
            <FaStickyNote className="text-deep text-sm" />
            Saved Notes
          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-5">

        <button className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-secondary/10 hover:text-deep transition-all">
          <FaCog className="text-deep" />
          Settings
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;