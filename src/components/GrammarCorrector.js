import React, { useState } from "react";
import { useEffect } from "react";

export default function GrammarCorrectorLanguageTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
useEffect(() => {
  if (text.trim() === "") {
    setResult("");
  }
}, [text]);
  const handleCorrect = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const data = await response.json();

      let correctedText = text;
    
      const matches = data.matches.sort((a, b) => b.offset - a.offset);
      for (let match of matches) {
        const replacement = match.replacements?.[0]?.value;
        if (replacement) {
          correctedText =
            correctedText.slice(0, match.offset) +
            replacement +
            correctedText.slice(match.offset + match.length);
        }
      }

      setResult(correctedText || "No suggestions found.");
    } catch (err) {
      console.error(err);
      setResult("❌ Error correcting grammar.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-7 max-w-xxl mx-auto p-5">
      <h3 className="text-xl font-semibold text-blue-700">
        📝 Grammar Corrector (LanguageTool)
      </h3>

      <textarea
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="border dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 border-gray-300 p-2 rounded-md w-full"
      />

      <button
        onClick={handleCorrect}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Fix Grammar"}
      </button>

      {result && (
        <div className="p-3 mt-2 bg-gray-100 rounded text-sm whitespace-pre-line">
          <strong>Corrected:</strong>
          <p className="mt-1 text-gray-900">{result}</p>
        </div>
      )}
    </div>
  );
}
