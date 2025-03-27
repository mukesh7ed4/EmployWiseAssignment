import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const UserCard = ({ 
  user, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:shadow-lg">
      {/* User Avatar */}
      <div className="relative mb-4">
        <img 
          src={user.avatar} 
          alt={`${user.first_name} ${user.last_name}`} 
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
        />
        {user.verified && (
          <span className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
            ✓
          </span>
        )}
      </div>

      {/* User Information */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button 
          onClick={() => onEdit(user)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          aria-label="Edit User"
        >
          <Edit size={20} />
        </button>
        <button 
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          aria-label="Delete User"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;