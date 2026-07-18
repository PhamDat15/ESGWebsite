import React, { useState, useEffect } from 'react';
import { Tag, Clock, Gift, Crown, Percent, Truck, Zap } from 'lucide-react';
import './FeaturePage.css';
import './Vouchers.css';

export const VOUCHER_DATA = [
  { id: 'flash-1', type: 'flash', title: 'Mã Khung Giờ Vàng', discount: 'GIẢM 50%', typeLabel: 'Nông sản ESG', desc: 'Tối đa 100k cho đơn từ 200k', value: 100000, minOrder: 200000 },
  { id: 'flash-2', type: 'flash', title: 'Mã Chớp Nhoáng', discount: 'GIẢM 50%', typeLabel: 'Thực phẩm khô', desc: 'Tối đa 50k cho đơn từ 100k', value: 50000, minOrder: 100000 },
  { id: 'fs-3', type: 'freeship', title: 'Miễn phí vận chuyển', discount: 'FREESHIP', typeLabel: 'Tất cả đơn', desc: 'Tối đa 30k cho đơn từ 150k', value: 30000, minOrder: 150000, exp: '30/08/2026' },
  { id: 'fs-4', type: 'freeship', title: 'Miễn phí vận chuyển', discount: 'FREESHIP', typeLabel: 'Hàng nặng', desc: 'Tối đa 15k cho mọi đơn hàng', value: 15000, minOrder: 0, exp: '30/08/2026' },
  { id: 'fs-5', type: 'freeship', title: 'Freeship Xtra', discount: 'FREESHIP', typeLabel: 'Toàn quốc', desc: 'Tối đa 50k cho đơn từ 300k', value: 50000, minOrder: 300000, exp: '30/08/2026' },
  { id: 'shop-6', type: 'shop', title: 'Ưu đãi cuối tuần', discount: 'Giảm 20K', typeLabel: 'Trái cây tươi', desc: 'Áp dụng cho đơn từ 100k', value: 20000, minOrder: 100000, exp: '25/08/2026' },
  { id: 'shop-7', type: 'shop', title: 'Bạn mới', discount: 'Giảm 50K', typeLabel: 'Rau xanh', desc: 'Áp dụng cho đơn từ 250k', value: 50000, minOrder: 250000, exp: '30/08/2026' },
  { id: 'shop-8', type: 'shop', title: 'Tri ân khách hàng', discount: 'Giảm 10K', typeLabel: 'Tất cả SP', desc: 'Áp dụng cho đơn từ 50k', value: 10000, minOrder: 50000, exp: '15/09/2026' },
  { id: 'shop-9', type: 'shop', title: 'Đại tiệc Nông Sản', discount: 'Giảm 30K', typeLabel: 'Gạo & Ngũ cốc', desc: 'Áp dụng cho đơn từ 200k', value: 30000, minOrder: 200000, exp: '25/08/2026' },
];

