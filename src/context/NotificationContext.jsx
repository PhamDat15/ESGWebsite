import React, { createContext, useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeToast, setActiveToast] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('esg_notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse notifications", e);
      }
    }
  }, []);

  // Save to local storage when changed
  useEffect(() => {
    localStorage.setItem('esg_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now() + Math.random().toString(36).substring(7),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    setIsRinging(true);
    setTimeout(() => {
      setIsRinging(false);
    }, 1000); // 1s shake

    setActiveToast(newNotification);
    setTimeout(() => {
      setActiveToast(null);
    }, 3000);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearReadNotifications = () => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearReadNotifications,
      unreadCount,
      isRinging
    }}>
      {children}
      {activeToast && (
        <div className={`global-toast-notification type-${activeToast.type}`}>
          <div className="toast-content">
             <span className="toast-icon" style={{ display: 'flex', alignItems: 'center' }}>
               {activeToast.type === 'success' ? '✅' : activeToast.type === 'follow' ? '⭐' : activeToast.type === 'unfollow' ? <AlertCircle color="#ef4444" size={18} strokeWidth={2.5} /> : 'ℹ️'}
             </span>
             {activeToast.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
