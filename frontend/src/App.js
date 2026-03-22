import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [type, setType] = useState("blog");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/generate", {
        prompt,
        tone,
        type
      });

      setResult(res.data.content);
    } catch (err) {
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied!");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🚀 AI Content Generator</h1>

      <textarea
        placeholder="Enter topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
        rows={4}
      />

      <br /><br />

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="professional">Professional</option>
        <option value="casual">Casual</option>
        <option value="funny">Funny</option>
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="blog">Blog</option>
        <option value="linkedin post">LinkedIn Post</option>
        <option value="ad copy">Ad Copy</option>
      </select>

      <br /><br />

      <button onClick={generateContent} style={{ padding: "10px" }}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <button onClick={copyToClipboard} style={{ marginLeft: "10px", padding: "10px" }}>
        Copy
      </button>

      <br /><br />

      <h3>Result:</h3>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>{result}</pre>
    </div>
  );
}

export default App;