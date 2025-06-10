import React, { useState } from "react";
import SummarizeTool from "./SummarizeTool";
import TranslateTool from "./TranslateTool";
import EmailTool from "./EmailTool";
import GrammarCorrector from "./GrammarCorrector";
import ChatWidget from "./AppBot"; 

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); 

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
 
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:scale-105 transition"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h2 className="text-4xl font-bold text-center text-purple-800 dark:text-purple-300 mb-8">
          🚀 Smart Utility Dashboard
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2 text-center">
              Summarize Text
            </h3>
            <SummarizeTool />
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2 text-center">
              Translate Text
            </h3>
            <TranslateTool />
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-2 text-center">
              Generate Email
            </h3>
            <EmailTool />
          </div>
        </div>

 
        <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-2 text-center">
            Grammar Corrector
          </h3>
          <GrammarCorrector />
        </div>

   
        <button
          className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700"
          onClick={() => setChatOpen(!chatOpen)}
        >
          💬
        </button>

     
        {chatOpen && (
          <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 overflow-auto z-40 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl transition-all duration-300">
          
<ChatWidget onClose={() => setChatOpen(false)} />

          </div>
        )}
      </div>
    </div>
  );
}
