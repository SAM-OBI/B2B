import { useState } from 'react';
import Button from '../../components/ui/Button';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    alert('Product added successfully!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Add New Product</h1>
        <p style={{ color: 'var(--text-muted)' }}>Fill in the details to list your product on the marketplace.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Product Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} 
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="raw_materials">Raw Materials</option>
              <option value="machinery">Machinery</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Stock Quantity</label>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              required 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontFamily: 'inherit' }}
          ></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Product Image</label>
          <div style={{ border: '2px dashed var(--border)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer', backgroundColor: 'var(--background)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Click to upload image</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifySelf: 'end', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="secondary" type="button" onClick={() => window.history.back()}>Cancel</Button>
          <Button type="submit">List Product</Button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;
