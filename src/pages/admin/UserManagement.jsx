import { useState } from 'react';
import Button from '../../components/ui/Button';

const UserManagement = () => {
  // Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Buyer', status: 'Active' },
    { id: 2, name: 'SteelCo Industries', email: 'sales@steelco.com', role: 'Supplier', status: 'Active' },
    { id: 3, name: 'Bob Builder', email: 'bob@buildit.com', role: 'Buyer', status: 'Banned' },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Banned' : 'Active' } : user
    ));
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
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{user.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                 <td style={{ padding: '1rem' }}>
                    <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        backgroundColor: user.role === 'Supplier' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: user.role === 'Supplier' ? '#818cf8' : 'var(--text-muted)'
                    }}>
                        {user.role}
                    </span>
                 </td>
                <td style={{ padding: '1rem' }}>
                    <span style={{ color: user.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                        {user.status}
                    </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <Button 
                    variant="outline" 
                    onClick={() => toggleStatus(user.id)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderColor: user.status === 'Active' ? '#ef4444' : '#10b981', color: user.status === 'Active' ? '#ef4444' : '#10b981' }}
                  >
                    {user.status === 'Active' ? 'Ban' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
