"use client";
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";

import TeamMembers from "@/app/team/TeamMembers";


const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Product Manager',
    email: 'john@taskflow.com',
    status: 'Active' as const,
    avatarUrl: '/image/men.jpeg', // Replace with your image paths
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Lead Developer',
    email: 'jane@taskflow.com',
    status: 'Busy' as const,
    avatarUrl: '/image/men1.png',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'UI/UX Designer',
    email: 'mike@taskflow.com',
    status: 'Away' as const,
    avatarUrl: '/image/men2.jpeg',
  },
  // Add more team members as needed
];

const teampage = () => {
  return (
    <DashboardLayout>
      <main className="min-h-screen bg-gray-50">
      <TeamMembers members={teamMembers} />
    </main>
    </DashboardLayout>
    
  )
}

export default teampage


