import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { usePaystackPayment } from 'react-paystack';
import SEO from '../../components/SEO';
import axios from 'axios'; // We need axios in frontend to call our own backend

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    zip: '',
    email: 'user@example.com' // In a real app, get this from AuthContext
  });

  const config = {
      reference: (new Date()).getTime().toString(),
      email: shipping.email,
      amount: cartTotal * 100, // Paystack expects amount in kobo
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxx',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
      // Implementation for backend integration will come in the next step
      // For now we simulate the success using the reference from paystack
      handleOrderCreation(reference.reference);
  };

  const onClose = () => {
      addNotification('Payment cancelled.', 'info');
  };

  const handleOrderCreation = async (paymentRef) => {
      try {
          const orderPayload = {
              products: cart.map(item => ({ product: item._id || item.id, quantity: item.quantity })),
              shippingAddress: {
                  address: shipping.address,
                  city: shipping.city,
                  zip: shipping.zip,
                  country: 'Nigeria' // Defaulting for now
              },
              paymentReference: paymentRef,
              totalAmount: cartTotal
          };

          await axios.post('/api/orders', orderPayload);
          
          addNotification('Payment Successful! Order Confirmed.', 'success');
          clearCart();
          navigate('/buyer/orders');
      } catch (error) {
          console.error("Order functionality error", error);
          addNotification('Order creation failed: ' + (error.response?.data?.msg || 'Server Error'), 'error');
      }
  };

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePay = (e) => {
      e.preventDefault();
      if (!shipping.address || !shipping.city || !shipping.email) {
          addNotification('Please fill in all shipping details', 'error');
          return;
      }
      initializePayment(onSuccess, onClose);
  };

  if (cart.length === 0) {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Your cart is empty</h2>
            <Button onClick={() => navigate('/buyer/catalog')}>Go to Catalog</Button>
        </div>
    );
  }

  return (
    <>
        <SEO title="Checkout" description="Secure payment for your industrial supplies." />
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Checkout</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
            {/* Shipping Form */}
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Shipping Information</h3>
            <form id="checkout-form" onSubmit={handlePay} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Address</label>
                <input type="text" name="address" value={shipping.address} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                </div>
                <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>City</label>
                <input type="text" name="city" value={shipping.city} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                </div>
                <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>ZIP Code</label>
                <input type="text" name="zip" value={shipping.zip} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                </div>
                <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email for Receipt</label>
                <input type="email" name="email" value={shipping.email} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                </div>
            </form>
            </div>

            {/* Order Summary */}
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ marginBottom: '1rem' }}>
                {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <Button 
                type="submit" 
                form="checkout-form"
                style={{ width: '100%', marginTop: '1.5rem', backgroundColor: '#10b981', hover: { backgroundColor: '#059669' } }}
            >
                Pay ${cartTotal.toFixed(2)} with Paystack
            </Button>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
                Secured by Paystack.
            </p>
            </div>
        </div>
        </div>
    </>
  );
};

export default Checkout;
