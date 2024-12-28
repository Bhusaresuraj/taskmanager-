import React, { useState } from 'react';
import { Plus, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Task } from '../types';

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="flex space-x-4 p-4 bg-gray-50 border-b">
          <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md bg-white shadow-sm hover:bg-gray-50">
            All Tasks
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            My Tasks
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Due Soon
          </button>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full
                            ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Due {format(new Date(task.due_date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {task.estimated_hours}h estimated
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}