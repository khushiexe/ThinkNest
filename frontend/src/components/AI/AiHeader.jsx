import React, { useState } from "react";
import Header from "../Header";

const AIHeader = () => {
  const [showHeader, setShowHeader] = useState(false);

  return (
    <>
      {showHeader ? (
        <Header
          aiMode={true}
          toggleHeader={() => setShowHeader(false)}
        />
      ) : (
        <header className="fixed top-0 left-0 right-0 z-50 bg-deep py-3">
          <div className="max-padd-container">
            <button
              onClick={() => setShowHeader(true)}
              className="bold-24 flex text-white"
            >
              <span className="inline-flex items-center">
              <span className="inline-flex items-center justify-center h-8 w-8 bg-secondary text-tertiary rounded-2xl -rotate-12">
                T
              </span>
              hinkNest
            </span>
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default AIHeader;