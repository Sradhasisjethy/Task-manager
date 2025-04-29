"use client";

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import TaskChart from '@/components/aiasistant/TaskChart/page';
import { Task } from '@/types/task';
import { processQuery } from '@/utils/taskProcessor';
import { Send, Trash2, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  chartType?: string;
  chartData?: any;
  timestamp?: Date;
}

interface ChatPageProps {
  tasks?: Task[];
}

const Page = ({ tasks = [] }: ChatPageProps) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '0', 
      text: "Hi! I'm your Smart Assistant. I can answer general questions using AI and analyze your tasks. What would you like to know?", 
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Gemini API key
  const API_KEY = "AIzaSyBnoPTfAASt5aSxZgPBdZ4UO627hn4kvZc";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input field when component mounts
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isTaskRelatedQuery = (query: string): boolean => {
    const taskKeywords = [
      'task', 'tasks', 'priority', 'status', 'due', 'deadline', 
      'chart', 'graph', 'visualization', 'project', 'progress', 
      'completed', 'pending', 'overdue', 'assignee', 'assigned'
    ];
    
    return taskKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Determine if this is a task-related query or a general query
      if (isTaskRelatedQuery(input) && tasks.length > 0) {
        // Process task-related query
        const response = processQuery(input, tasks);
        
        // Add assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: 'assistant',
          chartType: response.chartType,
          chartData: response.chartData,
          timestamp: new Date()
        };
        
        // Simulate short processing time
        setTimeout(() => {
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 500);
      } else {
        // Use Gemini AI for general queries
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(input);
        const aiResponse = result.response.text();
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error(err);
      setError("Error processing your request. Please try again.");
    } finally {
      setIsLoading(false);
      setInput("");
      // Focus back on input after sending
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    setMessages([{ 
      id: '0', 
      text: "Chat cleared. How can I help you today?", 
      sender: 'assistant',
      timestamp: new Date()
    }]);
    
    // Focus back on input after clearing
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
    
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] border rounded-lg shadow-lg border-[#0b102c] overflow-hidden">
      {/* Chat header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <h2 className="font-semibold">Smart Assistant</h2>
        </div>
        <button
          onClick={handleClearChat}
          className="text-white hover:text-red-200 transition-colors"
          title="Clear conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#0b102c] ">
        <div className="space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%]">
                {message.sender === 'assistant' && (
                  <div className="self-end mb-2 mr-2">
                    <div className="bg-[#0d6efd] rounded-full p-1.5">
                      <Bot size={16} className="text-white" />
                    </div>
                  </div>
                )}
                
                <div 
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-[#0d6efd] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none border'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Show chart if available */}
                  {message.chartType && message.chartData && (
                    <div className="mt-4 bg-white p-3 rounded border">
                      <TaskChart type={message.chartType} data={message.chartData} />
                    </div>
                  )}
                  
                  {/* Message timestamp */}
                  <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-500' : 'text-gray-400'}`}>
                    {message.timestamp && formatTime(message.timestamp)}
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="self-end mb-2 ml-2">
                    <div className="bg-gray-400 rounded-full p-1.5">
                      <User size={16} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#0d6efd] p-4 rounded-2xl rounded-tl-none shadow-sm border">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggestion chips */}
      <div className="p-3 border-t border-gray-600 bg-[#0b102c]">
      <p className="text-sm text-gray-300 mb-2 font-medium">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setInput("Show me a chart of tasks by status")}
            className="bg-[#0b102c] text-white hover:bg-[#0d6efd] hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-600"
          >
             Chart of tasks by status
          </button>
          <button 
      onClick={() => setInput("What are the high-priority tasks?")}
      className="bg-[#0b102c] text-white hover:bg-[#0d6efd] hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-600"
    >
      High-priority tasks
          </button>
          <button 
      onClick={() => setInput("What is the weather today?")}
      className="bg-[#0b102c] text-white hover:bg-[#0d6efd] hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-600"
    >
      AI general question
          </button>
      </div>
    </div>

      
      {/* Input area */}
      <div className="border-t p-4 bg-[#0b102c] border-[#0b102c]">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about tasks or any other question..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:bg-gray-400 flex items-center justify-center"
            onClick={handleSend}
            disabled={isLoading}
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;