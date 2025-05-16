'use client';

import React, { useState } from "react";

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const CrashOutApp: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    const prompt = `
You are an emotional clarity assistant.

Analyze this situation: "${input}"

Tell me:
1. Is this crash-out worthy?
2. What emotional triggers are at play?
3. What are 3 healthy alternatives to crashing out?
4. Give a one-liner mantra for the moment.
`;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setError("Sorry, we've reached our API limit. Please try again later.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      const data = await response.json();
      setResult(data.result || "No response received.");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            💥 Crash Out Analyzer
          </h1>
          
          <p className="text-gray-600 mb-6 text-center">
            Feeling overwhelmed? Let's analyze your situation and find healthy alternatives.
          </p>

          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                placeholder="Describe what's making you want to crash out..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
              />

              <div className="flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !input.trim()}
                  className="w-48 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Analyzing..." : "Should I Crash Out?"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {result && !error && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Analysis Results</h2>
                <div className="prose prose-blue max-w-none">
                  {result.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrashOutApp; 