import React from 'react';
import { Task } from '../../types/task';
import TaskTableRow from './TaskTableRow';

interface TaskDataTableProps {
  tasks: Task[];
}

const TaskDataTable: React.FC<TaskDataTableProps> = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-bold bg-[#0b102c] text-white uppercase tracking-wider">
                Task
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-bold bg-[#0b102c] text-white uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-bold bg-[#0b102c] text-white uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-bold bg-[#0b102c] text-white uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-bold bg-[#0b102c] text-white uppercase tracking-wider">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task) => <TaskTableRow key={task.id} task={task} />)
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center bg-[#0b102c] text-white">
                  No tasks found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskDataTable;