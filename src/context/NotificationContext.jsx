import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1000 }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderLeft: `4px solid ${n.type === 'success' ? '#10b981' : n.type === 'error' ? '#ef4444' : '#3b82f6'}`,
            boxShadow: 'var(--shadow-lg)',
            minWidth: '250px',
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
