'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Shield,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface UserData {
  id: string;
  email: string;
  name?: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

const roleLabels: Record<string, string> = {
  user: 'User',
  editor: 'Editor',
  admin: 'Admin',
};

const roleColors: Record<string, string> = {
  user: 'bg-gray-100 text-gray-700',
  editor: 'bg-blue-100 text-blue-700',
  admin: 'bg-purple-100 text-purple-700',
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    newUsersThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [roleFilter]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) {
        params.set('role', roleFilter);
      }

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/users/stats');
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  async function deleteUser() {
    if (!userToDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function toggleActive(user: UserData) {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !user.isActive }),
      });

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u.id === user.id ? { ...u, isActive: !u.isActive } : u
          )
        );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E5E4E2] p-6 rounded-lg">
          <p className="text-sm text-[#7A7A78]">Total Users</p>
          <p className="text-2xl font-medium text-[#1A1A1A]">
            {stats.totalUsers}
          </p>
        </div>
        <div className="bg-white border border-[#E5E4E2] p-6 rounded-lg">
          <p className="text-sm text-[#7A7A78]">Active Users</p>
          <p className="text-2xl font-medium text-[#1A1A1A]">
            {stats.activeUsers}
          </p>
        </div>
        <div className="bg-white border border-[#E5E4E2] p-6 rounded-lg">
          <p className="text-sm text-[#7A7A78]">Admin Users</p>
          <p className="text-2xl font-medium text-[#1A1A1A]">
            {stats.adminUsers}
          </p>
        </div>
        <div className="bg-white border border-[#E5E4E2] p-6 rounded-lg">
          <p className="text-sm text-[#7A7A78]">New This Month</p>
          <p className="text-2xl font-medium text-[#1A1A1A]">
            {stats.newUsersThisMonth}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <SectionHeader
          title="Users Management"
          subtitle={`${users.length} users`}
          centered={false}
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A7A78]" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E4E2] rounded-lg focus:outline-none focus:border-[#B83A2F]"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-[#E5E4E2] rounded-lg focus:outline-none focus:border-[#B83A2F]"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#E5E4E2] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4F2]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#7A7A78] uppercase">
                  Verified
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#7A7A78] uppercase">
                  Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Last Login
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#7A7A78] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E4E2]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F] mx-auto" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-[#7A7A78]"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F5F4F2]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F5F4F2] flex items-center justify-center">
                          {user.name ? (
                            <span className="text-sm font-medium text-[#7A7A78]">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <User className="w-5 h-5 text-[#7A7A78]" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#1A1A1A]">
                            {user.name || 'No name'}
                          </p>
                          <p className="text-sm text-[#7A7A78]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          roleColors[user.role]
                        }`}
                      >
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.emailVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleActive(user)}
                        className={`p-1 rounded ${
                          user.isActive ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {user.isActive ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7A7A78]">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-[#7A7A78] hover:text-[#B83A2F]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg">
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">
              Delete User?
            </h3>
            <p className="text-[#7A7A78] mb-6">
              Are you sure you want to delete user "{userToDelete.email}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A]"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="flex-1 px-4 py-2 bg-[#B83A2F] text-white hover:bg-[#9A2F24]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
