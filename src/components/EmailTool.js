import React, { useState } from "react";

export default function EmailTool() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("formal");
  const [email, setEmail] = useState("");

 const handleGenerate = () => {
  if (!name.trim() || !topic.trim()) {
    setEmail("Please enter both your name and a topic.");
    return;
  }

  const lowerTopic = topic.toLowerCase();
  let body = "";

  if (lowerTopic.includes("leave")) {
    body =
      "I am writing to request a leave of absence for one day. If you allow leave for one day it will be your kindness.";
  } else if (lowerTopic.includes("internship")) {
    body =
      "I am interested in applying for an internship opportunity and would appreciate your guidance on the process.";
  } else if (lowerTopic.includes("meeting")) {
    body =
      "I would like to schedule a meeting to discuss this further at a time convenient to you.";
  } else if (lowerTopic.includes("project")) {
    body =
      "I would like to share updates regarding our current project and discuss the next steps.";
  } else {

    body = `I would like to discuss about ${topic}.`;
  }

  let generatedEmail = "";

  if (tone === "formal") {
    generatedEmail = `Dear Sir/Madam,\n\nI hope this message finds you well. ${body}\n\nBest regards,\n${name}`;
  } else {
    generatedEmail = `Hi there,\n\nJust reaching out about ${topic}. ${body}\n\nCheers,\n${name}`;
  }

  setEmail(generatedEmail);
};


  return (
    <div className="flex  flex-col gap-4">
      <h3 className="text-xl font-semibold text-blue-700">📧 Email Generator</h3>

      <input
        className="border dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 p-2 rounded-md"
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        value={name}
      />

      <input
        className="border dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 p-2 rounded-md"
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Email Topic"
        value={topic}
      />

      <div className="flex gap-2 items-center">
        <label className="text-sm dark:border-gray-600  font-medium">Tone:</label>
        <select
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded-md"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit"
        onClick={handleGenerate}
      >
        Generate Email
      </button>

      {email && (
        <div className="bg-gray-100 p-4 mt-4 rounded-md whitespace-pre-line text-gray-800">
          <strong>Generated Email:</strong>
          <p className="mt-2">{email}</p>
        </div>
      )}
    </div>
  );
}
