import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeModal.css';

const QRCodeModal = ({ amount, onSuccess, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) {
      onCancel();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onCancel]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="qr-modal-overlay">
      <div className="qr-modal-content">
        <h2>Thanh Toán Bằng Mã QR</h2>
        <p className="qr-amount">Số tiền: <span>{amount.toLocaleString('vi-VN')}đ</span></p>
        
        <div className="qr-code-wrapper" onClick={onSuccess} title="Nhấn vào mã QR để giả lập thanh toán thành công!">
          <div className="qr-image" style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
            <QRCodeSVG value="Thanh toán đơn hàng này!!" size={200} />
          </div>
          <div className="qr-instruction">
            <p>Mở ứng dụng Ngân hàng/Ví điện tử để quét mã.</p>
            <p className="qr-hint">(Mẹo Test: Nhấp trực tiếp vào mã QR để mô phỏng "Đã thanh toán")</p>
          </div>
        </div>

        <div className="qr-timer">
          Mã QR sẽ hết hạn trong: <strong>{minutes}:{seconds}</strong>
        </div>

        <button className="btn-cancel-qr" onClick={onCancel}>Hủy thanh toán</button>
      </div>
    </div>
  );
};

export default QRCodeModal;
