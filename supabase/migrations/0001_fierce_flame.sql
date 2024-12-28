/*
  # Initial Schema Setup for IT Task Manager

  1. Tables
    - users (extends auth.users)
      - role and profile information
    - projects
      - project details and status
    - tasks
      - task details, assignments, and tracking
    
  2. Security
    - RLS policies for each table
    - Role-based access control
*/

-- Users table extending auth.users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'developer')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'on-hold')),
  created_at TIMESTAMPTZ DEFAULT now(),
  deadline TIMESTAMPTZ NOT NULL,
  manager_id UUID REFERENCES users(id) NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('todo', 'in-progress', 'review', 'completed')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  project_id UUID REFERENCES projects(id) NOT NULL,
  assignee_id UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  due_date TIMESTAMPTZ NOT NULL,
  estimated_hours NUMERIC(5,2) DEFAULT 0,
  actual_hours NUMERIC(5,2) DEFAULT 0
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Projects policies
CREATE POLICY "Users can view projects they're involved in"
  ON projects
  FOR SELECT
  USING (
    auth.uid() = manager_id
    OR EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.project_id = projects.id
      AND tasks.assignee_id = auth.uid()
    )
  );

CREATE POLICY "Managers and admins can create projects"
  ON projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );

-- Tasks policies
CREATE POLICY "Users can view assigned tasks"
  ON tasks
  FOR SELECT
  USING (
    auth.uid() = assignee_id
    OR auth.uid() = created_by
    OR EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.manager_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their assigned tasks"
  ON tasks
  FOR UPDATE
  USING (auth.uid() = assignee_id)
  WITH CHECK (auth.uid() = assignee_id);