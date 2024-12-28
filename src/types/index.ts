export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'developer';
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  created_at: string;
  deadline: string;
  manager_id: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project_id: string;
  assignee_id: string;
  created_by: string;
  created_at: string;
  due_date: string;
  estimated_hours: number;
  actual_hours: number;
}