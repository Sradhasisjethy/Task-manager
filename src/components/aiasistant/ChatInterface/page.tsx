import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Task } from '@/types/task';
import { processQuery } from '@/utils/taskProcessor';
import TaskChart from '@/components/aiasistant/TaskChart/page';
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    chartType?: string;
    chartData?: any;
  }
  
  interface ChatInterfaceProps {
    tasks: Task[];
  }
  const ChatInterface = ({ tasks }: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Message[]>([
      { 
        id: '0', 
        text: "Hi! I'm your Task Assistant. I can answer questions about your tasks and show visualizations. What would you like to know?", 
        sender: 'assistant' 
      }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    const handleSend = async () => {
      if (input.trim() === '') return;
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Process the query
      const response = processQuery(input, tasks);
      
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'assistant',
        chartType: response.chartType,
        chartData: response.chartData
      };
      
      // Simulate AI thinking time
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
      }, 500);
    };
  
    return (
      <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Messages area */}
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
              
              {/* Show chart if available */}
              {message.chartType && message.chartData && (
                <div className="mt-2 bg-white p-2 rounded border w-64 md:w-80 mx-auto">
                  <TaskChart type={message.chartType} data={message.chartData} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="border-t p-3 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about tasks, status, priority, due dates, or request a chart..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
          
        </div>
        <div className="p-4 text-sm text-gray-500">
            <p>Try asking:</p>
            <ul className="list-disc list-inside">
                <li>"Show me a chart of tasks by status"</li>
                <li>"How many tasks does Alex Morgan have?"</li>
                <li>"What are the high-priority tasks?"</li>
                <li>"Show me tasks due this week"</li>
            </ul>
        </div>
      </div>
    );
  };
  
export default ChatInterface;