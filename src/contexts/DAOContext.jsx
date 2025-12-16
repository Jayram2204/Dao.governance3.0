import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useDAO } from '../hooks/useDAO';

const DAOContext = createContext(undefined);

export const DAOProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const daoData = useDAO();
  
  const [userRole, setUserRole] = useState('member');
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    notifications: true,
    emailAlerts: false,
  });

  // Determine user role based on voting power
  useEffect(() => {
    if (daoData.votingPower) {
      const power = parseFloat(daoData.votingPower);
      if (power >= 10000) {
        setUserRole('whale');
      } else if (power >= 1000) {
        setUserRole('active');
      } else if (power > 0) {
        setUserRole('member');
      } else {
        setUserRole('visitor');
      }
    }
  }, [daoData.votingPower]);

  // Add notification
  const addNotification = (notification) => {
    setNotifications(prev => [
      {
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        ...notification,
      },
      ...prev,
    ]);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Update preferences
  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
    localStorage.setItem('dao_preferences', JSON.stringify({ ...preferences, ...newPrefs }));
  };

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dao_preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load preferences:', e);
      }
    }
  }, []);

  const value = {
    // User data
    address,
    isConnected,
    userRole,
    
    // DAO data
    ...daoData,
    
    // Notifications
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    clearNotifications,
    
    // Preferences
    preferences,
    updatePreferences,
  };

  return <DAOContext.Provider value={value}>{children}</DAOContext.Provider>;
};

export const useDAOContext = () => {
  const context = useContext(DAOContext);
  if (context === undefined) {
    throw new Error('useDAOContext must be used within a DAOProvider');
  }
  return context;
};
