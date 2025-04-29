// src/components/dashboard/TaskTableRow.tsx
import React from 'react';
import { Task } from '../../types/task';

interface TaskTableRowProps {
  task: Task;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
  // Define color classes based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Todo':
        return 'bg-gray-100 text-gray-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Define color classes based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-[#0d6efd] bg-[#0b102c]  border-[#0b102c]">
      <td className="py-3 px-4  text-white">{task.title}</td>
      <td className="py-3 px-4 text-white">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </td>
      <td className="py-3 px-4 text-white">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </td>
      <td className="py-3 px-4 text-white">{task.dueDate}</td>
      <td className="py-3 px-4 text-white">{task.assignee || 'Unassigned'}</td>
    </tr>
  );
};

export default TaskTableRow;