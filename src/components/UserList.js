import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import EditUserModal from './EditUserModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (currentPage) => {
    try {
      const response = await fetchUsers(currentPage);
      setUsers(response.data.data);
      setOriginalUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    let filteredUsers = [...originalUsers];

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterOption !== 'all') {
      filteredUsers.sort((a, b) => {
        switch (filterOption) {
          case 'firstname_asc': return a.first_name.localeCompare(b.first_name);
          case 'firstname_desc': return b.first_name.localeCompare(a.first_name);
          case 'lastname_asc': return a.last_name.localeCompare(b.last_name);
          case 'lastname_desc': return b.last_name.localeCompare(a.last_name);
          default: return 0;
        }
      });
    }

    setUsers(filteredUsers);
  }, [searchTerm, filterOption, originalUsers]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        setOriginalUsers(originalUsers.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

      {/* Search and Filter */}
      <div className="flex gap-8  justify-between items-center  mb-6 space-x-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3  px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="w-1/3  md:w-2/5 px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value="all">Sort By</option>
          <option value="firstname_asc">First Name (A-Z)</option>
          <option value="firstname_desc">First Name (Z-A)</option>
          <option value="lastname_asc">Last Name (A-Z)</option>
          <option value="lastname_desc">Last Name (Z-A)</option>
        </select>
      </div>

      {/* Users Grid */}
      {users.length === 0 ? (
        <div className="text-center text-gray-500">No users found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full mb-3 border border-gray-300"
              />
              <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-600 mb-3">{user.email}</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                >
                  <FaEdit /> <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded ${
              page === index + 1
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(updatedUser) => {
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setOriginalUsers(originalUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserList;