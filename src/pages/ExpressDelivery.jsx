import React, { useState } from 'react';
import { Clock, ThermometerSnowflake, Truck, MapPin, PackageOpen, CheckCircle, Navigation } from 'lucide-react';
import './FeaturePage.css';
import './ExpressDelivery.css';

const ExpressDelivery = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingCode) {
      setTrackingResult({
        code: trackingCode,
        status: 'Đang giao hàng',
        driver: 'Nguyễn Văn A',
        plate: '29A-123.45',
        estTime: '15 phút nữa',
        progress: 75
      });
    }
  };

  return (
    <div className="feature-page express-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>Giao Hỏa Tốc 2H</h1>
          <p>Từ vườn đến bàn ăn chỉ trong chớp mắt. Đảm bảo độ tươi ngon tuyệt đối cho từng mớ rau, quả trái.</p>
        </div>
      </div>

      <div className="express-container">
        {/* Core Promises */}
        <section className="exp-section">
          <div className="exp-promises-grid">
            <div className="exp-promise-card">
              <div className="exp-icon"><Clock size={40} /></div>
              <h3>Giao Siêu Tốc 2 Giờ</h3>
              <p>Cam kết đơn hàng sẽ đến tay bạn trong vòng 2 tiếng kể từ khi đặt hàng tại các khu vực nội thành.</p>
            </div>
            <div className="exp-promise-card">
              <div className="exp-icon"><ThermometerSnowflake size={40} /></div>
              <h3>Bảo Quản Lạnh Sinh Học</h3>
              <p>Sử dụng công nghệ đóng gói giữ nhiệt và đá khô sinh học giúp duy trì độ lạnh lý tưởng suốt quãng đường.</p>
            </div>
            <div className="exp-promise-card">
              <div className="exp-icon"><Truck size={40} /></div>
              <h3>Đội Xe Điện ESG</h3>
              <p>Sử dụng 100% phương tiện giao hàng chạy điện, giảm thiểu khí thải Carbon, thân thiện với môi trường.</p>
            </div>
          </div>
        </section>

        {/* Tracking Section */}
        <section className="exp-section bg-light">
          <div className="exp-tracking-wrapper">
            <div className="exp-tracking-info">
              <h2><MapPin size={32} color="#f59e0b" /> Theo Dõi Đơn Hàng Real-time</h2>
              <p>Kiểm tra chính xác tài xế đang ở đâu và mất bao lâu nữa để nhận được những nông sản tươi ngon nhất.</p>
              
              <form className="exp-tracking-form" onSubmit={handleTrack}>
                <input 
                  type="text" 
                  placeholder="Nhập mã vận đơn (VD: SHIP-999)" 
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  required
                />
                <button type="submit">Theo dõi ngay</button>
              </form>
            </div>

            <div className="exp-tracking-display">
              {!trackingResult ? (
                <div className="exp-map-placeholder">
                  <Navigation size={60} color="#cbd5e1" />
                  <p>Nhập mã vận đơn để xem vị trí bản đồ</p>
                </div>
              ) : (
                <div className="exp-active-tracking">
                  <div className="exp-driver-info">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt="Driver" className="driver-avatar"/>
                    <div>
                      <h4>Tài xế: {trackingResult.driver}</h4>
                      <p>Biển số: <strong>{trackingResult.plate}</strong></p>
                    </div>
                    <div className="est-time">
                      <span>Dự kiến đến sau</span>
                      <strong>{trackingResult.estTime}</strong>
                    </div>
                  </div>
                  
                  <div className="exp-progress-container">
                    <div className="exp-progress-bar">
                      <div className="exp-progress-fill" style={{width: `${trackingResult.progress}%`}}></div>
                    </div>
                    <div className="exp-progress-labels">
                      <span className="active">Lấy hàng</span>
                      <span className="active">Đang giao</span>
                      <span>Hoàn thành</span>
                    </div>
                  </div>

                  <div className="exp-map-mockup">
                    <iframe 
                      title="Tracking Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.294119957385!2d106.69614401533423!3d10.788769361917616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f354c4146a9%3A0x6e2c24efb15eef6b!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1655000000000!5m2!1sen!2s" 
                      style={{width: '100%', height: '100%', border: 0, position: 'absolute', top: 0, left: 0, zIndex: 1}} 
                      loading="lazy"
                    ></iframe>
                    
                    {/* Overlay Elements */}
                    <div className="map-overlay-layer">
                      <div className="route-line"></div>
                      <div className="pulsing-dot"></div>
                      <div className="destination-marker">
                        <div className="marker-pin"><MapPin size={28} color="#ef4444"/></div>
                        <div className="marker-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Packaging standards */}
        <section className="exp-section">
          <h2 className="exp-section-title">Quy Chuẩn Đóng Gói Vận Chuyển</h2>
          <div className="exp-packaging-grid">
            <div className="pkg-item">
              <PackageOpen size={40} className="pkg-icon" />
              <h4>Hộp Giấy Kraft Xanh</h4>
              <p>Bảo vệ hoa quả khỏi va đập, 100% phân hủy tự nhiên.</p>
            </div>
            <div className="pkg-item">
              <ThermometerSnowflake size={40} className="pkg-icon" />
              <h4>Túi Giữ Nhiệt 4 Lớp</h4>
              <p>Đảm bảo thịt, cá, sữa tươi duy trì nhiệt độ 0-4°C.</p>
            </div>
            <div className="pkg-item">
              <CheckCircle size={40} className="pkg-icon" />
              <h4>Tem Niêm Phong</h4>
              <p>Niêm phong an toàn tuyệt đối từ kho đến tay khách hàng.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpressDelivery;