const Vouchers = () => {
  const [savedVouchers, setSavedVouchers] = useState(() => {
    return JSON.parse(localStorage.getItem('savedVouchers') || '[]');
  });
  const [timeLeft, setTimeLeft] = useState(3600 * 2); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  useEffect(() => {
    localStorage.setItem('savedVouchers', JSON.stringify(savedVouchers));
  }, [savedVouchers]);

  const handleSave = (voucher) => {
    if (!savedVouchers.find(v => v.id === voucher.id)) {
      setSavedVouchers(prev => [...prev, voucher]);
    }
  };

  const isSaved = (id) => savedVouchers.some(v => v.id === id);

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="feature-page vouchers-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>Mã Giảm Giá & Ưu Đãi</h1>
          <p>Kho voucher độc quyền. Tích điểm đổi quà, thả ga mua sắm nông sản sạch.</p>
        </div>
      </div>

      <div className="vc-container">
        {/* Membership Section */}
        <section className="vc-section vc-membership">
          <div className="member-header">
            <div className="member-info">
              <div className="member-avatar">
                <Crown size={32} color="#fbbf24" />
              </div>
              <div>
                <h2>Hạng Bạc (Silver)</h2>
                <p>Khách hàng thân thiết</p>
              </div>
            </div>
            <div className="member-points">
              <span>3,250</span> Điểm Eco
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-bar-wrap">
              <div className="progress-bar" style={{width: '65%'}}></div>
            </div>
            <p className="progress-text">Còn <strong>750 điểm</strong> nữa để thăng hạng <strong>Vàng (Gold)</strong></p>
          </div>
          <div className="member-benefits">
            <div className="benefit"><Gift size={20}/> Tặng mã Freeship 50k vào ngày sinh nhật</div>
            <div className="benefit"><Percent size={20}/> Giảm thêm 2% mọi đơn hàng</div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="vc-section vc-flash-sale">
          <div className="flash-header">
            <h2><Zap size={28} className="icon-flash" /> Flash Sale Voucher</h2>
            <div className="countdown">
              <span>Kết thúc sau:</span>
              <div className="time-box">{h}</div> :
              <div className="time-box">{m}</div> :
              <div className="time-box">{s}</div>
            </div>
          </div>
          <div className="vc-grid">
            {VOUCHER_DATA.filter(v => v.type === 'flash').map(voucher => (
              <div key={voucher.id} className="vc-card flash">
                <div className="vc-left">
                  <span className="vc-discount">{voucher.discount}</span>
                  <span className="vc-type">{voucher.typeLabel}</span>
                </div>
                <div className="vc-right">
                  <div className="vc-details">
                    <h4>{voucher.title}</h4>
                    <p>{voucher.desc}</p>
                  </div>
                  <button 
                    className={`vc-btn ${isSaved(voucher.id) ? 'saved' : ''}`}
                    onClick={() => handleSave(voucher)}
                    disabled={isSaved(voucher.id)}
                  >
                    {isSaved(voucher.id) ? 'Đã lưu' : 'Lưu mã'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Freeship Section */}
        <section className="vc-section">
          <h2><Truck size={28} className="section-icon" color="#10b981" /> Mã Miễn Phí Vận Chuyển</h2>
          <div className="vc-grid">
            {VOUCHER_DATA.filter(v => v.type === 'freeship').map(voucher => (
              <div key={voucher.id} className="vc-card freeship">
                <div className="vc-left">
                  <span className="vc-discount">{voucher.discount}</span>
                  <span className="vc-type">{voucher.typeLabel}</span>
                </div>
                <div className="vc-right">
                  <div className="vc-details">
                    <h4>{voucher.title}</h4>
                    <p>{voucher.desc}</p>
                    <span className="vc-exp">HSD: {voucher.exp}</span>
                  </div>
                  <button 
                    className={`vc-btn ${isSaved(voucher.id) ? 'saved' : ''}`}
                    onClick={() => handleSave(voucher)}
                    disabled={isSaved(voucher.id)}
                  >
                    {isSaved(voucher.id) ? 'Đã lưu' : 'Lưu mã'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Normal Vouchers Section */}
        <section className="vc-section">
          <h2><Tag size={28} className="section-icon" color="#3b82f6" /> Voucher Xịn Từ Shop</h2>
          <div className="vc-grid">
            {VOUCHER_DATA.filter(v => v.type === 'shop').map(voucher => (
              <div key={voucher.id} className="vc-card shop">
                <div className="vc-left">
                  <span className="vc-discount">{voucher.discount}</span>
                  <span className="vc-type">{voucher.typeLabel}</span>
                </div>
                <div className="vc-right">
                  <div className="vc-details">
                    <h4>{voucher.title}</h4>
                    <p>{voucher.desc}</p>
                    <span className="vc-exp">HSD: {voucher.exp}</span>
                  </div>
                  <button 
                    className={`vc-btn ${isSaved(voucher.id) ? 'saved' : ''}`}
                    onClick={() => handleSave(voucher)}
                    disabled={isSaved(voucher.id)}
                  >
                    {isSaved(voucher.id) ? 'Đã lưu' : 'Lưu mã'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Vouchers;
