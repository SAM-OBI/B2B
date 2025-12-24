import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart is empty</h2>
        <Link to="/buyer/catalog">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgb(255 255 255 / 0.05)' }}>
              <tr>
                <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Product</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Price</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Qty</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Total</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '1rem' }}>${item.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '60px', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>${(item.price * item.quantity).toFixed(2)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: 'var(--secondary)', fontSize: '0.875rem', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/buyer/checkout">
            <Button style={{ width: '100%' }}>Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
