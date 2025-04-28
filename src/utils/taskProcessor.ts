import { Task } from '../types/task';
import { 
  getTasksByStatus, 
  getTasksByPriority,
  getTaskData,
  getPriorityData,
  getTotalTasks,
  getTasksDueToday,
  getOverdueTasks,
  getHighPriorityTasks,
  getTasksInProgress
} from '../data/mockTasks';

interface QueryResponse {
  text: string;
  chartType?: string;
  chartData?: any;
}

export function processQuery(query: string, tasks: Task[]): QueryResponse {
  const lowerQuery = query.toLowerCase();
  
  // Check for chart requests
  if (lowerQuery.includes('chart') || lowerQuery.includes('diagram') || lowerQuery.includes('graph') || lowerQuery.includes('visual')) {
    // Status chart
    if (lowerQuery.includes('status')) {
      return {
        text: "Here's a pie chart showing tasks by status:",
        chartType: 'pie',
        chartData: getTaskData()
      };
    }
    
    // Priority chart
    if (lowerQuery.includes('priority')) {
      return {
        text: "Here's a pie chart showing tasks by priority:",
        chartType: 'pie',
        chartData: getPriorityData()
      };
    }
    
    // Assignee chart
    if (lowerQuery.includes('assignee')) {
      const assigneeCounts: Record<string, number> = {};
      tasks.forEach(task => {
        assigneeCounts[task.assignee] = (assigneeCounts[task.assignee] || 0) + 1;
      });
      
      const chartData = Object.entries(assigneeCounts).map(([name, value]) => ({
        name,
        value
      }));
      
      return {
        text: "Here's a chart showing task distribution by assignee:",
        chartType: 'bar',
        chartData
      };
    }
    
    // Default chart if not specified
    return {
      text: "Here's a pie chart showing tasks by status:",
      chartType: 'pie',
      chartData: getTaskData()
    };
  }

  // Task status queries
  if (lowerQuery.includes('status')) {
    const statusCounts = getTasksByStatus(tasks);
    const statusText = Object.entries(statusCounts)
      .map(([status, count]) => `${status}: ${count} tasks`)
      .join(', ');
    return {
      text: `Task status breakdown: ${statusText}`
    };
  }
  
  // Priority queries
  if (lowerQuery.includes('priority')) {
    const priorityCounts = getTasksByPriority(tasks);
    const priorityText = Object.entries(priorityCounts)
      .map(([priority, count]) => `${priority}: ${count} tasks`)
      .join(', ');
    return {
      text: `Task priority breakdown: ${priorityText}`
    };
  }
  
  // Due date queries
  if (lowerQuery.includes('due') || lowerQuery.includes('date')) {
    const today = new Date().toISOString().split('T')[0];
    const dueTodayCount = getTasksDueToday(tasks);
    const overdueCount = getOverdueTasks(tasks);
    
    return {
      text: `You have ${dueTodayCount} tasks due today and ${overdueCount} overdue tasks.`
    };
  }
  
  // Assignee queries
  if (lowerQuery.includes('assignee') || lowerQuery.includes('assign')) {
    const assigneeCounts: Record<string, number> = {};
    tasks.forEach(task => {
      assigneeCounts[task.assignee] = (assigneeCounts[task.assignee] || 0) + 1;
    });
    
    const assigneeText = Object.entries(assigneeCounts)
      .map(([assignee, count]) => `${assignee}: ${count} tasks`)
      .join(', ');
    
    return {
      text: `Tasks by assignee: ${assigneeText}`
    };
  }
  
  // Specific assignee query
  for (const task of tasks) {
    if (lowerQuery.includes(task.assignee.toLowerCase())) {
      const assigneeTasks = tasks.filter(t => t.assignee === task.assignee);
      const statusBreakdown = assigneeTasks.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const statusText = Object.entries(statusBreakdown)
        .map(([status, count]) => `${status}: ${count}`)
        .join(', ');
      
      return {
        text: `${task.assignee} has ${assigneeTasks.length} tasks (${statusText}).`
      };
    }
  }
  
  // General task info
  if (lowerQuery.includes('task') || lowerQuery.includes('all')) {
    return {
      text: `You have ${getTotalTasks(tasks)} total tasks: ${getTasksInProgress(tasks)} in progress, ${getHighPriorityTasks(tasks)} high priority tasks, and ${getOverdueTasks(tasks)} overdue tasks.`
    };
  }
  
  // Default response
  return {
    text: "I can provide information about your tasks, including status, priority, due dates, and assignees. You can also ask me to show charts or diagrams of the data."
  };
}
