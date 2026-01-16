import { useState } from "react";
import GenAIInsights from "../components/GenAI/GenAIInsights.jsx";
import GenAIChat from "../components/GenAI/GenAIChat.jsx";

export default function GenAI() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="min-h-dvh p-6 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-2xl shadow-xl">

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${activeTab === "insights"
              ? "bg-emerald-500"
              : "bg-emerald-800/40 hover:bg-emerald-700/40"}`}
        >
          Insights
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${activeTab === "chat"
              ? "bg-emerald-500"
              : "bg-emerald-800/40 hover:bg-emerald-700/40"}`}
        >
          Chat
        </button>
      </div>

      {activeTab === "insights" && <GenAIInsights />}
      {activeTab === "chat" && <GenAIChat />}
    </div>
  );
}
