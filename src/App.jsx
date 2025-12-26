import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const BuyerDashboard = lazy(() => import('./pages/buyer/BuyerDashboard'));
const SupplierDashboard = lazy(() => import('./pages/supplier/SupplierDashboard'));
const AddProduct = lazy(() => import('./pages/supplier/AddProduct'));
const Orders = lazy(() => import('./pages/supplier/Orders'));
const Catalog = lazy(() => import('./pages/buyer/Catalog'));
const Cart = lazy(() => import('./pages/buyer/Cart'));
const Checkout = lazy(() => import('./pages/buyer/Checkout'));
const OrderHistory = lazy(() => import('./pages/buyer/OrderHistory'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ProductModeration = lazy(() => import('./pages/admin/ProductModeration'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));

import { ThemeProvider, useTheme } from './context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ 
        padding: '0.5rem', 
        borderRadius: '50%', 
        backgroundColor: 'var(--surface)', 
        color: 'var(--text-main)', 
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

const NavBar = () => {
    const { cartItems } = useCart();
    const location = useLocation();
    const isBuyerPage = location.pathname.includes('/buyer');
    const isAdminPage = location.pathname.includes('/admin');

    // Simple role simulation for Navbar
    if (isAdminPage) {
        return (
            <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1e1b4b' }}>
                <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
                    Admin Console
                </h1>
                </Link>
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ThemeToggle />
                    <Link to="/" style={{ color: '#a5b4fc', fontSize: '0.875rem', textDecoration: 'none' }}>Exit to Store</Link>
                </nav>
            </header>
        );
    }
    
    return (
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                B2B Market
            </h1>
            </Link>
            <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ThemeToggle />
            {!isBuyerPage ? (
                <>
                    <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
                    <Link to="/register" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}>Get Started</Link>
                </>
            ) : (
                <Link to="/buyer/cart" style={{ color: 'var(--text-main)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Cart</span>
                    <span style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.75rem' }}>{cartItems.length}</span>
                </Link>
            )}
            </nav>
        </header>
    );
};

import { NotificationProvider } from './context/NotificationContext';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <HelmetProvider>
        <ThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <CartProvider>
                        <Router>
                        <NavBar />
                    <main>
                        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Loading...</div>}>
                            <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                            <Route path="/buyer/catalog" element={<Catalog />} />
                            <Route path="/buyer/cart" element={<Cart />} />
                            <Route path="/buyer/checkout" element={<Checkout />} />
                            <Route path="/buyer/orders" element={<OrderHistory />} />

                            <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
                            <Route path="/supplier/products/new" element={<AddProduct />} />
                            <Route path="/supplier/orders" element={<Orders />} />

                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<UserManagement />} />
                            <Route path="/admin/products" element={<ProductModeration />} />
                            <Route path="/admin/orders" element={<AdminOrders />} />
                            </Routes>
                        </Suspense>
                    </main>
                </Router>
                </CartProvider>
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
