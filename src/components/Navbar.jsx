import React, { useState, useContext } from 'react';
import { Leaf, ShoppingCart, Search, Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);
  const { notifications, unreadCount, markAsRead, clearReadNotifications, removeNotification, isRinging } = useContext(NotificationContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const formatNotifTime = (isoString) => {
    const d = new Date(isoString);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  };

  const filteredResults = mockProducts.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8); // Giới hạn 8 kết quả thả xuống

  const handleSearchSelect = (id) => {
    setSearchTerm('');
    setIsFocused(false);
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Leaf className="logo-icon" size={42} />
          <span>EcoFlow</span>
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>Home</NavLink>
          <NavLink to="/shop" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink>
          <NavLink to="/farmers" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Farmers</NavLink>
          <NavLink to="/news" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>News</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink>
          
          <div className="nav-search-container">
            <div className="nav-search">
              <input 
                type="text" 
                placeholder="Tìm kiếm nông sản..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
              />
              <button className="search-btn" onClick={handleSearchSubmit}>
                <Search size={16} />
              </button>
            </div>
            
            {/* Bảng kết quả tìm kiếm thả xuống */}
            {isFocused && searchTerm && (
              <div className="search-dropdown">
                {filteredResults.length > 0 ? (
                  filteredResults.map(item => (
                    <div 
                      key={item.id} 
                      className="search-result-item"
                      onClick={() => handleSearchSelect(item.id)}
                    >
                      <img src={item.image} alt={item.name} />
                      <span className="search-result-name">{item.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="search-result-empty">Không tìm thấy sản phẩm "{searchTerm}"</div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="navbar-actions">
          <button className="icon-btn cart-btn" id="cart-icon-target" onClick={() => navigate('/cart')}>
            <ShoppingCart size={24} />
            <span className="cart-badge">{totalItems}</span>
          </button>

          {/* Notification Bell */}
          <div className="nav-user-dropdown-container">
            <button className="icon-btn notif-btn" onClick={() => setShowNotif(!showNotif)}>
              <Bell size={24} className={isRinging ? "shake-animation" : ""} />
              {unreadCount > 0 && <span className="cart-badge notif-badge">{unreadCount}</span>}
            </button>
            {showNotif && (
              <div className="notif-dropdown-menu">
                <div className="notif-header">
                  <span>Thông báo mới nhận</span>
                  {notifications.some(n => n.read) && (
                    <button className="clear-read-btn" onClick={(e) => { e.stopPropagation(); clearReadNotifications(); }}>Xóa đã đọc</button>
                  )}
                </div>
                <div className="notif-list">
                  {notifications.length === 0 ? (
                    <div className="notif-empty">Chưa có thông báo nào</div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`notif-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="notif-icon-wrap"><CheckCircle2 size={16} /></div>
                        <div className="notif-content-wrap">
                          <div className="notif-message">{notif.message}</div>
                          <div className="notif-time">{formatNotifTime(notif.timestamp)}</div>
                        </div>
                        {notif.read && (
                          <button 
                            className="delete-notif-btn" 
                            onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                            title="Xóa thông báo"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="nav-user-dropdown-container">
            <div className="nav-user-profile">
              <div className="nav-avatar">{currentUser ? currentUser.name.charAt(0).toUpperCase() : 'A'}</div>
              <div className="nav-user-info">
                <span className="nav-greeting">Xin chào,</span>
                <span className="nav-username" style={{
                  maxWidth: '120px', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  display: 'inline-block'
                }}>
                  {currentUser ? (currentUser.role === 'seller' ? currentUser.username : currentUser.name) : 'Người dùng'}
                </span>
              </div>
            </div>
            
            <div className="nav-user-dropdown-menu">
              {currentUser && currentUser.role === 'seller' && (
                <>
                  <Link to="/seller" className="dropdown-item" style={{color: '#10b981', fontWeight: 'bold'}}>Kênh Người Bán</Link>
                  <div className="dropdown-divider"></div>
                </>
              )}
              <Link to="/profile" className="dropdown-item">Tài khoản của tôi</Link>
              <Link to="/profile/orders" className="dropdown-item">Đơn mua</Link>
              <button className="dropdown-item text-danger" onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
