import React from 'react';
import { Mail, Phone, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Team() {
  const { user } = useAuth();
  const [team, setTeam] = React.useState([
    {
      id: '1',
      name: 'John Doe',
      role: 'Project Manager',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // Add more team members as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div key={member.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 rounded-full"
                src={member.avatar}
                alt={member.name}
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                {member.phone}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 text-sm text-blue-600 hover:text-blue-500">
                View Profile
              </button>
              <button className="flex-1 text-sm text-gray-600 hover:text-gray-500">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}