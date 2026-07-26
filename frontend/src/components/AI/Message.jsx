import React from "react";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Message = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-3 mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="h-10 w-10 rounded-full bg-deep flex items-center justify-center text-white flex-shrink-0">
          <FaRobot />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm leading-7 overflow-hidden ${
          isUser
            ? "bg-deep text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
        }`}
      >
        <div className="prose prose-gray max-w-none break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "12px",
                      padding: "18px",
                      margin: "16px 0",
                      fontSize: "14px",
                      overflowX: "auto",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded break-words"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },

              pre({ children }) {
                return <>{children}</>;
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-deep flex-shrink-0">
          <FaUserCircle />
        </div>
      )}
    </div>
  );
};

export default Message;