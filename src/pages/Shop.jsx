import React, { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Award } from 'lucide-react';
import { mockShops } from '../data/mockShops';
import { NotificationContext } from '../context/NotificationContext';
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Tất cả');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả');
  const [visibleCount, setVisibleCount] = useState(10);
  const { addNotification } = useContext(NotificationContext);
  
  const [followedShops, setFollowedShops] = useState(() => {
    return JSON.parse(localStorage.getItem('followedShops') || '[]');
  });

  const toggleFollow = (e, shopId, shopName) => {
    e.stopPropagation();
    let updated;
    if (followedShops.includes(shopId)) {
      updated = followedShops.filter(id => id !== shopId);
      addNotification(`Bạn đã bỏ theo dõi gian hàng của ${shopName}`, 'unfollow');
    } else {
      updated = [...followedShops, shopId];
      addNotification(`Đã theo dõi gian hàng của ${shopName}!`, 'follow');
    }
    setFollowedShops(updated);
    localStorage.setItem('followedShops', JSON.stringify(updated));
  };

  const cities = useMemo(() => {
    const allCities = mockShops.map(s => s.city);
    return ['Tất cả', ...new Set(allCities)];
  }, []);

  const districts = useMemo(() => {
    let filtered = mockShops;
    if (selectedCity !== 'Tất cả') {
      filtered = mockShops.filter(s => s.city === selectedCity);
    }
    const allDistricts = filtered.map(s => s.district);
    return ['Tất cả', ...new Set(allDistricts)];
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict('Tất cả');
  };

  const filteredShops = mockShops.filter(shop => {
    const matchCity = selectedCity === 'Tất cả' || shop.city === selectedCity;
    const matchDistrict = selectedDistrict === 'Tất cả' || shop.district === selectedDistrict;
    return matchCity && matchDistrict;
  });

  const displayedShops = filteredShops.slice(0, visibleCount);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Khám Phá Gian Hàng Gần Bạn</h1>
        <p>Tìm kiếm các hợp tác xã và vựa nông sản đạt chuẩn ESG xung quanh khu vực của bạn.</p>
        <div className="location-filters-row">
          <div className="location-filter">
            <MapPin size={18} />
            <span>Tỉnh/Thành:</span>
            <select 
              value={selectedCity} 
              onChange={handleCityChange}
              className="location-select"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="location-filter">
            <MapPin size={18} />
            <span>Quận/Huyện:</span>
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="location-select"
            >
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="shop-grid">
        {displayedShops.map(shop => (
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
              <div className="shop-actions">
                <button className="btn-visit" onClick={() => navigate(`/shop/${shop.id}`)}>Ghé Thăm</button>
                <button 
                  className={`btn-follow-shop ${followedShops.includes(shop.id) ? 'followed' : ''}`} 
                  onClick={(e) => toggleFollow(e, shop.id, shop.name)}
                >
                  {followedShops.includes(shop.id) ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {visibleCount < filteredShops.length && (
        <div className="shop-load-more" style={{textAlign: 'center', marginTop: '30px', marginBottom: '20px'}}>
          <button 
            onClick={() => setVisibleCount(prev => prev + 10)} 
            className="btn-visit" 
            style={{padding: '12px 30px', fontSize: '16px', borderRadius: 'var(--radius-full)'}}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
