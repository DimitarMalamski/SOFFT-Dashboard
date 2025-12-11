import React, { useState, useEffect, useRef } from "react";
import GenAIAPI from "../apis/GenAIAPI.js";

export default function GenAIChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("genaiChatHistory");
  if (saved) {
    const parsed = JSON.parse(saved).map(msg => ({
      ...msg,
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
    }));
    setMessages(parsed);
  }  }, []);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem("genaiChatHistory", JSON.stringify(newMessages));
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
    localStorage.removeItem("genaiChatHistory");
    setMessages([]);
  };

  return (
    <div className="min-h-dvh flex flex-col gap-4 p-4">
      <div className="bg-emerald-900 p-6 shadow-md rounded-xl flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-white">GenAI Chat</h1>
        <div className="flex gap-2">
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Clear History
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto bg-emerald-950 p-4 rounded-md">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${
                msg.role === "user"
                  ? "bg-emerald-700 text-white self-end"
                  : "bg-emerald-500 text-white self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-emerald-200 animate-pulse">AI is typing...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="text-red-400">{error}</div>}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md text-black"
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
