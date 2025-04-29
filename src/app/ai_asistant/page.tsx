"use client";
import ChatInterface from '@/components/aiasistant/ChatInterface/page';
import { mockTasks } from '@/data/mockTasks';
import DashboardLayout from "@/components/layout/DashboardLayout";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">AI Assistant</h1>
        <p className="text-gray-400">Ask questions and get AI-powered responses</p>
      </div>
      <main className="max-w-4xl mx-auto ">
        <ChatInterface tasks={mockTasks} />
      </main>
     
    </DashboardLayout>
  );
};

export default Page;