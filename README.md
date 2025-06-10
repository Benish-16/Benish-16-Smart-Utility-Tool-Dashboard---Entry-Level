<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Utility Tool Dashboard — Entry-Level</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 text-gray-800 font-sans p-6">

  <header class="mb-8">
    <h1 class="text-3xl font-bold text-blue-600">Smart Utility Tool Dashboard — Entry-Level</h1>
    <p class="mt-2 text-lg">A React-based smart utility dashboard offering a user-friendly interface for quick access to AI-powered tools and utilities such as summarization, image generation, code explanation, and more.</p>
  </header>

  <section class="mb-8">
    <h2 class="text-2xl font-semibold text-gray-700">🚀 Features</h2>
-✅ Summarizer 
-🤖 AppBot 
 -🌐 Translator 
- ✅ Grammar checker.
- 🌗 Light/Dark mode support.
- 💻 Clean and responsive UI using TailwindCSS.
- ⚙️ API integration with graceful loading state and error handling.
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-semibold text-gray-700">🛠️ Tech Stack</h2>
    <ul class="list-disc ml-6 mt-2 space-y-1">
      <li><strong>React</strong> — Front-end framework</li>
      <li><strong>Tailwind CSS</strong> — Styling</li>
      <li><strong>JavaScript (ES6+)</strong></li>
      <li><strong>HuggingFace APIs</strong> — For text and image utilities</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-semibold text-gray-700">📦 Installation</h2>
    <p class="mt-2">Clone the repository and install dependencies:</p>
    <pre class="bg-gray-200 p-4 rounded mt-2 overflow-auto"><code>git clone https://github.com/Benish-16/Benish-16-Smart-Utility-Tool-Dashboard---Entry-Level.git
cd Benish-16-Smart-Utility-Tool-Dashboard---Entry-Level
npm install</code></pre>

    <h3 class="text-xl font-semibold text-gray-600 mt-4">📋 Set up Environment Variables</h3>
    <p class="mt-1">Create a <code>.env</code> file in the root directory and add:</p>
    <pre class="bg-gray-200 p-4 rounded mt-2 overflow-auto"><code>REACT_APP_HUGGINGFACE_TOKEN=your_huggingface_api_key</code></pre>
    <p class="mt-1 text-sm text-red-600">Make sure you do NOT commit your actual token to GitHub. Use <code>.gitignore</code> to prevent secrets from being pushed.</p>
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-semibold text-gray-700">🧪 Running Locally</h2>
    <pre class="bg-gray-200 p-4 rounded mt-2 overflow-auto"><code>npm start</code></pre>
    <p class="mt-2">Visit: <a href="http://localhost:3000" class="text-blue-600 underline">http://localhost:3000</a> in your browser.</p>
  </section>

</body>
</html>
