import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const BuyerDashboard = () => {
    return (
      <div style={{ padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Buyer Dashboard</h1>
            <Link to="/buyer/catalog">
                <Button>Browse Products</Button>
            </Link>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Active Orders</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Track your recent purchases and shipments.</p>
                <Link to="/buyer/orders">
                    <Button variant="outline">View Order History</Button>
                </Link>
            </div>
            
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Quick Order</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Reorder from your frequently purchased items.</p>
                <Link to="/buyer/catalog">
                    <Button variant="outline">Go to Catalog</Button>
                </Link>
            </div>
        </div>
      </div>
    );
  };
  
  export default BuyerDashboard;
