import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Package, Ticket, Heart } from 'lucide-react';
import './ProfileLayout.css';

const ProfileLayout = () => {
  return (
    <div className="profile-layout">
      <div className="profile-sidebar">
        <div className="profile-user-summary">
          <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="sidebar-avatar" />
          <div className="sidebar-user-info">
            <h4>Tài khoản của tôi</h4>
            <p>Điểm ESG: 120</p>
          </div>
        </div>
        
        <nav className="profile-nav">
          <NavLink to="/profile" className={({isActive}) => isActive ? "profile-nav-link active" : "profile-nav-link"} end>
            <User size={18} /> Hồ sơ của tôi
          </NavLink>
          <NavLink to="/profile/orders" className={({isActive}) => isActive ? "profile-nav-link active" : "profile-nav-link"}>
            <Package size={18} /> Đơn mua
          </NavLink>
          <NavLink to="/profile/vouchers" className={({isActive}) => isActive ? "profile-nav-link active" : "profile-nav-link"}>
            <Ticket size={18} /> Kho Voucher
          </NavLink>
          <NavLink to="/profile/following" className={({isActive}) => isActive ? "profile-nav-link active" : "profile-nav-link"}>
            <Heart size={18} /> Gian hàng theo dõi
          </NavLink>
        </nav>
      </div>
      
      <div className="profile-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
