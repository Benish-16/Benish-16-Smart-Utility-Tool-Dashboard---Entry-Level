import React, { useState } from "react";
import { useEffect } from "react";


export default function TranslateTool() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("ur");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);


  const languageMap = {
    hi: "Hindi",
    ur: "Urdu",
    pa: "Punjabi",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
    en: "English",
  };



useEffect(() => {
  if (text.trim() === "") {
    setTranslated("");
  }
}, [text]);

  const handleTranslate = async () => {
    if (!text.trim()) {
      setTranslated("Please enter text to translate.");
      return;
    }

    setLoading(true);
    setTranslated("");

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${language}`
      );
      const data = await response.json();

      const betterMatch = data.matches?.find((m) => m.id === 0)?.translation;
      let result = betterMatch || data.responseData.translatedText;

      if (["ur", "pa", "hi"].includes(language)) {
        result += "\n(Note: May be transliterated — not native script)";
      }

      setTranslated(result);
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslated("❌ Translation failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-green-700">🌍 Translate Tool</h3>

      <textarea
        rows="4"
       className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded-md"
        placeholder="Enter text in English"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="font-medium text-sm text-gray-600">
        Choose target language:
      </label>

      <select
        className="border border-gray-300  dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded-md w-fit"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languageMap).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {loading && (
        <p className="text-blue-500 font-medium">
          ⏳ Translating... please wait
        </p>
      )}

      {!loading && translated && (
        <div className="mt-2 p-3 bg-gray-100 rounded-md">
          <strong>Translated Output:</strong>
          <p className="mt-2 text-gray-800 whitespace-pre-line">{translated}</p>

   
        </div>
      )}
    </div>
  );
}
