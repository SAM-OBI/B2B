import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders');
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Global Order History</h1>
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
              <tr>
                <th style={{ padding: '1rem' }}>Order ID</th>
                <th style={{ padding: '1rem' }}>Products</th>
                <th style={{ padding: '1rem' }}>Total</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                  <tr><td colSpan="5" style={{padding: '2rem', textAlign: 'center'}}>Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                  <tr><td colSpan="5" style={{padding: '2rem', textAlign: 'center'}}>No orders found.</td></tr>
              ) : (
                  orders.map(order => (
                    <tr key={order._id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.875rem' }}>#{order._id.slice(-6).toUpperCase()}</td>
                      <td style={{ padding: '1rem' }}>{order.products.length} items</td>
                      <td style={{ padding: '1rem' }}>${(order.totalAmount || 0).toLocaleString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem',
                            backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            color: order.status === 'Delivered' ? '#10b981' : '#60a5fa'
                        }}>
                            {order.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(order.date || order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AdminOrders;
