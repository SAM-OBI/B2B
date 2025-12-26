import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/SEO';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';

const Catalog = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchProducts();
  }, []);

  const fetchProducts = async () => {
      try {
          // If axios.defaults.baseURL is set in AuthContext, this works. 
          // Otherwise use full URL or proxy.
          const res = await axios.get('/api/products');
          setProducts(res.data);
      } catch (error) {
          console.error("Error fetching products:", error);
          addNotification('Failed to load products', 'error');
      } finally {
          setLoading(false);
      }
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
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
              "description": product.description || `High quality ${product.name} for industrial use.`,
              "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "USD"
              }
          }
      }))
  };

  if (loading) {
      return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Catalog...</div>;
  }

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
            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                filteredProducts.map(product => (
                <article key={product._id || product.id} style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <img src={product.image || 'https://placehold.co/400'} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
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
                ))
            )}
        </div>
        </div>
    </>
  );
};

export default Catalog;
