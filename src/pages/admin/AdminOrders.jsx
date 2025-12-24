const AdminOrders = () => {
    const orders = [
      { id: 'ORD-7782', customer: 'John Doe', vendor: 'SteelCo', total: '$450.00', status: 'Processing', date: '2025-12-24' },
      { id: 'ORD-9921', customer: 'Alice Smith', vendor: 'TechDynamics', total: '$1,250.00', status: 'Delivered', date: '2025-11-15' },
    ];
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Global Order History</h1>
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
              <tr>
                <th style={{ padding: '1rem' }}>Order ID</th>
                <th style={{ padding: '1rem' }}>Customer</th>
                <th style={{ padding: '1rem' }}>Vendor</th>
                <th style={{ padding: '1rem' }}>Total</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.id}</td>
                  <td style={{ padding: '1rem' }}>{order.customer}</td>
                  <td style={{ padding: '1rem' }}>{order.vendor}</td>
                  <td style={{ padding: '1rem' }}>{order.total}</td>
                  <td style={{ padding: '1rem' }}>{order.status}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AdminOrders;
