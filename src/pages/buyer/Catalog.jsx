import { useState } from 'react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/SEO';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Industrial Drill', price: 1500, category: 'Tools', image: 'https://placehold.co/400' },
  { id: 2, name: 'Steel Pipes', price: 300, category: 'Materials', image: 'https://placehold.co/400' },
  { id: 3, name: 'Safety Gloves', price: 25, category: 'Safety', image: 'https://placehold.co/400' },
  { id: 4, name: 'Generator 5000W', price: 12000, category: 'Power', image: 'https://placehold.co/400' },
];

const Catalog = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": filteredProducts.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
              "@type": "Product",
              "name": product.name,
              "image": product.image,
              "description": `High quality ${product.name} for industrial use.`,
              "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "USD"
              }
          }
      }))
  };

  return (
    <>
        <SEO 
            title="Product Catalog" 
            description="Browse our extensive catalog of industrial tools, materials, and safety equipment."
            schema={itemListSchema}
        />
        <div style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Product Catalog</h2>
        
        {/* Filters */}
        <section style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', minWidth: '300px' }}
            />
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'var(--surface)',
                    color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                >
                {cat}
                </button>
            ))}
            </div>
        </section>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredProducts.map(product => (
            <article key={product.id} style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.name}</h3>
                    <span style={{ fontSize: '0.875rem', color: 'var(--primary)', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-sm)' }}>{product.category}</span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>${product.price.toLocaleString()}</p>
                <Button onClick={() => addToCart(product)} style={{ marginTop: 'auto' }}>
                    Add to Cart
                </Button>
                </div>
            </article>
            ))}
        </div>
        </div>
    </>
  );
};

export default Catalog;
