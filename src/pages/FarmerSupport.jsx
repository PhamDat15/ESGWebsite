import React, { useState } from 'react';
import { HeartHandshake, GraduationCap, Sprout, HandCoins, Calendar, CheckCircle2 } from 'lucide-react';
import './FeaturePage.css';
import './FarmerSupport.css';

const FarmerSupport = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', location: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', location: '' });
      }, 3000);
    }
  };

  return (
    <div className="feature-page farmer-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>Hỗ Trợ Nhà Nông</h1>
          <p>Sát cánh cùng nông dân Việt Nam chuyển đổi số và canh tác bền vững. Vì một tương lai nông nghiệp thịnh vượng.</p>
        </div>
      </div>

      <div className="far-container">
        {/* Fund Impact */}
        <section className="far-section">
          <div className="far-impact-wrapper">
            <div className="far-impact-text">
              <h2>Quỹ Khởi Nghiệp Xanh</h2>
              <p>Trích 1% lợi nhuận từ mỗi đơn hàng của bạn để hỗ trợ vốn không lãi suất cho các hợp tác xã chuyển đổi sang mô hình canh tác hữu cơ.</p>
              <div className="fund-stats">
                <div className="f-stat">
                  <strong>2.5 Tỷ</strong>
                  <span>Đã giải ngân</span>
                </div>
                <div className="f-stat">
                  <strong>45</strong>
                  <span>Hợp tác xã</span>
                </div>
                <div className="f-stat">
                  <strong>120+</strong>
                  <span>Héc-ta hữu cơ</span>
                </div>
              </div>
            </div>
            <div className="far-impact-visual">
              <div className="fund-progress-card">
                <div className="f-icon"><HandCoins size={40} color="#10b981" /></div>
                <h3>Mục tiêu 2026</h3>
                <div className="f-progress-bar">
                  <div className="f-progress-fill" style={{width: '65%'}}></div>
                </div>
                <div className="f-progress-labels">
                  <span>Hiện tại: 2.5 Tỷ</span>
                  <span>Mục tiêu: 5 Tỷ VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Courses */}
        <section className="far-section bg-light">
          <h2 className="far-section-title">Khóa Đào Tạo Kỹ Thuật Miễn Phí</h2>
          <p className="far-section-subtitle">Chương trình tập huấn nông nghiệp do các chuyên gia đầu ngành giảng dạy.</p>
          
          <div className="far-course-grid">
            <div className="far-course-card">
              <div className="course-img" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1592982537447-6f23f05b0c80?auto=format&fit=crop&q=80&w=600")'}}></div>
              <div className="course-content">
                <span className="course-tag">Trồng trọt</span>
                <h3>Kỹ thuật làm phân ủ sinh học (Compost)</h3>
                <p>Hướng dẫn chi tiết cách ủ phân hữu cơ từ rác thải nông nghiệp ngay tại vườn.</p>
                <div className="course-meta">
                  <span><Calendar size={16} /> 15/08/2026</span>
                  <span><GraduationCap size={16} /> KS. Nguyễn Văn B</span>
                </div>
              </div>
            </div>

            <div className="far-course-card">
              <div className="course-img" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?auto=format&fit=crop&q=80&w=600")'}}></div>
              <div className="course-content">
                <span className="course-tag">Công nghệ</span>
                <h3>Ứng dụng IoT trong tưới tiêu tự động</h3>
                <p>Sử dụng cảm biến độ ẩm để điều khiển hệ thống tưới qua điện thoại thông minh.</p>
                <div className="course-meta">
                  <span><Calendar size={16} /> 22/08/2026</span>
                  <span><GraduationCap size={16} /> ThS. Trần Thị C</span>
                </div>
              </div>
            </div>

            <div className="far-course-card">
              <div className="course-img" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&q=80&w=600")'}}></div>
              <div className="course-content">
                <span className="course-tag">Chứng nhận</span>
                <h3>Quy trình đăng ký VietGAP 2026</h3>
                <p>Hỗ trợ thủ tục pháp lý và chuẩn bị hồ sơ đánh giá chứng nhận VietGAP mới nhất.</p>
                <div className="course-meta">
                  <span><Calendar size={16} /> 05/09/2026</span>
                  <span><GraduationCap size={16} /> Cục QLCL Nông Lâm Thủy Sản</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Network CTA */}
        <section className="far-section">
          <div className="far-join-box">
            <div className="join-left">
              <h2><HeartHandshake size={32} /> Tham Gia Mạng Lưới Nhà Nông</h2>
              <p>Bạn là nông dân? Bạn muốn chuyển đổi sang canh tác sạch nhưng thiếu vốn và kỹ thuật? Hãy để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ khảo sát hỗ trợ bạn hoàn toàn miễn phí.</p>
            </div>
            <div className="join-right">
              {isSubmitted ? (
                <div className="join-success">
                  <CheckCircle2 size={48} color="#10b981" />
                  <h4>Đăng ký thành công!</h4>
                  <p>Chúng tôi sẽ gọi lại cho bạn trong 24h tới.</p>
                  <button onClick={() => setIsSubmitted(false)}>Đăng ký người khác</button>
                </div>
              ) : (
                <form className="join-form" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    placeholder="Họ và tên chủ vườn *" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại liên hệ *" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                  <input 
                    type="text" 
                    placeholder="Địa chỉ / Tỉnh thành" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                  <button type="submit">Gửi Yêu Cầu Hỗ Trợ</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FarmerSupport;
