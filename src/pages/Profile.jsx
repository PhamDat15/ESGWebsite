import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Award } from 'lucide-react';
import { mockShops } from '../data/mockShops';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [followedShops, setFollowedShops] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('followedShops') || '[]');
    const shops = mockShops.filter(shop => saved.includes(shop.id));
    setFollowedShops(shops);
  }, []);

  const handleUnfollow = (e, id) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('followedShops') || '[]');
    const updated = saved.filter(shopId => shopId !== id);
    localStorage.setItem('followedShops', JSON.stringify(updated));
    setFollowedShops(mockShops.filter(shop => updated.includes(shop.id)));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h1>Tài khoản của tôi</h1>
          <p>Thành viên thân thiết - Điểm ESG Tích lũy: 120</p>
        </div>
      </div>

      <div className="profile-content">
        <h2>Gian hàng đang theo dõi ({followedShops.length})</h2>
        {followedShops.length === 0 ? (
          <div className="no-followed">
            <p>Bạn chưa theo dõi gian hàng nào.</p>
            <Link to="/shop" className="btn-go-shop">Khám phá ngay</Link>
          </div>
        ) : (
          <div className="shop-grid">
            {followedShops.map(shop => (
              <div className="shop-card" key={shop.id}>
                <div className="shop-img" onClick={() => navigate(`/shop/${shop.id}`)} style={{cursor: 'pointer'}}>
                  <img src={shop.image} alt={shop.name} />
                  <div className="shop-distance">
                    <MapPin size={14} /> {shop.distance}
                  </div>
                </div>
                <div className="shop-info">
                  <h3 onClick={() => navigate(`/shop/${shop.id}`)} style={{cursor: 'pointer'}}>{shop.name}</h3>
                  <div className="shop-stats">
                    <span className="shop-rating"><Star size={14} fill="#f59e0b" color="#f59e0b"/> {shop.rating}</span>
                    <span className="shop-esg"><Award size={14} /> ESG Score: {shop.esg}</span>
                  </div>
                  <button className="btn-unfollow" onClick={(e) => handleUnfollow(e, shop.id)}>Bỏ theo dõi</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
