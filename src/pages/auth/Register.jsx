import { useState } from 'react';
import Button from '../../components/ui/Button';

const Register = () => {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'supplier'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', { ...formData, role });
    // Add auth logic here
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.25rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)' }}>
        <button
          type="button"
          onClick={() => setRole('buyer')}
          style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', backgroundColor: role === 'buyer' ? 'var(--primary)' : 'transparent', color: role === 'buyer' ? 'white' : 'var(--text-muted)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole('supplier')}
          style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', backgroundColor: role === 'supplier' ? 'var(--primary)' : 'transparent', color: role === 'supplier' ? 'white' : 'var(--text-muted)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Supplier
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            required
          />
        </div>
        
        {role === 'supplier' && (
           <div>
             <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Company Name</label>
             <input 
               type="text" 
               name="companyName"
               value={formData.companyName}
               onChange={handleChange}
               style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
               required
             />
           </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            required
          />
        </div>
        <Button type="submit" style={{ marginTop: '1rem' }}>Register as {role === 'buyer' ? 'Buyer' : 'Supplier'}</Button>
      </form>
    </div>
  );
};

export default Register;
