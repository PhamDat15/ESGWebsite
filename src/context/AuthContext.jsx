import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage on initial render
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Hardcoded auth logic
    if (username === 'Girl36' && password === 'Girl36') {
      const user = { username: 'Girl36', role: 'buyer', name: 'Người mua' };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, role: 'buyer' };
    } 
    
    if (username === 'PigMoney' && password === 'PigMoney') {
      const user = { username: 'PigMoney', role: 'seller', name: 'Gian Hàng Cô Thơm Đống Đa', shopId: 1 };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, role: 'seller' };
    }

    return { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
