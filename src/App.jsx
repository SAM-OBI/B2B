import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import AddProduct from './pages/supplier/AddProduct';
import Orders from './pages/supplier/Orders';
import Catalog from './pages/buyer/Catalog';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import OrderHistory from './pages/buyer/OrderHistory';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ProductModeration from './pages/admin/ProductModeration';
import AdminOrders from './pages/admin/AdminOrders';

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

function App() {
  return (
    <CartProvider>
        <Router>
        <NavBar />
        <main>
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
        </main>
        </Router>
    </CartProvider>
  )
}

export default App
