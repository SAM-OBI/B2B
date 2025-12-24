import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Platform overview and quick actions.</p>
      </header>

      {/* Analytics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>$1,240,500</p>
          <span style={{ color: '#10b981', fontSize: '0.875rem' }}>+12% from last month</span>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>8,432</p>
          <span style={{ color: '#3b82f6', fontSize: '0.875rem' }}>+54 new today</span>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pending Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>14</p>
          <span style={{ color: '#fbbf24', fontSize: '0.875rem' }}>Needs moderation</span>
        </div>
      </div>

      {/* Management Sections */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Management Consoles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>User Management</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage buyer and supplier accounts, handle bans and verifications.</p>
          <Link to="/admin/users">
            <Button>Manage Users</Button>
          </Link>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Product Moderation</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Review and approve new product listings from suppliers.</p>
          <Link to="/admin/products">
             <Button>Moderate Products</Button>
          </Link>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Global Orders</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>View all transaction history and intervene in disputes.</p>
          <Link to="/admin/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
