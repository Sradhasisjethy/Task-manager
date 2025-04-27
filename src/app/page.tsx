'use client';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from "lucide-react";
import React, { useState, useMemo } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import ChartWidget from '../components/dashboard/ChartWidget';
import TaskFilterBar from '../components/dashboard/TaskFilterBar';
import TaskDataTable from '../components/dashboard/TaskDataTable';
import { mockTasks, getTasksByStatus, getTasksByPriority, getTotalTasks, getTasksDueToday, getOverdueTasks, getHighPriorityTasks } from '../data/mockTasks';

export default function Dashboard() {
  // State for filters
  const [titleFilter, setTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Calculate stats for dashboard
  const tasksDueToday = getTasksDueToday(mockTasks);
  const overdueTasks = getOverdueTasks(mockTasks);

  // Prepare chart data
  const statusChartData = useMemo(() => {
    const statusCounts = getTasksByStatus(mockTasks);
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, []);

  const priorityChartData = useMemo(() => {
    const priorityCounts = getTasksByPriority(mockTasks);
    return Object.entries(priorityCounts).map(([name, value]) => ({ name, value }));
  }, []);

  // Filter tasks based on user selections
  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      // Filter by title (case insensitive)
      const titleMatches = task.title.toLowerCase().includes(titleFilter.toLowerCase());
      
      // Filter by status (if 'All' is selected, include all statuses)
      const statusMatches = statusFilter === 'All' || task.status === statusFilter;
      
      // Filter by priority (if 'All' is selected, include all priorities)
      const priorityMatches = priorityFilter === 'All' || task.priority === priorityFilter;
      
      return titleMatches && statusMatches && priorityMatches;
    });
  }, [titleFilter, statusFilter, priorityFilter]);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">TaskFlow Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          An overview of your tasks and project status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={mockTasks.length}
          icon={ListTodo}
          description="Total number of tasks in the system"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Tasks Due Today"
          value={tasksDueToday}
          icon={Clock}
          description="Tasks that need to be completed today"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks}
          icon={AlertTriangle}
          description="Tasks that are past their due date"
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Completed Tasks"
          value={mockTasks.filter(task => task.status === 'Done').length}
          icon={CheckCircle}
          description="Tasks that have been completed"
          trend={{ value: 8, isPositive: true }}
        />
      </div>


      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-gray-800 font-bold">
        <ChartWidget data={statusChartData} title="Tasks by Status"type="pie" />
        <ChartWidget data={priorityChartData} title="Tasks by Priority"type="bar" />
      </div>

      {/* Task Table Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Task List</h2>
        <TaskFilterBar
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <TaskDataTable tasks={filteredTasks} />
      </div>
    </DashboardLayout>
  );
}