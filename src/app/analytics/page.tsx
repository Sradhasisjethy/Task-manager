'use client';

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import {
  mockTasks,
  getTaskData,
  getPriorityData,
} from "@/data/mockTasks";
import { Card, CardContent } from "@mui/material";
import { format } from "date-fns";
import {
  CartesianGrid,
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

// ✅ Move all dynamic data generation into the component using useEffect
const generateDailyTaskData = () => {
  const data = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const todoCount = Math.floor(Math.random() * 5) + 2;
    const inProgressCount = Math.floor(Math.random() * 4) + 1;
    const doneCount = Math.floor(Math.random() * 6) + 1;

    data.push({
      date: format(date, "MMM dd"),
      Todo: todoCount,
      "In Progress": inProgressCount,
      Done: doneCount,
    });
  }

  return data;
};

const generateCompletionTrendData = () => {
  const data = [];
  const today = new Date();
  let completed = 12;

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const newCompleted = Math.floor(Math.random() * 5);
    completed += newCompleted;

    data.push({
      date: format(date, "MMM dd"),
      "Completed Tasks": completed,
    });
  }

  return data;
};

const calculateUserProductivity = () => {
  return [
    { name: "Alex Thompson", tasks: 8, productivity: 92 },
    { name: "Jamie Smith", tasks: 6, productivity: 85 },
    { name: "Riley Johnson", tasks: 9, productivity: 78 },
    { name: "Taylor Wilson", tasks: 5, productivity: 95 },
    { name: "Jordan Lee", tasks: 7, productivity: 88 },
  ];
};

// ✅ Capitalize the component name
const AnalyticsPage = () => {
  const [dailyTaskData, setDailyTaskData] = useState([]);
  const [completionTrend, setCompletionTrend] = useState([]);

  // ✅ Only generate random data on the client to avoid SSR mismatch
  // useEffect(() => {
  //   setDailyTaskData(generateDailyTaskData());
  //   setCompletionTrend(generateCompletionTrendData());
  // }, []);

  const tasksByStatus = getTaskData();
  const tasksByPriority = getPriorityData();
  const userProductivity = calculateUserProductivity();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 text-gray-800">Analytics</h1>
        <p className="text-gray-500">
          Detailed insights about task metrics and team performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartWidget title="Tasks by Status" data={tasksByStatus} type="pie" />
        <ChartWidget title="Tasks by Priority" data={tasksByPriority} type="bar" />
      </div>

      {/* Show only if data has loaded */}
      {dailyTaskData.length > 0 && (
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Daily Task Activity</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Task status distribution over the past week
            </p>
          </div>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTaskData}>
                  <CartesianGrid strokeDasharray="3 3" />
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
      )}

      {completionTrend.length > 0 && (
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Task Completion Trend</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Cumulative completed tasks over time
            </p>
          </div>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Completed Tasks"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProductivity.map((user, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6">
                <h3 className="font-medium">{user.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold">{user.tasks}</span>
                  <span className="text-sm text-muted-foreground ml-1">tasks completed</span>
                </div>
              </div>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${user.productivity}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{user.productivity}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Productivity score based on task completion time
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
