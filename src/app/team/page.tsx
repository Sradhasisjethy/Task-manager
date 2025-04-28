"use client";
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";

import TeamMembers from "@/app/team/TeamMembers";


const teamMembers = [
  {
    id: '1',
    name: 'Alex Morga',
    role: 'Product Manager',
    email: 'AlexMorga@gmail.com',
    status: 'Active' as const,
    avatarUrl: '/image/men.jpeg', 
  },
  {
    id: '2',
    name: 'Jamie Chen',
    role: 'Lead Developer',
    email: 'JamieChen@gmail.com',
    status: 'Busy' as const,
    avatarUrl: '/image/men1.png',
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    role: 'Lead Developer',
    email: 'TaylorWilson@gmail.com',
    status: 'Away' as const,
    avatarUrl: '/image/men2.jpeg',
  },
  {
    id: '4',
    name: 'Robin Stevens',
    role: 'UI/UX Designer',
    email: 'RobinStevens@gmail.com',
    status: 'Away' as const,
    avatarUrl: '/image/men.jpeg',
  },
  {
    id: '5',
    name: 'Sam johnson',
    role: 'UI/UX Designer',
    email: 'Samjohnson@gmail.com',
    status: 'Busy' as const,
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


