// src/data/mockTasks.ts
import { Task } from '../types/task';

// Helper function to create dates relative to today
const createDate = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete dashboard layout',
    status: 'Done',
    priority: 'High',
    dueDate: createDate(-2),
    assignee: 'Alex Morgan',
    description: 'Implement the basic dashboard layout components',
    createdAt: createDate(-5),
  },
  {
    id: '2',
    title: 'Create data visualization components',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: createDate(1),
    assignee: 'Jamie Chen',
    description: 'Develop chart widgets for task metrics visualization',
    createdAt: createDate(-4),
  },
  {
    id: '3',
    title: 'Implement filtering functionality',
    status: 'Todo',
    priority: 'High',
    dueDate: createDate(3),
    assignee: 'Taylor Wilson',
    description: 'Add filters to the task table for better data exploration',
    createdAt: createDate(-3),
  },
  {
    id: '4',
    title: 'Design user profile page',
    status: 'Todo',
    priority: 'Low',
    dueDate: createDate(5),
    assignee: 'Alex Morgan',
    description: 'Create wireframes for the user profile interface',
    createdAt: createDate(-3),
  },
  {
    id: '5',
    title: 'Optimize API response time',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: createDate(0),
    assignee: 'Robin Stevens',
    description: 'Improve backend performance for faster data retrieval',
    createdAt: createDate(-2),
  },
  {
    id: '6',
    title: 'Fix authentication bugs',
    status: 'Overdue',
    priority: 'High',
    dueDate: createDate(-3),
    assignee: 'Jamie Chen',
    description: 'Resolve issues with user login and session management',
    createdAt: createDate(-6),
  },
  {
    id: '7',
    title: 'Write API documentation',
    status: 'Todo',
    priority: 'Medium',
    dueDate: createDate(7),
    assignee: 'Sam Johnson',
    description: 'Document API endpoints for developer reference',
    createdAt: createDate(-1),
  },
  {
    id: '8',
    title: 'Implement dark mode',
    status: 'Done',
    priority: 'Low',
    dueDate: createDate(-1),
    assignee: 'Taylor Wilson',
    description: 'Add dark mode theme support across the application',
    createdAt: createDate(-7),
  },
  {
    id: '9',
    title: 'Update user onboarding flow',
    status: 'In Progress',
    priority: 'High',
    dueDate: createDate(0),
    assignee: 'Robin Stevens',
    description: 'Improve the new user registration and tutorial process',
    createdAt: createDate(-4),
  },
  {
    id: '10',
    title: 'Create monthly analytics report',
    status: 'Overdue',
    priority: 'Medium',
    dueDate: createDate(-1),
    assignee: 'Sam Johnson',
    description: 'Generate performance reports for April 2025',
    createdAt: createDate(-5),
  },
  {
    id: '11',
    title: 'Refactor authentication service',
    status: 'Todo',
    priority: 'Medium',
    dueDate: createDate(10),
    assignee: 'Alex Morgan',
    description: 'Modernize authentication code and improve security',
    createdAt: createDate(-2),
  },
  {
    id: '12',
    title: 'Test cross-browser compatibility',
    status: 'Todo',
    priority: 'Low',
    dueDate: createDate(2),
    assignee: 'Taylor Wilson',
    description: 'Ensure app works properly on all major browsers',
    createdAt: createDate(-1),
  },
  {
    id: '13',
    title: 'Integrate payment processor',
    status: 'In Progress',
    priority: 'High',
    dueDate: createDate(1),
    assignee: 'Jamie Chen',
    description: 'Connect application with payment gateway',
    createdAt: createDate(-8),
  },
  {
    id: '14',
    title: 'Setup CI/CD pipeline',
    status: 'Done',
    priority: 'High',
    dueDate: createDate(-4),
    assignee: 'Robin Stevens',
    description: 'Implement automated testing and deployment workflows',
    createdAt: createDate(-10),
  },
  {
    id: '15',
    title: 'Conduct security audit',
    status: 'Overdue',
    priority: 'High',
    dueDate: createDate(-2),
    assignee: 'Sam Johnson',
    description: 'Analyze application security and identify vulnerabilities',
    createdAt: createDate(-7),
  },
  {
    id: '16',
    title: 'Optimize database queries',
    status: 'Todo',
    priority: 'Medium',
    dueDate: createDate(3),
    assignee: 'Alex Morgan',
    description: 'Improve database performance and reduce query time',
    createdAt: createDate(-3),
  },
  {
    id: '17',
    title: 'Create user feedback form',
    status: 'In Progress',
    priority: 'Low',
    dueDate: createDate(2),
    assignee: 'Taylor Wilson',
    description: 'Design and implement user survey functionality',
    createdAt: createDate(-4),
  },
  {
    id: '18',
    title: 'Update privacy policy',
    status: 'Done',
    priority: 'Medium',
    dueDate: createDate(-3),
    assignee: 'Jamie Chen',
    description: 'Revise legal documents to comply with new regulations',
    createdAt: createDate(-9),
  },
  {
    id: '19',
    title: 'Prepare release notes',
    status: 'Todo',
    priority: 'Low',
    dueDate: createDate(0),
    assignee: 'Robin Stevens',
    description: 'Document new features and fixes for upcoming release',
    createdAt: createDate(-2),
  },
  {
    id: '20',
    title: 'Create email notification templates',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: createDate(4),
    assignee: 'Sam Johnson',
    description: 'Design HTML templates for system notifications',
    createdAt: createDate(-5),
  },
  {
    id: '21',
    title: 'Fix mobile responsive issues',
    status: 'Overdue',
    priority: 'High',
    dueDate: createDate(-1),
    assignee: 'Alex Morgan',
    description: 'Resolve UI problems on small screen devices',
    createdAt: createDate(-6),
  },
  {
    id: '22',
    title: 'Update dependencies',
    status: 'Done',
    priority: 'Low',
    dueDate: createDate(-5),
    assignee: 'Taylor Wilson',
    description: 'Upgrade third-party libraries to latest versions',
    createdAt: createDate(-12),
  },
  {
    id: '23',
    title: 'Create data backup procedure',
    status: 'Todo',
    priority: 'High',
    dueDate: createDate(6),
    assignee: 'Jamie Chen',
    description: 'Implement automated backup and recovery processes',
    createdAt: createDate(-3),
  },
  {
    id: '24',
    title: 'Improve form validation',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: createDate(0),
    assignee: 'Robin Stevens',
    description: 'Enhance client-side validation for data entry forms',
    createdAt: createDate(-4),
  },
  {
    id: '25',
    title: 'Implement search functionality',
    status: 'Todo',
    priority: 'Medium',
    dueDate: createDate(8),
    assignee: 'Sam Johnson',
    description: 'Add global search feature across the application',
    createdAt: createDate(-2),
  }
];

