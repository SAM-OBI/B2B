import { useState } from 'react';
import Button from '../../components/ui/Button';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Acme Corp', date: '2025-12-23', total: '$1,200.00', status: 'Pending' },
    { id: '#ORD-002', customer: 'Logistics Ltd', date: '2025-12-22', total: '$540.00', status: 'Shipped' },
    { id: '#ORD-003', customer: 'BuildIt Inc', date: '2025-12-20', total: '$3,100.00', status: 'Delivered' },
  ]);

  const updateStatus = (id) => {
    setOrders(orders.map(order => 
      order.id === id && order.status === 'Pending' ? { ...order, status: 'Shipped' } : order
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#fbbf24'; // Amber
      case 'Shipped': return '#3b82f6'; // Blue
      case 'Delivered': return '#10b981'; // Emerald
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Order Management</h1>
      </header>

      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Order ID</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Customer</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Date</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Total</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{order.id}</td>
                <td style={{ padding: '1rem' }}>{order.customer}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{order.date}</td>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{order.total}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status)
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {order.status === 'Pending' && (
                    <Button 
                      variant="outline" 
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => updateStatus(order.id)}
                    >
                      Mark Shipped
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
