import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Swal from 'sweetalert2';
import { validateEmail } from '../../utils/validators';
import SEO from '../../components/SEO';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!validateEmail(formData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        if (!formData.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Password',
                text: 'Please enter your password.',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        try {
            const user = await login(formData.email, formData.password);
            
            Swal.fire({
                icon: 'success',
                title: 'Welcome back!',
                text: 'Login successful.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Redirect based on role
                if (user.role === 'Supplier') navigate('/supplier/dashboard');
                else if (user.role === 'Admin') navigate('/admin/dashboard');
                else navigate('/buyer/dashboard');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.msg || 'Invalid credentials',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <>
            <SEO title="Login" description="Login to your B2B Marketplace account." />
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
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
                        <Button type="submit" style={{ width: '100%' }}>Login</Button>
                    </form>
                    <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Login;
