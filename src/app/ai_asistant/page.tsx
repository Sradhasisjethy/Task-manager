"use client";

import React from 'react';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<{ userText: string; aiText: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Using the provided API key directly
  const API_KEY = "AIzaSyBnoPTfAASt5aSxZgPBdZ4UO627hn4kvZc";

  const handleInput = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = input;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      
      setChat([
        ...chat,
        {
          userText: input,
          aiText: aiResponse,
        },
      ]);
      setInput("");
    } catch (err) {
      console.error(err);
      setError("Error communicating with Gemini AI. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInput();
    }
  };
    
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">AI Assistant</h1>
        <p className="text-gray-500">Ask questions and get AI-powered responses</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex flex-col h-[calc(100vh-240px)] border rounded-lg shadow-sm bg-white">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {chat.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Start a conversation with the AI assistant
            </div>
          ) : (
            <div className="space-y-6">
              {chat.map((val, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-gray-800">{val.userText}</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-gray-800">{val.aiText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400"
              onClick={handleInput}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setChat([])}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;