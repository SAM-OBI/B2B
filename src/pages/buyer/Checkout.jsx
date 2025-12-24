import { useState } from 'react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    console.log('Order Placed', { shipping, total: cartTotal });
    clearCart();
    navigate('/buyer/orders');
  };

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Checkout</h1>
      
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Shipping Information</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={shipping.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Address</label>
            <input 
              type="text" 
              name="address"
              value={shipping.address}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>City</label>
              <input 
                type="text" 
                name="city"
                value={shipping.city}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>ZIP Code</label>
              <input 
                type="text" 
                name="zip"
                value={shipping.zip}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
                required
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
              <span>Total to Pay</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button type="submit" style={{ width: '100%' }}>Place Order</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
