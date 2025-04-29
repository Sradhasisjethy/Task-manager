// src/components/dashboard/TaskFilterBar.tsx
import React from 'react';
import { TaskStatus, TaskPriority } from '../../types/task';

interface TaskFilterBarProps {
  titleFilter: string;
  setTitleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  titleFilter,
  setTitleFilter,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const statuses: (TaskStatus | 'All')[] = ['All', 'Todo', 'In Progress', 'Done', 'Overdue'];
  const priorities: (TaskPriority | 'All')[] = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="bg-[#0b102c] text-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="title-filter" className="block text-sm font-medium text-white mb-1">
            Filter by Title
          </label>
          <input
            id="title-filter"
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-300"
          />
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="status-filter" className="block text-sm font-medium text-white mb-1">
            Status
          </label>
          <select
            id="status-filter "
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-300 bg-[#0b102c] "
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48 ">
          <label htmlFor="priority-filter" className="block text-sm font-medium text-white mb-1">
            Priority
          </label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-300 bg-[#0b102c] "
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterBar;