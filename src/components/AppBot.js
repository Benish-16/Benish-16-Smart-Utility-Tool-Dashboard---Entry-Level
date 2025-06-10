import React, { useState, useRef } from "react";

const faqResponses = [
{
    q: "hi",
    a: "🧠 Hello!",
  },
  {
    q: "hello",
    a: "🧠 Hi!",
  },
  {
    q: "goodnight",
    a: "🧠 Goodnight!",
  },
  {
    q: "goodmorning",
    a: "🧠 Good morning!",
  },
  {
    q: "how are you",
    a: "🧠 I am fine, what about you?",
  },
  {
    q: "summarize",
    a: "🧠 The summarize tool lets you shorten long paragraphs into brief summaries. Just paste text and click 'Summarize'.",
  },
  {
    q: "translate",
    a: "🌍 The translate tool converts English text into other languages like Urdu, Hindi, French, and more.",
  },
  {
    q: "email",
    a: "✉️ The email tool helps you generate professional emails based on a topic and tone you choose.",
  },
  {
    q: "languages",
    a: "🗣️ You can translate to Urdu, Hindi, Punjabi, French, Spanish, German, and Chinese.",
  },
  {
    q: "speak",
    a: "🔊 Yes! After translating or generating text, click the '🔊 Speak' button to hear it aloud.",
  },
  {
    q: "tools",
    a: "🚀 This app includes 3 tools: Summarizer, Translator, and Email Generator.",
  },
];

  export default function AppBot({onClose}) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleAsk = (msg) => {
    const userInput = msg || input.trim();
    if (!userInput) return;

    const userMessage = { role: "user", text: userInput };
    const botMessage = getBotReply(userInput);

    setChat((prev) => [...prev, userMessage, botMessage]);
    setInput("");

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getBotReply = (text) => {
    const lower = text.toLowerCase();
    const match = faqResponses.find((f) => lower.includes(f.q));
    return {
      role: "bot",
      text: match
        ? match.a
        : "🤖 Sorry, I didn’t understand that. Try asking about summarize, translate, email, or tools.",
    };
  };

  
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      handleAsk(voiceText);
    };

    recognition.onerror = (e) => {
      alert("Voice input error. Please try again.");
      console.error(e);
    };
  };

  return (
    <div className="bg-white dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white  p-5 mt-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-center text-blue-700 mb-3">💬 Smart Assistant Chatbot</h3>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-600 text-lg font-bold hover:text-red-800"
        aria-label="Close"
      >
        ✖
      </button>
      <div className="h-64 overflow-y-auto bg-gray-50 border rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-3 space-y-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-2 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-100 text-right self-end ml-auto"
                : "bg-gray-200 text-left"
            }`}
          >
            <strong>{msg.role === "user" ? "You:" : "Bot:"}</strong> <br />
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1  dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-whiteborder border-gray-300 p-2 rounded"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button
          onClick={() => handleAsk()}
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
        >
          Ask
        </button>
        <button
          onClick={startVoice}
          className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
        >
          🎤
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {faqResponses.map((f, i) => (
          <button
            key={i}
            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => handleAsk(f.q)}
          >
            {f.q.charAt(0).toUpperCase() + f.q.slice(1)}
          </button>
        ))}
      </div>

      <button
        className="mt-4 text-sm text-red-500 underline"
        onClick={() => setChat([])}
      >
        🔄 Reset Chat
      </button>
    </div>
  );
}
