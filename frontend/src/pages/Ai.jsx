import React from "react";
import AIHeader from "../components/AI/AIHeader";
import Sidebar from "../components/AI/Sidebar";
import Chatbot from "../components/AI/Chatbot";

const Ai = () => {
  return (
    <>
      <AIHeader />

      <section className="bg-[#F5F7FA] pt-28 h-screen overflow-hidden">

        <div className="max-w-[1700px] mx-auto px-4 md:px-6 xl:px-8 h-full">

          <div className="flex gap-6 h-[calc(100vh-140px)]">

            <aside className="hidden lg:block w-[280px] flex-shrink-0">
              <Sidebar />
            </aside>

            <main className="flex-1 min-w-0 h-full">
              <Chatbot />
            </main>

          </div>

        </div>

      </section>

    </>
  );
};

export default Ai;