import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const SupplierDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Supplier Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/supplier/orders">
            <Button variant="secondary">View Orders</Button>
          </Link>
          <Link to="/supplier/products/new">
            <Button>+ Add New Product</Button>
          </Link>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Sales</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>$12,450</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#fbbf24' }}>5</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Products Listed</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>24</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent Products</h2>
      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Product Name</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Stock</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>Industrial Steel Pipe</td>
              <td style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>$45.00/m</td>
              <td style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>500</td>
              <td style={{ padding: '1rem', borderTop: '1px solid var(--border)', color: 'var(--secondary)' }}>Active</td>
              <td style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                <Button variant="outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Edit</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDashboard;
