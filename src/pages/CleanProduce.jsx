import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Sprout, Leaf, Droplet, MapPin, CalendarDays, Award } from 'lucide-react';
import './FeaturePage.css';
import './CleanProduce.css';

const CleanProduce = () => {
  const [traceCode, setTraceCode] = useState('');
  const [traceResult, setTraceResult] = useState(null);

  const handleTrace = (e) => {
    e.preventDefault();
    if (!traceCode.trim()) return;
    
    // Simulate loading/result
    setTraceResult({
      code: traceCode,
      farm: 'Hợp Tác Xã Nông Vàng (Hòa Bình)',
      seedDate: '15/03/2026',
      harvestDate: '20/06/2026',
      quality: 'VietGAP & GlobalGAP',
      status: 'An toàn tuyệt đối - Không dư lượng thuốc'
    });
  };

  return (
    <div className="feature-page clean-produce-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>Nông Sản Sạch</h1>
          <p>Cam kết 100% hữu cơ, truy xuất nguồn gốc minh bạch từ trang trại đến bàn ăn.</p>
        </div>
      </div>

      <div className="cp-container">
        {/* Tiêu chuẩn */}
        <section className="cp-section">
          <h2 className="cp-section-title">Tiêu Chuẩn Nông Nghiệp Khắt Khe</h2>
          <div className="cp-standards-grid">
            <div className="cp-standard-card">
              <div className="cp-icon"><Sprout size={32} /></div>
              <h3>100% Hữu Cơ</h3>
              <p>Không sử dụng phân bón hóa học, thuốc diệt cỏ. Nuôi dưỡng đất canh tác bằng phương pháp sinh học tự nhiên.</p>
            </div>
            <div className="cp-standard-card">
              <div className="cp-icon"><Droplet size={32} /></div>
              <h3>Nguồn Nước Sạch</h3>
              <p>Hệ thống tưới tiêu khép kín sử dụng 100% nguồn nước ngầm đã qua kiểm định đạt chuẩn quốc gia.</p>
            </div>
            <div className="cp-standard-card">
              <div className="cp-icon"><Leaf size={32} /></div>
              <h3>Bao Bì Xanh</h3>
              <p>Sản phẩm được đóng gói bằng vật liệu tự phân hủy sinh học, góp phần bảo vệ môi trường và giảm rác thải nhựa.</p>
            </div>
          </div>
        </section>

        {/* Truy xuất nguồn gốc */}
        <section className="cp-section bg-light">
          <h2 className="cp-section-title">Hệ Thống Truy Xuất Nguồn Gốc</h2>
          <p className="cp-section-subtitle">Minh bạch thông tin là lời cam kết mạnh mẽ nhất của chúng tôi.</p>
          
          <div className="cp-trace-container">
            <form className="cp-trace-form" onSubmit={handleTrace}>
              <div className="cp-input-wrap">
                <input 
                  type="text" 
                  placeholder="Nhập mã lô hàng (VD: VN-GAP-001)" 
                  value={traceCode}
                  onChange={(e) => setTraceCode(e.target.value)}
                />
                <button type="submit" className="cp-btn"><Search size={20} /> Kiểm tra</button>
              </div>
            </form>

            {traceResult && (
              <div className="cp-trace-result">
                <h3>Kết Quả Tra Cứu: Lô hàng #{traceResult.code}</h3>
                <div className="cp-timeline">
                  <div className="cp-timeline-item">
                    <div className="cp-t-icon"><MapPin size={20} /></div>
                    <div className="cp-t-content">
                      <h4>Nông Trại</h4>
                      <p>{traceResult.farm}</p>
                    </div>
                  </div>
                  <div className="cp-timeline-item">
                    <div className="cp-t-icon"><CalendarDays size={20} /></div>
                    <div className="cp-t-content">
                      <h4>Gieo Hạt & Thu Hoạch</h4>
                      <p>{traceResult.seedDate} - {traceResult.harvestDate}</p>
                    </div>
                  </div>
                  <div className="cp-timeline-item">
                    <div className="cp-t-icon"><Award size={20} /></div>
                    <div className="cp-t-content">
                      <h4>Chứng Nhận Chất Lượng</h4>
                      <p>{traceResult.quality}</p>
                    </div>
                  </div>
                  <div className="cp-timeline-item success">
                    <div className="cp-t-icon"><CheckCircle2 size={20} /></div>
                    <div className="cp-t-content">
                      <h4>Trạng Thái Hiện Tại</h4>
                      <p className="cp-status">{traceResult.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Chứng chỉ */}
        <section className="cp-section">
          <h2 className="cp-section-title">Chứng Nhận Tiêu Biểu</h2>
          <div className="cp-certs-grid">
            <div className="cp-cert-card">
              <ShieldCheck size={48} className="cert-icon" />
              <h3>VietGAP</h3>
              <p>Thực hành Nông nghiệp Tốt tại Việt Nam</p>
            </div>
            <div className="cp-cert-card">
              <ShieldCheck size={48} className="cert-icon" />
              <h3>GlobalGAP</h3>
              <p>Chứng chỉ Nông nghiệp An toàn Toàn cầu</p>
            </div>
            <div className="cp-cert-card">
              <ShieldCheck size={48} className="cert-icon" />
              <h3>VN-BIO</h3>
              <p>Chứng chỉ Nông nghiệp Hữu cơ Quốc gia</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CleanProduce;
