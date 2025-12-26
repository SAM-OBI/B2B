import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductModeration = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      // Assuming we updated controller to accept status query
      const res = await axios.get('/api/products?status=Pending');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching pending products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
        const status = action === 'Approve' ? 'Approved' : 'Rejected';
        await axios.put(`/api/products/${id}/status`, { status });
        
        setProducts(products.filter(p => p._id !== id));
        Swal.fire({
            icon: 'success',
            title: `Product ${status}`,
            timer: 1500,
            showConfirmButton: false
        });
    } catch (error) {
        Swal.fire('Error', 'Action failed', 'error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Product Moderation</h1>
      
      {loading ? <div style={{textAlign:'center'}}>Loading...</div> : products.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>All caught up! No pending products.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {products.map(product => (
            <div key={product._id} style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Supplier: {product.supplier?.name || product.supplier?.companyName || 'Unknown'} • Price: ${product.price}
                </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button 
                        variant="secondary" 
                        onClick={() => handleAction(product._id, 'Reject')}
                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                    >
                        Reject
                    </Button>
                    <Button 
                        type="button" 
                        onClick={() => handleAction(product.id, 'Approve')}
                        style={{ backgroundColor: '#10b981', border: 'none' }}
                    >
                        Approve
                    </Button>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductModeration;
