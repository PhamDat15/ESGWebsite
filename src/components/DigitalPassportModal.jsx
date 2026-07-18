import React from 'react';
import { X, PlayCircle, Leaf, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import './DigitalPassportModal.css';

const DigitalPassportModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'log':
        return (
          <div className="dp-log-content">
            <h3 className="dp-modal-title"><Leaf className="dp-title-icon" color="#16a34a" /> Nhật ký canh tác (Cultivation Log)</h3>
            <div className="dp-timeline">
              <div className="dp-timeline-item">
                <div className="dp-timeline-icon"><Calendar size={16} /></div>
                <div className="dp-timeline-content">
                  <h4>Ngày 1: Gieo hạt giống / Xuống giống</h4>
                  <p className="dp-date">10/01/2026</p>
                  <p className="dp-desc">Lựa chọn hạt giống khỏe mạnh, xử lý vi sinh trước khi gieo trồng trên đất đã ủ mùn hữu cơ.</p>
                </div>
              </div>
              <div className="dp-timeline-item">
                <div className="dp-timeline-icon"><Calendar size={16} /></div>
                <div className="dp-timeline-content">
                  <h4>Ngày 20: Bón phân hữu cơ đợt 1</h4>
                  <p className="dp-date">30/01/2026</p>
                  <p className="dp-desc">Sử dụng phân chuồng ủ hoai mục và phân trùn quế nguyên chất, không sử dụng hóa chất vô cơ.</p>
                </div>
              </div>
              <div className="dp-timeline-item">
                <div className="dp-timeline-icon"><Calendar size={16} /></div>
                <div className="dp-timeline-content">
                  <h4>Ngày 45: Phun chế phẩm sinh học phòng sâu bệnh</h4>
                  <p className="dp-date">24/02/2026</p>
                  <p className="dp-desc">Sử dụng chiết xuất tỏi ớt gừng và tinh dầu neem để kiểm soát rệp, thân thiện hoàn toàn với thiên nhiên.</p>
                </div>
              </div>
              <div className="dp-timeline-item dp-current">
                <div className="dp-timeline-icon"><Calendar size={16} /></div>
                <div className="dp-timeline-content">
                  <h4>Ngày 75: Bắt đầu thu hoạch</h4>
                  <p className="dp-date">Hôm qua</p>
                  <p className="dp-desc">Thu hoạch thủ công vào sáng sớm để đảm bảo giữ được độ tươi mọng nhất của nông sản.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="dp-video-content">
            <h3 className="dp-modal-title"><PlayCircle className="dp-title-icon" color="#3b82f6" /> Video Thu Hoạch Thực Tế</h3>
            <div className="dp-video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <p className="dp-video-desc">Đoạn phim trực tiếp quay tại nông trại trong đợt thu hoạch gần nhất, thể hiện quy trình đóng gói tiêu chuẩn cao.</p>
          </div>
        );
      case 'certificate':
        return (
          <div className="dp-cert-content">
            <h3 className="dp-modal-title"><ShieldCheck className="dp-title-icon" color="#eab308" /> Chứng chỉ Tiêu chuẩn</h3>
            <div className="dp-cert-card">
              <div className="dp-cert-image">
                <img src="/images/green_farm.png" alt="Chứng chỉ VietGAP mẫu" />
                <div className="dp-cert-badge">VietGAP</div>
              </div>
              <div className="dp-cert-details">
                <h4>Giấy chứng nhận Thực hành Nông nghiệp Tốt (VietGAP)</h4>
                <ul>
                  <li><strong>Mã số cấp:</strong> VG-2026-9912</li>
                  <li><strong>Cơ quan cấp:</strong> Cục Trồng trọt - Bộ NN&PTNT</li>
                  <li><strong>Ngày cấp:</strong> 15/03/2026</li>
                  <li><strong>Hiệu lực đến:</strong> 15/03/2028</li>
                  <li><strong>Kết quả đánh giá:</strong> Đạt 100% tiêu chí ATTP</li>
                </ul>
                <button className="dp-verify-btn">
                  Xác minh trên hệ thống quốc gia <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dp-modal-overlay" onClick={onClose}>
      <div className="dp-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="dp-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default DigitalPassportModal;
