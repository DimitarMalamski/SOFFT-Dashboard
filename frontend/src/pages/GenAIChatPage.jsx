import React, { useState, useEffect, useRef } from "react";
import GenAIAPI from "../apis/GenAIAPI.js";

export default function GenAIChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const storage = window.sessionStorage; 

  useEffect(() => {
    const saved = storage.getItem("genaiChatHistory");
  if (saved) {
    const parsed = JSON.parse(saved).map(msg => ({
      ...msg,
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
    }));
    setMessages(parsed);
  }  }, []);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    storage.setItem("genaiChatHistory", JSON.stringify(newMessages));
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    saveMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await GenAIAPI.sendMessage({ message: input });
      const aiMessage = { role: "ai", content: res };
      saveMessages([...updatedMessages, aiMessage]);
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
    <div className="max-h-dvh flex flex-col p-6 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-2xl shadow-xl relative">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">GenAI Chat</h1>

        <div className="relative">
          <button
            className="p-1 rounded hover:bg-gray-300/40 text-white"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            •••
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-emerald-950 shadow-md rounded-lg w-32 z-20">
              <button
                onClick={clearHistory}
                className="w-full text-left px-3 py-2 text-sm bg-emerald-900/70 hover:bg-emerald-500 transition rounded-t-lg"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {messages.length === 0 ? (
            <div className="text-emerald-200 flex flex-col items-center mt-10 gap-6">

              <h2 className="text-xl font-semibold text-emerald-300">
                Ask me about BAS World insights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">

                {[
                  "Show me the newest trucks available",
                  "Find the best-priced tractor units",
                  "Which vehicles have the lowest mileage?",
                  "Can you summarize market trends this month?"
                ].map((text, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(text);
                      handleSend(text);
                    }}
                    className="text-left px-4 py-3 bg-emerald-800/40 
                              hover:bg-emerald-700/40 transition rounded-xl
                              border border-emerald-700/40 shadow-md"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
        ):(
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-xl break-words ${
                  msg.role === "user" ? "self-end bg-emerald-600/80" : "self-start bg-stone-900/70"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-emerald-200 animate-pulse">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="mt-4 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full px-4 py-3 rounded-xl bg-emerald-800/50 text-white placeholder-emerald-300"
          placeholder="Type your message..."
        />
        <div
          onClick={handleSend}
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-emerald-300 hover:text-emerald-200 ${
            !input.trim() || loading ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          ➤
        </div>
      </div>
    </div>
  );
}