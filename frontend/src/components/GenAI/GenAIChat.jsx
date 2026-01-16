import { useEffect, useRef, useState } from "react";
import GenAIAPI from "../../apis/GenAIAPI.js";
import SuggestionCards from "./SuggestionCards.jsx";

export default function GenAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storage = window.sessionStorage;

  const ALL_SUGGESTIONS = [
    "Can you summarize market trends this month?",
    "Who is the top performing sales agent?",
    "What are the top performing products?",
    "Provide insights on customer demographics",
    "Analyze sales performance by region",
    "Identify emerging market opportunities",
    "Suggest strategies to improve customer retention",
  ];

  useEffect(() => {
    const saved = storage.getItem("genaiChatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    storage.setItem("genaiChatHistory", JSON.stringify(newMessages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSuggestion = (text) => {
    setInput(text);
    handleSend();
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);

    const updated = [...messages, { role: "user", content: input }];
    saveMessages(updated);

    setInput("");
    setLoading(true);

    try {
      const res = await GenAIAPI.sendMessage({ message: input });
      saveMessages([...updated, { role: "ai", content: res }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    storage.removeItem("genaiChatHistory");
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[70vh]">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">GenAI Chat</h1>

        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-emerald-700 rounded hover:bg-emerald-600 text-sm"
            onClick={() => setIsSidebarOpen(v => !v)}
          >
            {isSidebarOpen ? "Hide Suggestions" : "Show Suggestions"}
          </button>

          <button
            className="p-1 rounded hover:bg-gray-300/40"
            onClick={clearHistory}
          >
            •••
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden gap-4">

        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          {messages.length === 0 && (
            <>
              <div className="text-emerald-300 text-center mt-6">
                Ask me about BAS World insights
              </div>

              <SuggestionCards
                suggestions={ALL_SUGGESTIONS.slice(0, 4)}
                onSelect={handleSuggestion}
                variant="center"
              />
            </>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-xl ${
                msg.role === "user"
                  ? "self-end bg-emerald-600/80"
                  : "self-start bg-stone-900/70"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="text-emerald-200 animate-pulse">
              AI is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {isSidebarOpen && (
          <SuggestionCards
            suggestions={ALL_SUGGESTIONS}
            onSelect={handleSuggestion}
            variant="sidebar"
          />
        )}
      </div>

      <div className="mt-4 relative">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="w-full px-4 py-3 rounded-xl bg-emerald-800/50 placeholder-emerald-300"
        />
        <div
          onClick={handleSend}
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer
            ${!input.trim() || loading ? "opacity-40 pointer-events-none" : ""}`}
        >
          ➤
        </div>
      </div>

      {error && (
        <div className="text-red-400 mt-2">{error}</div>
      )}
    </div>
  );
}