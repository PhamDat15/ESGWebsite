import React, { useState } from 'react';
import { Ticket } from 'lucide-react';
import '../pages/Vouchers.css'; // Reuse CSS from Vouchers

const ProfileVouchers = () => {
  const [savedVouchers] = useState(() => {
    return JSON.parse(localStorage.getItem('savedVouchers') || '[]');
  });

  return (
    <div>
      <h2 style={{ fontSize: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--color-text-main)' }}>
        Kho Voucher Của Tôi
      </h2>
      
      {savedVouchers.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '50px 0', color: 'var(--color-text-muted)' }}>
          <Ticket size={64} style={{ marginBottom: '16px', opacity: 0.3 }} />
          <p>Bạn chưa lưu mã giảm giá nào. Hãy quay lại trang Vouchers để săn mã nhé!</p>
        </div>
      ) : (
        <div className="vc-grid">
          {savedVouchers.map(voucher => (
            <div key={voucher.id} className={`vc-card ${voucher.type}`}>
              <div className="vc-left">
                <span className="vc-discount">{voucher.discount}</span>
                <span className="vc-type">{voucher.typeLabel}</span>
              </div>
              <div className="vc-right">
                <div className="vc-details">
                  <h4>{voucher.title}</h4>
                  <p>{voucher.desc}</p>
                  {voucher.exp && <span className="vc-exp">HSD: {voucher.exp}</span>}
                </div>
                <button className="vc-btn saved" disabled>Đã lưu</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileVouchers;
