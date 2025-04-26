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

// Functions for data generation
const generateDailyTaskData = () => {
  // Implementation remains the same
};

const generateCompletionTrendData = () => {
  // Implementation remains the same  
};

const calculateUserProductivity = () => {
  // Implementation remains the same
};

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
  { date: "Mar 27", "Completed Tasks": 12 },
  { date: "Apr 01", "Completed Tasks": 17 },
  { date: "Apr 06", "Completed Tasks": 22 },
  { date: "Apr 11", "Completed Tasks": 28 },
  { date: "Apr 16", "Completed Tasks": 35 },
  { date: "Apr 21", "Completed Tasks": 41 },
  { date: "Apr 26", "Completed Tasks": 48 }
];

const AnalyticsPage = () => {
  // Use static data for initial state to prevent hydration mismatch
  const [dailyTaskData, setDailyTaskData] = useState(staticTaskData);
  const [completionTrend, setCompletionTrend] = useState(staticCompletionData);
  const [isClient, setIsClient] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
    
    // If you want dynamic data, uncomment these:
    // setDailyTaskData(generateDailyTaskData());
    // setCompletionTrend(generateCompletionTrendData());
  }, []);

  // Use static data for these too if they have random elements
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

      {/* Static charts - no conditioning on client state */}
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

      {/* Rest of the component... */}
    </DashboardLayout>
  );
};

export default AnalyticsPage;