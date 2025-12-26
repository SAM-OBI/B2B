import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire('Error', 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Banned' : 'Active';
    try {
      await axios.put(`/api/users/${id}/status`, { status: newStatus });
      setUsers(users.map(user => 
        user._id === id ? { ...user, status: newStatus } : user
      ));
      Swal.fire('Success', `User has been ${newStatus.toLowerCase()}`, 'success');
    } catch (error) {
       Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>User Management</h1>
      
      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Last Login IP</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                  <tr><td colSpan="6" style={{padding: '2rem', textAlign: 'center'}}>Loading users...</td></tr>
              ) : users.length === 0 ? (
                  <tr><td colSpan="6" style={{padding: '2rem', textAlign: 'center'}}>No users found.</td></tr>
              ) : (
                  users.map(user => (
                    <tr key={user._id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{user.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem',
                            backgroundColor: user.role === 'Admin' ? '#e0e7ff' : user.role === 'Supplier' ? '#fce7f3' : '#e0f2fe',
                            color: user.role === 'Admin' ? '#4338ca' : user.role === 'Supplier' ? '#be185d' : '#0369a1'
                        }}>
                            {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {user.lastLoginIP || 'N/A'}
                        {user.loginHistory && user.loginHistory.length > 0 && (
                            <span title="View History" style={{ marginLeft: '0.5rem', cursor: 'help', fontSize: '0.75rem' }}>ℹ️</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                    <span style={{ color: user.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                        {user.status || 'Active'}
                    </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <Button 
                    variant="outline" 
                    onClick={() => toggleStatus(user._id, user.status || 'Active')}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderColor: user.status === 'Active' ? '#ef4444' : '#10b981', color: user.status === 'Active' ? '#ef4444' : '#10b981' }}
                  >
                    {user.status === 'Active' ? 'Ban' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default UserManagement;
