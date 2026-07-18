import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Award, ArrowLeft } from 'lucide-react';
import { mockShops } from '../data/mockShops';
import { mockProducts } from '../data/mockProducts';
import { NotificationContext } from '../context/NotificationContext';
import './ShopDetail.css';

const mockReviews = [
  { id: 1, user: 'Minh Tuấn', rating: 5, date: '12/10/2026', comment: 'Rau rất tươi và sạch. Giao hàng nhanh gọn, bao bì giấy bảo vệ môi trường, đúng chuẩn ESG!', avatar: 'M' },
  { id: 2, user: 'Hà Trang', rating: 5, date: '05/10/2026', comment: 'Chủ shop dễ thương, tư vấn nhiệt tình. Sản phẩm đóng gói kỹ, chất lượng tuyệt vời.', avatar: 'H' },
  { id: 3, user: 'Lê Phong', rating: 4, date: '28/09/2026', comment: 'Trái cây ngọt tự nhiên, giá hơi cao một chút nhưng xứng đáng vì là nông sản hữu cơ.', avatar: 'L' },
  { id: 4, user: 'Ngọc Lan', rating: 5, date: '15/09/2026', comment: 'Đã mua ở đây nhiều lần và chưa bao giờ thất vọng. Quét mã QR ra được luôn vùng trồng.', avatar: 'N' },
  { id: 5, user: 'Thành Đạt', rating: 5, date: '02/09/2026', comment: 'Rất ủng hộ mô hình canh tác bền vững của hợp tác xã. Nông sản đạt chuẩn, ăn rất yên tâm.', avatar: 'T' },
  { id: 6, user: 'Bích Ngọc', rating: 4, date: '20/08/2026', comment: 'Giao hàng hơi trễ 1 ngày nhưng rau củ vẫn rất tươi. Sẽ tiếp tục ủng hộ gian hàng.', avatar: 'B' },
  { id: 7, user: 'Quốc Bảo', rating: 5, date: '10/08/2026', comment: 'Chất lượng 10 điểm! Lần đầu tiên mua nông sản online mà ưng ý đến vậy.', avatar: 'Q' }
];

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopId = parseInt(id);
  const shop = mockShops.find(s => s.id === shopId);
  const { addNotification } = useContext(NotificationContext);

  const [activeTab, setActiveTab] = useState('products');

  const [followedShops, setFollowedShops] = useState(() => {
    return JSON.parse(localStorage.getItem('followedShops') || '[]');
  });

  const toggleFollow = () => {
    let updated;
    if (followedShops.includes(shopId)) {
      updated = followedShops.filter(fid => fid !== shopId);
      addNotification(`Bạn đã bỏ theo dõi gian hàng của ${shop.name}`, 'unfollow');
    } else {
      updated = [...followedShops, shopId];
      addNotification(`Đã theo dõi gian hàng của ${shop.name}!`, 'follow');
    }
    setFollowedShops(updated);
    localStorage.setItem('followedShops', JSON.stringify(updated));
  };

  const isFollowed = followedShops.includes(shopId);

  if (!shop) {
    return <div style={{padding: '50px', textAlign: 'center'}}><h2>Gian hàng không tồn tại!</h2></div>;
  }

  // Phân bổ khoảng 12 sản phẩm ngẫu nhiên dựa trên shopId
  const startIndex = (shopId * 12) % mockProducts.length;
  const shopProducts = mockProducts.slice(startIndex, startIndex + 12);

  return (
    <div className="shop-detail-page">
      <button className="back-btn" onClick={() => navigate('/shop')}>
        <ArrowLeft size={16} /> Quay lại danh sách gian hàng
      </button>

      <div className="shop-banner">
        <img src={shop.image} alt={shop.name} className="shop-banner-img" />
        <div className="shop-banner-content">
          <div className="shop-banner-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
              <h1 style={{ marginBottom: 0 }}>{shop.name}</h1>
              <button 
                onClick={toggleFollow}
                onMouseEnter={(e) => {
                  if (isFollowed) {
                    e.target.style.background = '#fee2e2';
                    e.target.style.color = '#ef4444';
                    e.target.style.borderColor = '#ef4444';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFollowed) {
                    e.target.style.background = 'white';
                    e.target.style.color = 'var(--color-primary-dark)';
                    e.target.style.borderColor = 'white';
                  }
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid white',
                  background: isFollowed ? 'white' : 'transparent',
                  color: isFollowed ? 'var(--color-primary-dark)' : 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isFollowed ? 'Đang theo dõi' : '+ Theo dõi'}
              </button>
            </div>
            <div className="shop-banner-stats">
              <span><MapPin size={16} /> {shop.address} (Cách {shop.distance})</span>
              <span><Star size={16} fill="#f59e0b" color="#f59e0b"/> Đánh giá: {shop.rating}</span>
              <span><Award size={16} /> ESG: {shop.esg}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-content-section">
        <div className="shop-tabs">
          <button 
            className={`shop-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Sản phẩm đang bày bán ({shopProducts.length})
          </button>
          <button 
            className={`shop-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Đánh giá của khách hàng (1.2k)
          </button>
        </div>

        {activeTab === 'products' ? (
          <div className="shop-detail-grid">
            {shopProducts.map((product, index) => {
              // Chọn ngẫu nhiên sản phẩm hết hàng nhưng bỏ qua dòng đầu tiên (index > 3)
              // Dùng công thức shopId + index để tạo ngẫu nhiên giả (deterministic) tránh re-render flash
              const isOutOfStock = index > 3 && (shopId * 7 + index * 3) % 10 > 7; 
              return (
                <Link 
                  to={isOutOfStock ? "#" : `/product/${product.id}`} 
                  className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} 
                  key={product.id}
                  onClick={(e) => { if(isOutOfStock) e.preventDefault(); }}
                >
                  <div className="product-img-wrapper">
                    <img src={product.image} alt={product.name} />
                    {isOutOfStock ? (
                      <div className="badge-out-of-stock">Hết hàng</div>
                    ) : (
                      <div className="badge-fresh">Fresh {product.freshIndex}</div>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price-row">
                      <span className="product-price">{product.price}</span>
                      <span className="product-sales">{product.sales}</span>
                    </div>
                    <div className="product-scores">
                      <span className="score-badge">ESG: {product.esgScore}</span>
                      <span className="score-badge orange">CO2: Thấp</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="shop-reviews-section">
            <div className="reviews-summary">
              <div className="rs-score">
                <h2>{shop.rating}</h2>
                <div className="rs-stars">
                  <Star fill="#f59e0b" color="#f59e0b" size={20}/>
                  <Star fill="#f59e0b" color="#f59e0b" size={20}/>
                  <Star fill="#f59e0b" color="#f59e0b" size={20}/>
                  <Star fill="#f59e0b" color="#f59e0b" size={20}/>
                  <Star fill="#f59e0b" color="#f59e0b" size={20}/>
                </div>
                <p>1.2k Đánh giá</p>
              </div>
              <div className="rs-filters">
                <button className="rs-filter active">Tất cả</button>
                <button className="rs-filter">5 Sao (1k)</button>
                <button className="rs-filter">4 Sao (150)</button>
                <button className="rs-filter">3 Sao (30)</button>
                <button className="rs-filter">Có hình ảnh/video (420)</button>
                <button className="rs-filter">Có bình luận (890)</button>
              </div>
            </div>

            <div className="reviews-list">
              {mockReviews.map(review => (
                <div className="review-item" key={review.id}>
                  <div className="review-avatar">{review.avatar}</div>
                  <div className="review-content">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < review.rating ? "#f59e0b" : "#e5e7eb"} color={i < review.rating ? "#f59e0b" : "#e5e7eb"} size={14}/>
                      ))}
                    </div>
                    <div className="review-text">{review.comment}</div>
                    <div className="review-actions">
                      <button className="review-like-btn">Hữu ích (12)</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;
