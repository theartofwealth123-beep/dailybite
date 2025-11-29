'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">AI Meal Planner</h1>
        <p className="text-center text-gray-600 mb-8">Tell me about you → get a full week plan + grocery list</p>

        <textarea
          className="w-full p-6 text-lg border-2 border-gray-300 rounded-xl resize-none"
          rows={6}
          placeholder="Example: 28F, 5’4”, 140 lbs, want to lose 10 lbs, vegetarian, hate olives, cook for 1, $80/week"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="text-center mt-6">
          <button
            onClick={generate}
            disabled={loading || !prompt}
            className="px-12 py-5 bg-black text-white text-xl rounded-xl hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Generating your plan...' : 'Generate My Week'}
          </button>
        </div>

        {result && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Your Plan Is Ready!</h2>
            <pre className="bg-white p-8 rounded-xl border shadow overflow-auto text-sm">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}