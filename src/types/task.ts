// src/types/task.ts
export type TaskStatus = 'Todo' | 'In Progress' | 'Done' | 'Overdue';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee?: string;
  description?: string;
  createdAt: string;
}