import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const BuyerDashboard = () => {
    return (
        <>
            <SEO title="Buyer Dashboard" description="Manage your orders and browse the catalog." />
            <div style={{ padding: '2rem' }}>
                <header style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Buyer Dashboard</h2>
                </header>
                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <section style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Browse Catalog</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Find the best products for your business.</p>
                        <Link to="/buyer/catalog" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>Go to Catalog</Link>
                    </section>
                    <section style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>My Orders</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Track and manage your recent purchases.</p>
                        <Link to="/buyer/orders" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>View Orders</Link>
                    </section>
                </div>
            </div>
        </>
    );
};

export default BuyerDashboard;
