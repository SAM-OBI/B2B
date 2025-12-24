import { useState } from 'react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Industrial Steel Pipe', price: 45.00, category: 'Raw Materials', image: 'https://via.placeholder.com/300?text=Steel+Pipe' },
  { id: 2, name: 'CNC Milling Machine', price: 12500.00, category: 'Machinery', image: 'https://via.placeholder.com/300?text=CNC+Machine' },
  { id: 3, name: 'Safety Gloves (Bulk 100)', price: 120.00, category: 'Safety Gear', image: 'https://via.placeholder.com/300?text=Gloves' },
  { id: 4, name: 'Heavy Duty Bearings', price: 85.50, category: 'Parts', image: 'https://via.placeholder.com/300?text=Bearings' },
  { id: 5, name: 'Hydraulic Pump', price: 450.00, category: 'Parts', image: 'https://via.placeholder.com/300?text=Pump' },
  { id: 6, name: 'Copper Wire Spool', price: 210.00, category: 'Raw Materials', image: 'https://via.placeholder.com/300?text=Copper+Wire' },
  { id: 7, name: 'Wireless Scanner', price: 150.00, category: 'Electronics', image: 'https://via.placeholder.com/300?text=Scanner' },
  { id: 8, name: 'Pallet Jack', price: 340.00, category: 'Logistics', image: 'https://via.placeholder.com/300?text=Pallet+Jack' },
];

const Catalog = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Product Catalog</h1>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', minWidth: '200px' }}
          />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              {/* Using CSS background placeholder if image fetch fails/for simplicity */}
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>{product.category}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{product.name}</h3>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>${product.price.toFixed(2)}</div>
              <div style={{ marginTop: 'auto' }}>
                <Button 
                   onClick={() => addToCart(product)}
                   style={{ width: '100%' }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
