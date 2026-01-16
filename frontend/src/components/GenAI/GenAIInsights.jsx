import { useEffect, useState } from "react";
import GenAIAPI from "../../apis/GenAIAPI.js";
export default function GenAIInsights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);

  const storage = window.sessionStorage;

  useEffect(() => {
    const saved = storage.getItem("genaiInsight");
    if (saved) setInsight(saved);
  }, []);

  const fetchInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await GenAIAPI.generateInsights();
      setInsight(res.data);
      storage.setItem("genaiInsight", res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-emerald-900 p-6 rounded-xl">
        <h1 className="text-2xl font-semibold mb-2">GenAI Insights</h1>
        <p className="text-emerald-200 mb-4">
          Generate automated insights based on the latest sales data.
        </p>

        <button
          onClick={fetchInsight}
          disabled={loading}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-md"
        >
          {loading ? "Generating..." : "Generate Insight"}
        </button>
      </div>

      <div className="bg-emerald-950 p-6 rounded-xl min-h-[200px] whitespace-pre-line">
        {loading && (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="text-red-400">{error}</div>
        )}

        {!loading && insight && (
          <div className="text-emerald-100 leading-relaxed">
            {insight}
          </div>
        )}

        {!loading && !insight && !error && (
          <div className="text-emerald-300">
            Click the button above to generate insights.
          </div>
        )}
      </div>
    </div>
  );
}
