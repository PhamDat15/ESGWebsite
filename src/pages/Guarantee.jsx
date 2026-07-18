import React, { useState } from 'react';
import { ShieldCheck, RefreshCcw, ThumbsUp, Camera, CheckCircle, AlertTriangle, MessageSquareWarning, ArrowRight } from 'lucide-react';
import './FeaturePage.css';
import './Guarantee.css';

const Guarantee = () => {
  const [reportForm, setReportForm] = useState({ orderId: '', reason: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportForm.orderId && reportForm.reason) {
      setIsSubmitted(true);
      // Simulate API call
      setTimeout(() => {
        setReportForm({ orderId: '', reason: '', details: '' });
      }, 3000);
    }
  };

  return (
    <div className="feature-page guarantee-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>Bảo Đảm 100%</h1>
          <p>Cam kết chất lượng tuyệt đối. Hoàn tiền 100% không cần lý do phức tạp nếu sản phẩm không đạt chuẩn.</p>
        </div>
      </div>

      <div className="gua-container">
        {/* Core Policies */}
        <section className="gua-section">
          <div className="gua-policies-grid">
            <div className="gua-policy-card">
              <div className="gua-icon-wrap"><RefreshCcw size={40} /></div>
              <h3>Hoàn Tiền 100%</h3>
              <p>Trường hợp nông sản bị dập nát, hỏng hóc trong quá trình vận chuyển, chúng tôi hoàn tiền 100% giá trị sản phẩm ngay lập tức.</p>
            </div>
            <div className="gua-policy-card">
              <div className="gua-icon-wrap"><ThumbsUp size={40} /></div>
              <h3>Đổi Trả Dễ Dàng</h3>
              <p>Chỉ cần chụp ảnh sản phẩm lỗi gửi lên hệ thống, bạn không cần gửi trả lại hàng. Tiết kiệm tối đa thời gian của bạn.</p>
            </div>
            <div className="gua-policy-card">
              <div className="gua-icon-wrap"><ShieldCheck size={40} /></div>
              <h3>Chất Lượng Kép</h3>
              <p>Mỗi sản phẩm đều trải qua 2 vòng kiểm định: Tại nông trại và trước khi đóng gói giao đến tay khách hàng.</p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="gua-section gua-process">
          <h2 className="gua-section-title">Quy Trình Xử Lý Khiếu Nại Siêu Tốc</h2>
          <div className="gua-steps">
            <div className="gua-step">
              <div className="gua-step-number">1</div>
              <h4>Báo Cáo</h4>
              <p>Gửi thông tin và ảnh chụp</p>
            </div>
            <ArrowRight className="gua-step-arrow" size={24} />
            <div className="gua-step">
              <div className="gua-step-number">2</div>
              <h4>Xác Nhận</h4>
              <p>CSKH phản hồi trong 30 phút</p>
            </div>
            <ArrowRight className="gua-step-arrow" size={24} />
            <div className="gua-step">
              <div className="gua-step-number">3</div>
              <h4>Hoàn Tiền</h4>
              <p>Nhận tiền ngay vào tài khoản</p>
            </div>
          </div>
        </section>

        {/* Report Form */}
        <section className="gua-section bg-light">
          <div className="gua-report-wrapper">
            <div className="gua-report-info">
              <h2><MessageSquareWarning size={32} /> Phản Ánh Chất Lượng</h2>
              <p>Sản phẩm bạn nhận được không như ý? Đừng lo, hãy điền thông tin vào form bên cạnh để chúng tôi hỗ trợ bạn ngay lập tức.</p>
              <div className="gua-alert">
                <AlertTriangle size={24} />
                <span>Lưu ý: Thời gian tiếp nhận khiếu nại là <strong>48 giờ</strong> kể từ lúc nhận hàng.</span>
              </div>
            </div>

            <div className="gua-form-container">
              {isSubmitted ? (
                <div className="gua-success-msg">
                  <CheckCircle size={60} color="#10b981" />
                  <h3>Gửi Yêu Cầu Thành Công!</h3>
                  <p>Mã khiếu nại của bạn đã được ghi nhận. Đội ngũ CSKH sẽ liên hệ với bạn trong vòng 30 phút tới.</p>
                  <button className="gua-btn-outline" onClick={() => setIsSubmitted(false)}>Gửi khiếu nại khác</button>
                </div>
              ) : (
                <form className="gua-report-form" onSubmit={handleSubmit}>
                  <div className="gua-form-group">
                    <label>Mã đơn hàng *</label>
                    <input 
                      type="text" 
                      placeholder="VD: ORD12345" 
                      value={reportForm.orderId}
                      onChange={(e) => setReportForm({...reportForm, orderId: e.target.value})}
                      required
                    />
                  </div>
                  <div className="gua-form-group">
                    <label>Lý do khiếu nại *</label>
                    <select 
                      value={reportForm.reason}
                      onChange={(e) => setReportForm({...reportForm, reason: e.target.value})}
                      required
                    >
                      <option value="">-- Chọn lý do --</option>
                      <option value="dap-nat">Sản phẩm bị dập, nát</option>
                      <option value="hu-hong">Sản phẩm bị hỏng, thối</option>
                      <option value="sai-hang">Giao sai sản phẩm</option>
                      <option value="thieu-hang">Giao thiếu sản phẩm</option>
                      <option value="khac">Lý do khác</option>
                    </select>
                  </div>
                  <div className="gua-form-group">
                    <label>Chi tiết thêm (Tùy chọn)</label>
                    <textarea 
                      placeholder="Mô tả cụ thể tình trạng sản phẩm..."
                      rows="3"
                      value={reportForm.details}
                      onChange={(e) => setReportForm({...reportForm, details: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="gua-upload-zone">
                    <Camera size={32} />
                    <span>Nhấn để tải lên ảnh sản phẩm lỗi</span>
                    <small>Hỗ trợ JPG, PNG (Tối đa 5MB)</small>
                  </div>
                  <button type="submit" className="gua-btn-submit">Gửi Phản Ánh</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guarantee;