// Utility functions for processing tasks
export const getTasksByStatus = (tasks: Task[]): Record<string, number> => {
  return tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
export const getTaskData = () => {
  const statusData = calculateTasksByStatus();
  return [
    { name: 'Todo', value: statusData.Todo },
    { name: 'In Progress', value: statusData['In Progress'] },
    { name: 'Done', value: statusData.Done },
    { name: 'Overdue', value: statusData.Overdue }
  ];
};
export const calculateTasksByStatus = () => {
  const statusCounts = {
    Todo: mockTasks.filter(task => task.status === 'Todo').length,
    'In Progress': mockTasks.filter(task => task.status === 'In Progress').length,
    Done: mockTasks.filter(task => task.status === 'Done').length,
    Overdue: mockTasks.filter(task => task.status === 'Overdue').length
  };
  
  return statusCounts;
};
export const getPriorityData = () => {
  const priorityData = calculateTasksByPriority();
  return [
    { name: 'High', value: priorityData.High },
    { name: 'Medium', value: priorityData.Medium },
    { name: 'Low', value: priorityData.Low }
  ];
};
export const calculateTasksByPriority = () => {
  const priorityCounts = {
    High: mockTasks.filter(task => task.priority === 'High').length,
    Medium: mockTasks.filter(task => task.priority === 'Medium').length,
    Low: mockTasks.filter(task => task.priority === 'Low').length
  };
  
  return priorityCounts;
};


export const getTasksByPriority = (tasks: Task[]): Record<string, number> => {
  return tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getTotalTasks = (tasks: Task[]): number => {
  return tasks.length;
};

export const getTasksDueToday = (tasks: Task[]): number => {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => task.dueDate === today).length;
};

export const getOverdueTasks = (tasks: Task[]): number => {
  return tasks.filter(task => task.status === 'Overdue').length;
};

export const getHighPriorityTasks = (tasks: Task[]): number => {
  return tasks.filter(task => task.priority === 'High').length;
};

export const getTasksInProgress = (tasks: Task[]): number => {
  return tasks.filter(task => task.status === 'In Progress').length;
};