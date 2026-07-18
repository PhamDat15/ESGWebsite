import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <CheckCircle size={80} color="var(--color-primary)" className="success-icon" />
        <h1>Đặt Hàng Thành Công!</h1>
        <p>Cảm ơn bạn đã tin tưởng và đồng hành cùng hệ sinh thái nông sản xanh ESG.</p>
        <p className="success-subtext">Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.</p>
        
        <div className="success-actions">
          <button className="btn-view-order" onClick={() => navigate('/profile/orders')}>Xem đơn hàng</button>
          <button className="btn-continue-shopping" onClick={() => navigate('/shop')}>Tiếp tục mua sắm</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
