import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Swal from 'sweetalert2';
import { validateEmail, validatePassword, PASSWORD_REQUIREMENTS } from '../../utils/validators';
import SEO from '../../components/SEO';

import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [role, setRole] = useState('Buyer'); // 'Buyer' or 'Supplier'
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    companyName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm, companyName } = formData;

    // Validation
    if (!validateEmail(email)) {
        Swal.fire('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }

    if (!validatePassword(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Weak Password',
            text: PASSWORD_REQUIREMENTS,
        });
        return;
    }

    if (password !== passwordConfirm) {
        Swal.fire('Password Mismatch', 'Passwords do not match.', 'error');
        return;
    }

    if (role === 'Supplier' && !companyName) {
        Swal.fire('Company Name Required', 'Suppliers must provide a company name.', 'warning');
        return;
    }

    try {
        await register({ name, email, password, role, companyName });
        
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: `Welcome aboard, ${name}! Redirecting to login...`,
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            navigate('/login');
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.response?.data?.msg || 'Could not create account.',
        });
    }
  };

  return (
    <>
        <SEO title={`Register as ${role}`} description="Create an account to start trading on the B2B Marketplace." />
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', width: '100%', maxWidth: '500px' }}>
                <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Register as {role}</h2>
                </header>
                
                {/* Role Toggle */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                    <button 
                        onClick={() => setRole('Buyer')}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            borderRadius: 'var(--radius-sm)', 
                            border: '1px solid var(--border)',
                            backgroundColor: role === 'Buyer' ? 'var(--primary)' : 'transparent',
                            color: role === 'Buyer' ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer'
                        }}
                    >
                        Buyer
                    </button>
                    <button 
                        onClick={() => setRole('Supplier')}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            borderRadius: 'var(--radius-sm)', 
                            border: '1px solid var(--border)',
                            backgroundColor: role === 'Supplier' ? 'var(--primary)' : 'transparent',
                            color: role === 'Supplier' ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer'
                        }}
                    >
                        Supplier
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                    </div>
                    
                    {role === 'Supplier' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Company Name</label>
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Min 8 chars, 1 Upper, 1 Special Char.</p>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Confirm Password</label>
                        <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }} required />
                    </div>

                    <Button type="submit" style={{ width: '100%' }}>Create Account</Button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </section>
    </>
  );
};

export default Register;
