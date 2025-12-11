import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenAIAPI from "../apis/GenAIAPI.js";

export default function GenAI() {
const [loading, setLoading] = useState(false);
const [insight, setInsight] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
    const saved = localStorage.getItem("genaiInsight");
    if (saved) setInsight(saved);
}, []);

const fetchInsight = async () => {
    setLoading(true);
    setError(null);
    try {
        const res = await GenAIAPI.generateInsights();
        setInsight(res.data);
        localStorage.setItem("genaiInsight", res.data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

return (
<div className="min-h-dvh flex flex-col gap-4 p-4">
    <div className="bg-emerald-900 p-6 shadow-md rounded-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">GenAI Insights</h1>
            <p className="text-emerald-200 mb-4"> Generate automated insights based on the latest sales data.</p>
                <button
                onClick={fetchInsight}
                disabled={loading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-md shadow"
                >
                {loading ? "Generating..." : "Generate Insight"}
                </button>
    </div>


    <div className="bg-emerald-950 p-6 shadow-md rounded-xl min-h-[200px] text-white whitespace-pre-line">
        {loading && (
        <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
        )}

        {!loading && error && (
        <div className="text-red-400 text-lg">{error}</div>
        )}

        {!loading && !error && insight && (
        <div className="text-emerald-100 text-lg leading-relaxed">{insight}</div>
        )}

        {!loading && !error && !insight && (
        <>
            <div className="text-emerald-300">Click the button above to generate insights.</div>
            <Link to="/genai-chat" className="text-emerald-300 underline">Or use our AI-powered chat!</Link>
        </>
        )}
    </div>
</div>
);
}