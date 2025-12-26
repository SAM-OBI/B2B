import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/ui/Button';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, pendingProducts: 0, totalRevenue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/analytics');
            setStats(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchStats();
  }, []);

  return (
    <>
        <SEO title="Admin Dashboard" description="Platform oversight and management console." />
        <div style={{ padding: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Admin Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Platform overview and quick actions.</p>
                </div>
                {/* Admin Create Product Button */}
                <Button onClick={() => navigate('/supplier/products/new')}>Create Admin Product</Button>
            </header>

            {/* Analytics Cards */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${stats.totalRevenue.toLocaleString()}</p>
                    <span style={{ color: '#10b981', fontSize: '0.875rem' }}>Lifetime Volume</span>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Users</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</p>
                    <span style={{ color: '#3b82f6', fontSize: '0.875rem' }}>Registered Accounts</span>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Pending Products</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.pendingProducts}</p>
                    <span style={{ color: '#f59e0b', fontSize: '0.875rem' }}>Requires moderation</span>
                </div>
            </section>

            {/* Management Sections */}
            <section>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Management Consoles</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    
                    <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>User Management</h4>
                            <p style={{ color: 'var(--text-muted)' }}>View user list, ban/activate accounts.</p>
                        </div>
                    </Link>

                    <Link to="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                             <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Product Moderation</h4>
                             <p style={{ color: 'var(--text-muted)' }}>Approve or reject new product listings.</p>
                        </div>
                    </Link>

                    <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                             <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Global Orders</h4>
                             <p style={{ color: 'var(--text-muted)' }}>Monitor all platform transactions.</p>
                        </div>
                    </Link>

                </div>
            </section>
        </div>
    </>
  );
};

export default AdminDashboard;
