import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  return (
    <>
        <SEO title="Admin Dashboard" description="Platform oversight and management console." />
        <div style={{ padding: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Admin Dashboard</h2>
                <p style={{ color: 'var(--text-muted)' }}>Platform overview and quick actions.</p>
            </header>

            {/* Analytics Cards */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$45,230</p>
                    <span style={{ color: '#10b981', fontSize: '0.875rem' }}>+12% from last month</span>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Users</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,240</p>
                    <span style={{ color: '#3b82f6', fontSize: '0.875rem' }}>+54 new users</span>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Pending Products</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>15</p>
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
