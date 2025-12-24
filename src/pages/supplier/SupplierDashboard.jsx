import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const SupplierDashboard = () => {
  return (
    <>
        <SEO title="Supplier Dashboard" description="Manage your inventory and fulfill orders." />
        <div style={{ padding: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Supplier Dashboard</h2>
            </header>
            
            {/* Stats Overview */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Sales</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$12,450</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>8</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Products Listed</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>24</p>
                </div>
            </section>

            {/* Quick Actions */}
            <section style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manage Products</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Add new items or update inventory.</p>
                    <Link to="/supplier/products/new" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>Add Product</Link>
                </div>
                <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Fulfillment</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>View pending orders and update status.</p>
                    <Link to="/supplier/orders" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>View Orders</Link>
                </div>
            </section>
        </div>
    </>
  );
};

export default SupplierDashboard;
