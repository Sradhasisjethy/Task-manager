'use client';

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import { getTaskData, getPriorityData } from "@/data/mockTasks";
import { Card, CardContent } from "@mui/material";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";


// Static data for SSR
const staticTaskData = [
  { date: "Apr 20", Todo: 4, "In Progress": 2, Done: 3 },
  { date: "Apr 21", Todo: 6, "In Progress": 1, Done: 5 },
  { date: "Apr 22", Todo: 5, "In Progress": 3, Done: 2 },
  { date: "Apr 23", Todo: 3, "In Progress": 4, Done: 4 },
  { date: "Apr 24", Todo: 7, "In Progress": 2, Done: 6 },
  { date: "Apr 25", Todo: 4, "In Progress": 3, Done: 5 },
  { date: "Apr 26", Todo: 5, "In Progress": 2, Done: 7 }
];

const staticCompletionData = [
  { date: "Mar 27", "Completed Tasks": 58 },
  { date: "Apr 01", "Completed Tasks": 25 },
  { date: "Apr 06", "Completed Tasks": 32 },
  { date: "Apr 11", "Completed Tasks": 45 },
  { date: "Apr 16", "Completed Tasks": 60 },
  { date: "Apr 21", "Completed Tasks": 48 },
  { date: "Apr 26", "Completed Tasks": 22 }
];
const calculateUserProductivity = () => {
  // Mock productivity data by user
  return [
    { name: "Alex Thompson", tasks: 8, productivity: 28 },
    { name: "Jamie Smith", tasks: 6, productivity: 85 },
    { name: "Riley Johnson", tasks: 9, productivity: 48 },
    { name: "Taylor Wilson", tasks: 5, productivity: 75 },
    { name: "Jordan Lee", tasks: 7, productivity: 91 },
  ];
};

const AnalyticsPage = () => {
  const [isClient, setIsClient] = useState(false);
  const userProductivity = calculateUserProductivity();

  // Set the client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch the necessary data
  const tasksByStatus = getTaskData();
  const tasksByPriority = getPriorityData();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 text-white">Analytics</h1>
        <p className="text-gray-400">
          Detailed insights about task metrics and team performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartWidget title="Tasks by Status" data={tasksByStatus} type="pie" />
        <ChartWidget title="Tasks by Priority" data={tasksByPriority} type="bar" />
      </div>

      {/* Static charts */}
      {isClient && (
        <>
          <Card className="mb-8 ">
            <div className="p-6 bg-[#0b102c]">
              <h2 className="text-xl font-semibold text-white mb-2">Daily Task Activity</h2>
              <p className="text-sm  mb-4 text-gray-400">
                Task status distribution over the past week
              </p>
            </div>
            <CardContent className="bg-[#0b102c] text-white">
              <div className="h-80 ">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={staticTaskData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Todo" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="In Progress" stroke="#eab308" />
                    <Line type="monotone" dataKey="Done" stroke="#22c55e" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <div className="p-6 bg-[#0b102c]">
              <h2 className="text-xl font-semibold text-white mb-2">Task Completion Trend</h2>
              <p className="text-sm  mb-4 text-gray-400">
                Cumulative completed tasks over time
              </p>
            </div>
            <CardContent className="bg-[#0b102c] text-white">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={staticCompletionData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Completed Tasks"
                      stroke="#22c55e"
                      fill="#093b1c"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Team Performance */}
      <div className="mb-8 ">
        <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProductivity.map((user, index) => (
            <Card key={index} className="overflow-hidden ">
              <div className="p-6 bg-[#0b102c]">
                <h3 className="font-medium text-white">{user.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{user.tasks}</span>
                  <span className="text-sm  text-white ml-1">tasks completed</span>
                </div>
              </div>
              <CardContent className="pt-0 bg-[#0b102c]">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        user.productivity < 30 ? 'bg-gradient-to-r from-pink-600 to-purple-700' :
                        user.productivity < 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-600' :
                        user.productivity < 70 ? 'bg-gradient-to-r from-yellow-400 to-lime-500' :
                        user.productivity < 90 ? 'bg-gradient-to-r from-lime-400 to-emerald-500' :
                        'bg-gradient-to-r from-emerald-400 to-teal-500'}`}
                      style={{ width: `${user.productivity}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">{user.productivity}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Productivity score based on task completion time</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AnalyticsPage;
