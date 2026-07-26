import React from "react";

const SubjectProgress = ({ subject, progress, color }) => {
  return (
    <div className="mb-8">

      <div className="flex justify-between items-center mb-2">

        <h4 className="text-white font-semibold text-base">
          {subject}
        </h4>

        <span
          className="font-bold"
          style={{ color }}
        >
          {progress}%
        </span>

      </div>

      <div className="w-full h-2 rounded-full bg-[#37464A] overflow-hidden">

        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />

      </div>

    </div>
  );
};

export default SubjectProgress;