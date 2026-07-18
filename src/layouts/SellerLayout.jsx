import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf, LayoutDashboard, Package, ShoppingBag, Settings, LogOut, ExternalLink } from 'lucide-react';
import './SellerLayout.css';

const SellerLayout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, or not a seller, kick them out
    if (!currentUser || currentUser.role !== 'seller') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'seller') return null;

  return (
    <div className="seller-layout">
      {/* Sidebar */}
      <aside className="seller-sidebar">
        <div className="seller-brand">
          <Leaf size={32} color="#10b981" />
          <span>EcoFlow Seller</span>
        </div>
        
        <nav className="seller-nav">
          <NavLink to="/seller" end className={({isActive}) => isActive ? "s-nav-item active" : "s-nav-item"}>
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </NavLink>
          <NavLink to="/seller/products" className={({isActive}) => isActive ? "s-nav-item active" : "s-nav-item"}>
            <Package size={20} />
            <span>Nông sản của tôi</span>
          </NavLink>
          <NavLink to="/seller/orders" className={({isActive}) => isActive ? "s-nav-item active" : "s-nav-item"}>
            <ShoppingBag size={20} />
            <span>Quản lý đơn hàng</span>
          </NavLink>
          <NavLink to="/seller/profile" className={({isActive}) => isActive ? "s-nav-item active" : "s-nav-item"}>
            <Settings size={20} />
            <span>Hồ sơ Nhà nông</span>
          </NavLink>
        </nav>

        <div className="seller-bottom">
          <Link to={`/shop/${currentUser.shopId || 1}`} className="s-nav-item" style={{marginBottom: '5px', color: '#3b82f6'}}>
            <ExternalLink size={20} />
            <span>Xem Gian Hàng</span>
          </Link>
          <Link to="/" className="btn-seller-logout" style={{color: '#64748b', textDecoration: 'none'}}>
            <LogOut size={20} />
            <span>Quay lại Kênh mua sắm</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="seller-main-wrapper">
        <header className="seller-header">
          <div className="sh-left">
            <h2>Kênh Nhà Nông</h2>
          </div>
          <div className="sh-right">
            <span className="sh-welcome">Xin chào, <strong>{currentUser.name}</strong>!</span>
            <div className="sh-avatar">{currentUser.name.charAt(0)}</div>
          </div>
        </header>

        <main className="seller-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
