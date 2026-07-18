import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Trash2 } from 'lucide-react';
import { mockShops } from '../data/mockShops';
import './ProfileFollowed.css';

const ProfileFollowed = () => {
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
    <div className="profile-followed-section">
      <h2 className="section-title">Gian hàng đang theo dõi ({followedShops.length})</h2>
      
      {followedShops.length === 0 ? (
        <div className="no-followed">
          <p>Bạn chưa theo dõi gian hàng nào.</p>
          <Link to="/shop" className="btn-go-shop">Khám phá ngay</Link>
        </div>
      ) : (
        <div className="followed-list">
          {followedShops.map(shop => (
            <div className="followed-list-item" key={shop.id} onClick={() => navigate(`/shop/${shop.id}`)}>
              <img src={shop.image} alt={shop.name} className="followed-avatar" />
              <div className="followed-info">
                <h3>{shop.name}</h3>
                <p><MapPin size={14}/> {shop.address}</p>
              </div>
              <button className="btn-unfollow-icon" onClick={(e) => handleUnfollow(e, shop.id)} title="Bỏ theo dõi">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFollowed;
