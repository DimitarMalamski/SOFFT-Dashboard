import React, { useState, useRef, useEffect } from "react";
import GenAIAPI from "../apis/GenAIAPI.js";

export default function GenAIChatPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! Ask me anything about your sales data." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await GenAIAPI.generateInsights(input);

      const botMessage = {
        sender: "ai",
        text: res.data,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Error: " + (err.message || "Unknown error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-dvh flex flex-col p-4 bg-emerald-950 text-white">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1">
        {/* Header */}
        <div className="bg-emerald-900 p-5 rounded-xl shadow mb-4">
          <h1 className="text-2xl font-semibold">GenAI Chat</h1>
          <p className="text-emerald-200">
            Ask questions or request insights from your sales data.
          </p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto bg-emerald-900/40 p-4 rounded-xl space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl shadow text-sm leading-relaxed
                  ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-800 text-emerald-100"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-emerald-800 px-4 py-2 rounded-xl text-emerald-200 flex gap-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-150">•</span>
                <span className="animate-bounce delay-300">•</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 flex gap-3">
          <textarea
            className="flex-1 bg-emerald-900/50 border border-emerald-700 rounded-xl p-3 text-emerald-100 resize-none shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows="2"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 shadow font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
