import React, { useState } from "react";

const CrashOutApp: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnalyze = async (): Promise<void> => {
    // You'd add your API call here
    setLoading(true);
    setTimeout(() => {
      setResult("✅ Sample AI response: This is not crash-out-worthy.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">💥 Crash Out Analyzer</h1>

      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        placeholder="Describe your situation..."
        className="w-full p-3 border rounded mb-4"
        rows={6}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !input.trim()}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Should I Crash Out?"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

export default CrashOutApp;
