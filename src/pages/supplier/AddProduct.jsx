import { useState } from 'react';
import Button from '../../components/ui/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        image: 'https://placehold.co/400' // Default placeholder for now
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
        await axios.post('/api/products', formData);
        
        Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: 'Your product has been submitted for approval.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            navigate('/supplier/dashboard');
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.msg || 'Failed to add product',
        });
    } finally {
        setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO title="Add Product" description="List a new product for sale." />
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
                required
              >
                <option value="">Select Category</option>
                <option value="Tools">Tools</option>
                <option value="Materials">Materials</option>
                <option value="Safety">Safety</option>
                <option value="Power">Power</option>
                <option value="Machinery">Machinery</option>
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
                min="0"
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
                min="0"
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
              required
            ></textarea>
          </div>

        {/* Image Upload Placeholder */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Product Image</label>
            <div style={{ border: '2px dashed var(--border)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer', backgroundColor: 'var(--background)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Click to upload image (using placeholder for now)</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifySelf: 'end', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="secondary" type="button" onClick={() => navigate('/supplier/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? 'Listinig...' : 'List Product'}</Button>
          </div>

        </form>
      </div>
    </>
  );
};

export default AddProduct;
