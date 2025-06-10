import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SummarizeTool() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_API_URL =
    "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";
  const HUGGINGFACE_TOKEN = process.env.REACT_APP_HUGGINGFACE_TOKEN
;
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && text.trim().length <= 1) {
      setSummary(""); 
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [text]);

  useEffect(() => {
    axios.post(
      HUGGINGFACE_API_URL,
      { inputs: "Warm-up request" },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  }, []);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const response = await axios.post(
        HUGGINGFACE_API_URL,
        { inputs: text },
        {
          headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data[0]?.summary_text;
      setSummary(result || "No summary returned.");
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      setSummary("❌ API error. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert("📋 Summary copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.txt";
    link.click();
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech not supported.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
const handleStop = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setText((prev) => prev + " " + voiceText);
    };

    recognition.onerror = (e) => {
      alert("Voice input error. Try again.");
      console.error(e);
    };
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
        🔍 Text Summarizer
      </h3>

      <textarea
        rows="6"
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded-md"
        placeholder="Paste or speak your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

       
      </div>

      {loading && (
        <p className="text-blue-500 font-medium">
          ⏳ Please wait... generating summary.
        </p>
      )}

      {!loading && summary && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <strong className="dark:text-white">Summary:</strong>
          <p className="mt-2 text-gray-800 dark:text-white whitespace-pre-line">{summary}</p>

          <div className="mt-3 flex gap-3">
  <button
    onClick={handleCopy}
    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
  >
    📋 Copy
  </button>

  <button
    onClick={handleDownload}
    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
  >
    ⬇ Download
  </button>

  <button
    onClick={handleSpeak}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
  >
    🔊 Speak
  </button>

  <button
    onClick={handleStop}
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
  >
    ⏹ Stop
  </button>
</div>

        </div>
      )}
    </div>
  );
}
