// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { FolderKanban, PieChart, Calendar, Settings, Users, Home,Brain  } from "lucide-react";

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Analytics', href: '/analytics', icon: <PieChart className="w-5 h-5" /> },
    { name: 'Calendar', href: '/Calendar', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Team', href: '/team', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Ai asistant', href: '/ai_asistant', icon: <Brain className="w-5 h-5" /> },
  ];

  return (
    <aside className="bg-[#0f1535] text-white w-64 h-screen flex-shrink-0 hidden md:block">
      {/* <div className="p-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div> */}
      <div className="flex items-center  p-4">
        <div className="w-8 h-8 bg-[#0d6efd] rounded-lg flex items-center justify-center mr-3">
          <FolderKanban className="w-5 h-5" />
        </div>
        <span className="text-2xl font-bold">Task Manager</span>
      </div>
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link 
                href={item.href}
                className="flex items-center px-4 py-3 hover:bg-[#0d6efd] rounded-md"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;