import { useState } from 'react';
import Button from '../../components/ui/Button';

const ProductModeration = () => {
  const [products, setProducts] = useState([
    { id: 101, name: 'Heavy Lift Drone', supplier: 'TechDynamics', price: '$2,500', status: 'Pending' },
    { id: 102, name: 'Industrial Lubricant 50L', supplier: 'ChemCo', price: '$450', status: 'Pending' },
  ]);

  const handleAction = (id, action) => {
    // In a real app, this would make an API call
    console.log(`Product ${id} ${action}ed`);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Product Moderation</h1>
      
      {products.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>All caught up! No pending products.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {products.map(product => (
            <div key={product.id} style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Supplier: {product.supplier} • Price: {product.price}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button 
                        variant="secondary" 
                        onClick={() => handleAction(product.id, 'Reject')}
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
