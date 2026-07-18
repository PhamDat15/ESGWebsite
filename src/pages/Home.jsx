import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Leaf, Medal, Tag, HeartHandshake, Sparkles, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import './Home.css';

const Home = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const products = mockProducts;
  const sliderRef = useRef(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide(prev => prev + 1);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentSlide >= totalSlides) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  // AI lấy 12 sản phẩm từ giữa mảng (ví dụ index 12 -> 24) để hoàn toàn khác biệt
  const aiRecommendations = products.slice(15, 27);
  
  // Lô hàng mới lấy từ đầu mảng, lọc bỏ những sản phẩm đã có ở phần AI
  const aiProductIds = new Set(aiRecommendations.map(p => p.id));
  const newShipments = products.filter(p => !aiProductIds.has(p.id));

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400; // Cuộn khoảng 2 thẻ
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Banner Section similar to Shopee */}
      <section className="banner-section">
        <div className="main-banner">
          <div 
            className="banner-slider-track" 
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* Slide 1 */}
            <Link to="/shop" className="banner-slide">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Siêu sale nông sản" />
              <div className="banner-overlay">
                <h2>LỄ HỘI NÔNG SẢN XANH</h2>
                <p>Giảm giá tới 50% cho các sản phẩm đạt chuẩn ESG</p>
                <button className="banner-btn">Khám phá ngay</button>
              </div>
            </Link>
            {/* Slide 2 */}
            <Link to="/shop" className="banner-slide">
              <img src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1200" alt="Rau củ hữu cơ" />
              <div className="banner-overlay">
                <h2>BỮA ĂN SẠCH, KHỎE MẠNH</h2>
                <p>Nông sản tươi ngon giao tận nhà trong 2H</p>
                <button className="banner-btn">Mua ngay</button>
              </div>
            </Link>
            {/* Slide 3 */}
            <Link to="/farmers" className="banner-slide">
              <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1200" alt="Hỗ trợ nhà nông" />
              <div className="banner-overlay">
                <h2>KẾT NỐI NHÀ NÔNG</h2>
                <p>Đồng hành cùng hợp tác xã phát triển bền vững</p>
                <button className="banner-btn">Tìm hiểu thêm</button>
              </div>
            </Link>
            {/* Clone of Slide 1 for infinite loop */}
            <Link to="/shop" className="banner-slide" aria-hidden="true">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Siêu sale nông sản" />
              <div className="banner-overlay">
                <h2>LỄ HỘI NÔNG SẢN XANH</h2>
                <p>Giảm giá tới 50% cho các sản phẩm đạt chuẩn ESG</p>
                <button className="banner-btn">Khám phá ngay</button>
              </div>
            </Link>
          </div>
          <div className="banner-dots">
            {[0, 1, 2].map(idx => (
              <span key={idx} className={`dot ${(currentSlide % totalSlides) === idx ? 'active' : ''}`} onClick={() => { setIsTransitioning(true); setCurrentSlide(idx); }}></span>
            ))}
          </div>
        </div>
        <div className="sub-banners">
          <Link to="/vouchers" className="sub-banner">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600" alt="Ưu đãi Voucher" />
            <div className="sub-banner-overlay">
              <h3>Siêu Ưu Đãi & Voucher</h3>
            </div>
          </Link>
          <Link to="/shop" className="sub-banner">
            <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=600" alt="Shop đề cử" />
            <div className="sub-banner-overlay">
              <h3>Gian Hàng Đề Cử</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Row - Các dịch vụ tiện ích */}
      <section className="features-row">
        <Link to="/clean-produce" className="feature-item">
          <div className="feature-icon"><Leaf size={28} /></div>
          <span>Nông Sản Sạch</span>
        </Link>
        <Link to="/guarantee" className="feature-item">
          <div className="feature-icon"><ShieldCheck size={28} /></div>
          <span>Bảo Đảm 100%</span>
        </Link>
        <Link to="/express-delivery" className="feature-item">
          <div className="feature-icon"><Truck size={28} /></div>
          <span>Giao Hỏa Tốc</span>
        </Link>
        <Link to="/esg-ranking" className="feature-item">
          <div className="feature-icon"><Medal size={28} /></div>
          <span>ESG Ranking</span>
        </Link>
        <Link to="/vouchers" className="feature-item">
          <div className="feature-icon"><Tag size={28} /></div>
          <span>Mã Giảm Giá</span>
        </Link>
        <Link to="/farmer-support" className="feature-item">
          <div className="feature-icon"><HeartHandshake size={28} /></div>
          <span>Hỗ Trợ Nhà Nông</span>
        </Link>
      </section>

      {/* AI Recommendation Section */}
      <section className="product-section ai-section">
        <div className="section-header">
          <h2 className="section-title ai-title">
            <Sparkles size={24} className="icon-pulse" color="#3b82f6" /> 
            GỢI Ý CÁ NHÂN HÓA TỪ AI
          </h2>
          <div className="slider-controls">
            <button onClick={() => scrollSlider('left')} className="slider-btn"><ChevronLeft size={20}/></button>
            <button onClick={() => scrollSlider('right')} className="slider-btn"><ChevronRight size={20}/></button>
          </div>
        </div>
        
        <div className="ai-slider-container" ref={sliderRef}>
          <div className="ai-grid-slider">
            {aiRecommendations.map((product, index) => {
              const aiReasons = [
                `AI phân tích: Vị trí giao hàng gần bạn nhất (3km) + Giá tốt nhất (${product.price}) + Fresh Index đạt ${product.freshIndex}/100.`,
                `AI phân tích: Quãng đường logistics tối ưu (5km) + Đang có mức giá cực ưu đãi (${product.price}) + Độ tươi tuyệt hảo: ${product.freshIndex}/100.`,
                `AI phân tích: Nằm trong vùng giao hỏa tốc (2km) + Phù hợp ngân sách (${product.price}) + Fresh Index duy trì mức cao: ${product.freshIndex}/100.`,
                `AI phân tích: Tuyến đường vận chuyển ít Carbon nhất (4km) + Giá cực kỳ cạnh tranh (${product.price}) + Fresh Index: ${product.freshIndex}/100.`
              ];
              const reason = aiReasons[index % 4];
              
              return (
                <Link to={`/product/${product.id}`} className="product-card ai-card" key={`ai-${product.id}`}>
                  <div className="ai-badge-container">
                    <div className="ai-badge">
                      <Sparkles size={14} /> AI Đề xuất
                    </div>
                    <div className="ai-tooltip">
                      <Info size={14} style={{flexShrink: 0}} /> {reason}
                    </div>
                </div>
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  <div className="badge-fresh">Fresh {product.freshIndex}</div>
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
            )
          })}
          </div>
        </div>
      </section>

      {/* Hot & Best Selling Products */}
      <section className="product-section">
        <div className="section-header">
          <h2 className="section-title">GỢI Ý HÔM NAY (HOT LÔ TRỒNG MỚI)</h2>
          <Link to="/" className="see-all">Xem tất cả &gt;</Link>
        </div>
        
        <div className="home-product-grid">
          {newShipments.slice(0, visibleCount).map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="badge-fresh">Fresh {product.freshIndex}</div>
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
            ))}
          </div>
        
        {visibleCount < newShipments.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>Xem thêm</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
