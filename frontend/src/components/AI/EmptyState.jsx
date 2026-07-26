import React from "react";
import {
  FaLightbulb,
  FaBookOpen,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";

const actions = [
  {
    title: "Explain Concept",
    subtitle: "Understand difficult topics",
    icon: <FaLightbulb />,
    prompt: "Explain this concept in simple words.",
  },
  {
    title: "Generate Notes",
    subtitle: "Create revision notes",
    icon: <FaBookOpen />,
    prompt: "Generate short revision notes.",
  },
  {
    title: "Coding Help",
    subtitle: "Debug & solve coding problems",
    icon: <FaCode />,
    prompt: "Help me solve this coding problem.",
  },
  {
    title: "Quiz Me",
    subtitle: "Practice interview questions",
    icon: <FaQuestionCircle />,
    prompt: "Generate a quiz for me.",
  },
];

const EmptyState = ({ onPromptClick }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">

      <div className="text-center">

        <div className="text-6xl mb-4">
          👋
        </div>

        <h1 className="text-4xl font-bold text-deep">
          Welcome to ThinkNest AI
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Learn faster with your personal AI tutor.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12 w-full max-w-6xl">

        {actions.map((item) => (

          <button
            key={item.title}
            onClick={() => onPromptClick(item.prompt)}
            className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-6
              text-left
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div className="text-secondary text-2xl mb-5">

              {item.icon}

            </div>

            <h3 className="font-semibold text-xl text-deep">

              {item.title}

            </h3>

            <p className="text-gray-500 mt-3 leading-6">

              {item.subtitle}

            </p>

          </button>

        ))}

      </div>

    </div>
  );
};

export default EmptyState;