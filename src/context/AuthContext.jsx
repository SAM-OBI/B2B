import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Configure Axios defaults
axios.defaults.baseURL = 'http://localhost:5000'; 
axios.defaults.withCredentials = true; // IMPORTANT for cookies

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    // No need to check localStorage token anymore
    try {
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
    } catch (error) {
        // console.error('Auth Error:', error);
        setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
      const res = await axios.post('/api/auth/login', { email, password });
      // Cookie is set automatically
      setUser(res.data.user);
      return res.data.user;
  };

  const register = async (userData) => {
      const res = await axios.post('/api/auth/register', userData);
      // Cookie is set automatically
      setUser(res.data.user);
      return res.data.user;
  };

  const logout = async () => {
    try {
        await axios.get('/api/auth/logout'); // Backend needed for clearing cookie
    } catch (err) { console.log(err); }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
