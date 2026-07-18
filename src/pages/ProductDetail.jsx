import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, CheckCircle2, MapPin, PlayCircle, ShieldCheck, Leaf, Truck } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { CartContext } from '../context/CartContext';
import AddToCartModal from '../components/AddToCartModal';
import DigitalPassportModal from '../components/DigitalPassportModal';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('cart');
  const [passportModal, setPassportModal] = useState({ isOpen: false, type: null });
  const { addToCart } = useContext(CartContext);
  const product = mockProducts.find(p => p.id === parseInt(id));

  const [liveFreshIndex, setLiveFreshIndex] = useState(product ? product.freshIndex : 0);

  useEffect(() => {
    if (!product) return;
    // Mô phỏng cập nhật Real-time: Giảm 1 điểm sau mỗi 10 giây để demo
    const timer = setInterval(() => {
      setLiveFreshIndex(prev => prev > product.freshIndex - 5 ? prev - 1 : prev);
    }, 10000);
    return () => clearInterval(timer);
  }, [product]);

  if (!product) {
    return <div className="product-page" style={{padding: '50px', textAlign: 'center'}}><h2>Sản phẩm không tồn tại!</h2></div>;
  }

  const keyword = product.name.split(' ').slice(0, 2).join(' ');
  let recommendations = mockProducts
    .filter(p => p.id !== product.id && p.name.includes(keyword))
    .sort((a, b) => Math.abs(a.esgScore - product.esgScore) - Math.abs(b.esgScore - product.esgScore));
  
  if (recommendations.length < 2) {
    const fallback = mockProducts
      .filter(p => p.id !== product.id && !p.name.includes(keyword))
      .sort((a, b) => Math.abs(a.esgScore - product.esgScore) - Math.abs(b.esgScore - product.esgScore));
    recommendations = [...recommendations, ...fallback];
  }
  
  const finalRecs = recommendations.slice(0, 2);

  return (
    <div className="product-page">
      <div className="product-grid">
        
        {/* Left Column - Media & Passport */}
        <div className="col-left">
          <div className="media-gallery">
            <div className="thumbnails">
              <div className="thumb active"><img src={product.image} alt="thumb1" /></div>
              <div className="thumb has-video">
                <img src={product.image} alt="thumb2" />
                <PlayCircle className="play-icon" size={24} />
              </div>
              <div className="thumb"><img src={product.image} alt="thumb3" /></div>
              <div className="thumb"><img src={product.image} alt="thumb4" /></div>
            </div>
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          
          <div className="digital-passport">
            <h3 className="section-title text-center">Digital Passport</h3>
            <div className="passport-cards">
              <div className="p-card" onClick={() => setPassportModal({ isOpen: true, type: 'log' })} style={{cursor: 'pointer'}}>
                <div className="p-icon-wrapper"><Leaf size={24} /></div>
                <span>Cultivation Log</span>
              </div>
              <div className="p-card" onClick={() => setPassportModal({ isOpen: true, type: 'video' })} style={{cursor: 'pointer'}}>
                <div className="p-icon-wrapper"><PlayCircle size={24} /></div>
                <span>Harvest Video</span>
              </div>
              <div className="p-card" onClick={() => setPassportModal({ isOpen: true, type: 'certificate' })} style={{cursor: 'pointer'}}>
                <div className="p-icon-wrapper"><ShieldCheck size={24} /></div>
                <span>VietGAP Certification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Main Info */}
        <div className="col-middle">
          <div className="coop-info">
            Gian hàng <strong>Đối tác Tiêu chuẩn</strong>
          </div>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="score-box">
            <div className="fresh-index-container">
              <div className="fresh-index-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <CheckCircle2 className="icon-green" size={20} />
                  <span><strong>Live Fresh Index:</strong> <span className="live-score" style={{color: '#16a34a', fontSize: '18px'}}>{liveFreshIndex}/100</span></span>
                </div>
                <div className="live-badge">● Theo thời gian thực</div>
              </div>
              <div className="fresh-progress-bar">
                <div className="fresh-progress-fill" style={{ width: `${liveFreshIndex}%` }}></div>
              </div>
              <p className="fresh-desc">Dựa trên: Thời gian thu hoạch (16h trước), nhiệt độ xe lạnh và thời gian dự kiến giao.</p>
            </div>

            <div className="score-item" style={{marginTop: '16px'}}>
              <div className="dot-orange"></div>
              <span><strong>Carbon Score: A</strong> (Lượng khí thải tối thiểu)</span>
            </div>
            <div className="score-item">
              <CheckCircle2 className="icon-green" size={20} />
              <span><strong>ESG Score: {product.esgScore}/100</strong> (Đạt chuẩn nông nghiệp bền vững)</span>
            </div>
          </div>
          
          <div className="price-section">
            <div className="price">{product.price}</div>
            <div className="rating">
              <Star className="star-filled" size={18} fill="#f59e0b" color="#f59e0b" />
              <span><strong>4.9</strong> ({product.sales})</span>
            </div>
          </div>
          
          <div className="quantity-section">
            Số lượng: <strong>1 kg</strong> (Tối đa 5kg)
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => { setModalMode('cart'); setShowModal(true); }}>Thêm vào giỏ hàng</button>
            <button className="btn btn-secondary" onClick={() => { setModalMode('buy'); setShowModal(true); }}>Mua ngay</button>
          </div>
          
          {showModal && <AddToCartModal product={product} onClose={() => setShowModal(false)} mode={modalMode} />}
        </div>

        {/* Right Column - AI & Logistics */}
        <div className="col-right">
          
          <div className="sidebar-card">
            <h4 className="card-title">AI Fresh Check</h4>
            <div className="fresh-check-content">
              <img src={product.image} alt="AI checking product" className="ai-img" />
              <div className="ai-result">
                <CheckCircle2 className="icon-green" size={16} style={{minWidth: '16px'}} />
                <span><strong>AI Chấm điểm: 9.2/10</strong> <br/> <small>(Màu sắc, kích thước, độ đồng đều đạt chuẩn)</small></span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-card">
            <h4 className="card-title">AI Recommendation</h4>
            <p className="subtitle-sm">Gợi ý tương tự tối ưu ESG:</p>
            <div className="rec-list">
              {finalRecs.map(rec => (
                  <div 
                    className="rec-item" 
                    key={rec.id} 
                    onClick={() => { navigate(`/product/${rec.id}`); window.scrollTo(0,0); }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={rec.image} alt={rec.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div className="rec-info">
                      <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {rec.name}
                      </h5>
                      <small style={{ display: 'block', color: '#64748b', fontSize: '11px' }}>Fresh Index: {rec.freshIndex}</small>
                      <small style={{ display: 'block', color: '#64748b', fontSize: '11px' }}>ESG Score: {rec.esgScore}</small>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="sidebar-card">
            <h4 className="card-title">Lộ trình Logistics Xanh</h4>
            <div className="gl-timeline-container">
              <div className="gl-point">
                <MapPin size={18} color="#16a34a" />
                <span>Nông trại</span>
              </div>
              <div className="gl-line">
                <Truck size={20} color="#0284c7" className="gl-truck" />
              </div>
              <div className="gl-point">
                <MapPin size={18} color="#f59e0b" />
                <span>Kho ECO</span>
              </div>
            </div>
            
            <div className="gl-metrics">
              <div className="gl-metric-item">
                <span className="gl-m-label">Quãng đường:</span>
                <span className="gl-m-value">~320 km</span>
              </div>
              <div className="gl-metric-item">
                <span className="gl-m-label">Phương tiện:</span>
                <span className="gl-m-value ev">Xe Tải Điện (EV) 100%</span>
              </div>
              <div className="gl-metric-item highlight">
                <span className="gl-m-label">Giảm phát thải:</span>
                <span className="gl-m-value co2">-45% CO2e</span>
              </div>
            </div>

            <div className="gl-footer-note">
              <Leaf size={14} color="#16a34a" style={{minWidth: '14px'}} />
              <small>Sử dụng 100% thùng luân chuyển tái sử dụng thay cho thùng rác thải một lần.</small>
            </div>
          </div>
          
        </div>

      </div>

      <div className="product-bottom-section">
        <div className="product-description-card">
          <h3 className="section-title-large">Mô Tả Sản Phẩm</h3>
          <div className="description-content">
            <p>Sản phẩm <strong>{product.name}</strong> được cung cấp trực tiếp từ nhà nông và hợp tác xã địa phương. Chúng tôi cam kết chất lượng tươi ngon và tuân thủ các quy trình canh tác thân thiện với môi trường theo tiêu chuẩn ESG (Environment, Social, Governance).</p>
            <ul>
              <li><strong>Tiêu chuẩn:</strong> Canh tác hữu cơ sinh thái, sử dụng phân bón tự nhiên. Đạt chuẩn VietGAP/GlobalGAP tùy phân loại.</li>
              <li><strong>Đóng gói:</strong> Sử dụng 100% bao bì có thể tái chế, phân hủy sinh học, giảm thiểu rác thải nhựa.</li>
              <li><strong>Cam kết:</strong> 1 đổi 1 nếu sản phẩm dập nát hoặc không đạt độ tươi (Fresh Index dưới 80).</li>
            </ul>
            <p>Việc bạn chọn mua sản phẩm này đã đóng góp trực tiếp vào quỹ hỗ trợ nông dân vùng sâu vùng xa và giúp giảm thiểu {100 - product.esgScore}% lượng khí thải CO2 so với phương thức vận chuyển truyền thống.</p>
          </div>
        </div>

        {/* Thông tin Chi tiết (Đồng bộ với dữ liệu Người Bán nhập vào) */}
        <div className="product-spec-card">
          <h3 className="section-title-large">Chi Tiết Sản Phẩm (Minh bạch Nguồn gốc)</h3>
          
          <div className="spec-grid">
            <div className="spec-section">
              <h4>1. Thông tin cơ bản</h4>
              <table className="spec-table">
                <tbody>
                  <tr><td>Danh mục:</td><td>Nông sản sạch</td></tr>
                  <tr><td>Thương hiệu / HTX:</td><td>Hợp tác xã Nông nghiệp Xanh</td></tr>
                  <tr><td>Xuất xứ:</td><td>Việt Nam</td></tr>
                  <tr><td>Hạn sử dụng:</td><td>14 ngày (Bảo quản lạnh 4-8°C)</td></tr>
                  <tr><td>Khối lượng tịnh:</td><td>1kg / gói</td></tr>
                </tbody>
              </table>
            </div>

            <div className="spec-section">
              <h4>2. Thông tin Vùng trồng</h4>
              <table className="spec-table">
                <tbody>
                  <tr><td>Địa chỉ nông trại:</td><td>Xã Mộc Châu, Huyện Mộc Châu, Tỉnh Sơn La</td></tr>
                  <tr><td>Diện tích canh tác:</td><td>5 Hecta</td></tr>
                  <tr><td>Nguồn nước tưới:</td><td>Hệ thống lọc RO và nước suối tự nhiên</td></tr>
                  <tr><td>Loại đất:</td><td>Đất đỏ bazan giàu khoáng chất</td></tr>
                </tbody>
              </table>
            </div>

            <div className="spec-section">
              <h4>3. Chứng nhận & Chất lượng</h4>
              <div className="spec-badges">
                <span className="cert-badge"><ShieldCheck size={16}/> VietGAP (Mã: VG-2025)</span>
                <span className="cert-badge"><ShieldCheck size={16}/> Hữu cơ TCVN 11041-2:2017</span>
                <span className="cert-badge"><ShieldCheck size={16}/> ISO 22000:2018</span>
              </div>
            </div>

            <div className="spec-section">
              <h4>4. Nhật ký Canh tác & Thu hoạch</h4>
              <table className="spec-table">
                <tbody>
                  <tr><td>Ngày gieo trồng:</td><td>12/03/2026</td></tr>
                  <tr><td>Quy trình bón phân:</td><td>100% Phân bón vi sinh (Ngày 15 và Ngày 45)</td></tr>
                  <tr><td>Quản lý sâu bệnh:</td><td>Dùng thiên địch tự nhiên, không sử dụng thuốc BVTV hóa học</td></tr>
                  <tr><td>Ngày thu hoạch:</td><td>Hôm qua (Sáng sớm 05:00 - 07:00)</td></tr>
                  <tr><td>Quy cách đóng gói:</td><td>Sử dụng lá chuối và túi giấy Kraft tự hủy sinh học</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="product-reviews-card">
          <h3 className="section-title-large">Đánh Giá Sản Phẩm</h3>
          <div className="reviews-summary">
            <div className="rating-big-box">
              <div className="rating-score">4.9<span>/5</span></div>
              <div className="rating-stars">
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
              </div>
            </div>
            <div className="rating-filters">
              <button className="filter-btn active">Tất cả ({product.sales})</button>
              <button className="filter-btn">5 Sao (1.1k)</button>
              <button className="filter-btn">Có hình ảnh / Video (450)</button>
            </div>
          </div>
          
          <div className="review-list">
            <div className="review-item">
              <div className="reviewer-avatar"><img src="https://i.pravatar.cc/150?img=32" alt="User" /></div>
              <div className="review-content">
                <div className="reviewer-name">Trần Văn A</div>
                <div className="review-stars">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                </div>
                <div className="review-time">2026-07-10 14:30 | Phân loại: Hàng Loại 1</div>
                <div className="review-text">Sản phẩm cực kỳ tươi ngon! Đóng gói bằng hộp giấy carton tổ ong rất thân thiện với môi trường đúng như cam kết. Check mã QR thấy rõ được quy trình trồng trọt nên rất yên tâm. Sẽ ủng hộ shop dài dài!</div>
              </div>
            </div>
            <div className="review-item">
              <div className="reviewer-avatar"><img src="https://i.pravatar.cc/150?img=45" alt="User" /></div>
              <div className="review-content">
                <div className="reviewer-name">Nguyễn Thị B</div>
                <div className="review-stars">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} color="#ccc" />
                </div>
                <div className="review-time">2026-07-08 09:15 | Phân loại: Hàng Loại 1</div>
                <div className="review-text">Giao hàng nhanh, quả to đều, ăn vị ngọt tự nhiên. Có điều 1 quả hơi móp xíu do vận chuyển nhưng không ảnh hưởng chất lượng. Điểm cộng là có thể theo dõi lượng Carbon thải ra và điểm ESG. Mua sắm có ý thức hơn hẳn.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Digital Passport Modal */}
      <DigitalPassportModal 
        isOpen={passportModal.isOpen} 
        onClose={() => setPassportModal({ isOpen: false, type: null })}
        type={passportModal.type}
      />
    </div>
  );
};

export default ProductDetail;
