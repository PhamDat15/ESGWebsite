import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, ShieldCheck, Heart, Wind, Droplets, Target, Calendar } from 'lucide-react';
import './AnnualReport.css';

const AnimatedCounter = ({ end, duration, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const AnnualReport = () => {
  return (
    <div className="annual-report-page">
      {/* 1. Hero Section */}
      <section className="ar-hero">
        <div className="ar-hero-bg"></div>
        <div className="ar-hero-content">
          <div className="ar-year-badge">BÁO CÁO THƯỜNG NIÊN 2026</div>
          <h1>Hành Trình Xanh: Nông Nghiệp Vị Nhân Sinh</h1>
          <p>Cam kết kiến tạo một hệ sinh thái nông nghiệp bền vững, minh bạch và chia sẻ giá trị.</p>
        </div>
      </section>

      {/* 2. Dashboard Các Chỉ Số */}
      <section className="ar-section bg-dark text-white">
        <div className="ar-container">
          <div className="ar-section-header">
            <h2>Dấu Ấn 2026</h2>
            <p>Những con số biết nói từ nỗ lực chung của cộng đồng.</p>
          </div>
          
          <div className="ar-stats-grid">
            <div className="ar-stat-card">
              <div className="stat-icon env"><Wind size={32} /></div>
              <div className="stat-number"><AnimatedCounter end={1250} duration={2000} suffix=" Tấn" /></div>
              <div className="stat-label">CO2 Đã Cắt Giảm</div>
              <p>Nhờ chuyển đổi 100% đội xe điện và tối ưu lộ trình.</p>
            </div>
            <div className="ar-stat-card">
              <div className="stat-icon soc"><Users size={32} /></div>
              <div className="stat-number"><AnimatedCounter end={5400} duration={2500} suffix="+" /></div>
              <div className="stat-label">Việc Làm Được Tạo Ra</div>
              <p>Hỗ trợ trực tiếp cho bà con nông dân và đồng bào dân tộc.</p>
            </div>
            <div className="ar-stat-card">
              <div className="stat-icon gov"><ShieldCheck size={32} /></div>
              <div className="stat-number"><AnimatedCounter end={100} duration={1500} suffix="%" /></div>
              <div className="stat-label">Minh Bạch Truy Xuất</div>
              <p>Toàn bộ sản phẩm đều có mã QR truy xuất Blockchain.</p>
            </div>
            <div className="ar-stat-card">
              <div className="stat-icon"><Droplets size={32} color="#0ea5e9" /></div>
              <div className="stat-number"><AnimatedCounter end={3} duration={1000} suffix=" Triệu" /></div>
              <div className="stat-label">M3 Nước Tiết Kiệm</div>
              <p>Thông qua việc áp dụng công nghệ tưới tiêu nhỏ giọt IoT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Câu Chuyện Thực Tế */}
      <section className="ar-section">
        <div className="ar-container">
          <div className="ar-section-header">
            <h2>Câu Chuyện Đổi Thay</h2>
            <p>Từ đồng ruộng đến bàn ăn, mỗi thay đổi nhỏ mang lại giá trị lớn.</p>
          </div>

          <div className="ar-story-zigzag">
            <div className="story-row">
              <div className="story-img" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800")'}}></div>
              <div className="story-text">
                <h3>Vực dậy Hợp tác xã Mộc Châu</h3>
                <p>Trước năm 2025, HTX Mộc Châu gặp khó khăn lớn do điệp khúc "Được mùa mất giá". Thông qua **Quỹ Khởi Nghiệp Xanh**, chúng tôi đã cấp vốn không lãi suất để HTX chuyển đổi sang mô hình nhà kính và đạt chuẩn GlobalGAP.</p>
                <p>Kết quả: Thu nhập của 50 hộ dân tăng 2.5 lần trong chưa đầy 1 năm.</p>
              </div>
            </div>

            <div className="story-row reverse">
              <div className="story-img" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800")'}}></div>
              <div className="story-text">
                <h3>Không rác thải nhựa tại vườn</h3>
                <p>Nông dân tại Bến Tre đã tiên phong dùng lá chuối sấy và dây đay để đóng gói toàn bộ trái cây xuất vườn. Chiến dịch này giúp giảm 1.5 tấn rác thải nhựa nilon mỗi tháng, tạo ra xu hướng bao bì xanh trên toàn hệ thống.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dòng Tiền ESG */}
      <section className="ar-section bg-gray">
        <div className="ar-container">
          <div className="ar-finance-wrapper">
            <div className="finance-content">
              <h2>Minh Bạch Quỹ Khởi Nghiệp Xanh</h2>
              <p>Mỗi 1% lợi nhuận từ đơn hàng của bạn được chúng tôi phân bổ một cách minh bạch và trực tiếp cho các dự án cộng đồng.</p>
              
              <ul className="finance-legend">
                <li><span className="dot" style={{background: '#10b981'}}></span> <strong>50%</strong> - Tài trợ vốn HTX Không Lãi Suất</li>
                <li><span className="dot" style={{background: '#3b82f6'}}></span> <strong>30%</strong> - Đào tạo Kỹ thuật & Công nghệ</li>
                <li><span className="dot" style={{background: '#f59e0b'}}></span> <strong>20%</strong> - Phúc lợi Xã hội Địa phương</li>
              </ul>

              <button className="btn-download-pdf">Tải Báo Cáo Tài Chính (PDF)</button>
            </div>
            
            <div className="finance-chart">
              {/* CSS Pie Chart Mockup */}
              <div className="pie-chart-mockup">
                <div className="pie-center">
                  <span>Tổng Quỹ</span>
                  <strong>5.2 Tỷ</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tầm Nhìn Roadmap */}
      <section className="ar-section">
        <div className="ar-container">
          <div className="ar-section-header">
            <h2>Tầm Nhìn 2030</h2>
            <p>Hành trình tiến tới Nông nghiệp Net-Zero.</p>
          </div>

          <div className="ar-roadmap">
            <div className="roadmap-line"></div>
            
            <div className="roadmap-item">
              <div className="rm-dot"></div>
              <div className="rm-content">
                <div className="rm-year">2027</div>
                <h4>Zero-Waste</h4>
                <p>100% rác thải nông nghiệp được tuần hoàn thành phân sinh học.</p>
              </div>
            </div>
            
            <div className="roadmap-item">
              <div className="rm-dot"></div>
              <div className="rm-content">
                <div className="rm-year">2028</div>
                <h4>Global Standard</h4>
                <p>100% đối tác nông trại đạt chuẩn VietGAP hoặc GlobalGAP.</p>
              </div>
            </div>
            
            <div className="roadmap-item">
              <div className="rm-dot"></div>
              <div className="rm-content">
                <div className="rm-year">2030</div>
                <h4>Net-Zero Carbon</h4>
                <p>Triệt tiêu hoàn toàn dấu chân Carbon trên toàn chuỗi cung ứng.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="ar-cta-section">
        <div className="ar-cta-content">
          <Heart size={48} color="#10b981" className="mb-20" />
          <h2>Bạn đã sẵn sàng đồng hành cùng chúng tôi?</h2>
          <p>Mỗi lựa chọn mua sắm của bạn hôm nay là một hạt giống cho tương lai xanh ngày mai.</p>
          <Link to="/" className="btn-buy-green">
            Mua Sắm & Ủng Hộ Ngay <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AnnualReport;
