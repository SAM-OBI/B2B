const OrderHistory = () => {
    // Mock user orders
    const orders = [
      { id: 'ORD-7782', date: '2025-12-24', total: 450.00, status: 'Processing', items: 3 },
      { id: 'ORD-9921', date: '2025-11-15', total: 1250.00, status: 'Delivered', items: 1 },
      { id: 'ORD-3321', date: '2025-10-02', total: 85.50, status: 'Delivered', items: 5 },
    ];
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Order History</h1>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{order.id}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Placed on {order.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.25rem' }}>${order.total.toFixed(2)}</div>
                 <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{order.items} items</div>
              </div>
              <div>
                <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: order.status === 'Delivered' ? '#10b981' : '#3b82f6'
                }}>
                    {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OrderHistory;
