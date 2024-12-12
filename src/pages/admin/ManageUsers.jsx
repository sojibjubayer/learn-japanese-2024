import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://learn-japanese-backend.vercel.app/api/dashboard/users');
                setUsers(response.data || []); 
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch users. Please try again later.');
                setUsers([]); 
            }
        };
        fetchUsers();
    }, []);

    const updateUserRole = async (userId, newRole) => {
        try {
            setUpdatingUserId(userId); 
            const response = await axios.patch(`https://learn-japanese-backend.vercel.app/api/admin/users/${userId}/role`, { role: newRole });
            toast.success(response.data.message);
            setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
        } catch (error) {
            toast.error('Failed to update user role.');
        } finally {
            setUpdatingUserId(null); 
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className=" mx-auto p-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Manage Users</h1>
            {users.length > 0 ? (
                 <div className="w-full overflow-x-auto">
                    <table className="w-full  border border-gray-200 ">
                        <thead>
                            <tr className="bg-gray-100 text-base">
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Role</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="text-center">
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2 w-[200px]">
                                        {user.role !== 'admin' ? (
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded w-full text-sm md:text-base"
                                                onClick={() => updateUserRole(user._id, 'admin')}
                                                disabled={updatingUserId === user._id}
                                            >
                                                {updatingUserId === user._id ? 'Updating...' : 'Promote to Admin'}
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded w-full text-sm md:text-base"
                                                onClick={() => updateUserRole(user._id, 'user')}
                                                disabled={updatingUserId === user._id}
                                            >
                                                {updatingUserId === user._id ? 'Updating...' : 'Demote to User'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No users available.</p>
            )}
        </div>
    );
    
};

export default ManageUsers;
