import React, { useState, useEffect } from 'react';
import { X, ScanLine, CheckCircle, ShieldAlert } from 'lucide-react';
import './AIFreshCheckModal.css';

const AIFreshCheckModal = ({ order, onClose }) => {
  const [scanStatus, setScanStatus] = useState('scanning'); // scanning, success

  useEffect(() => {
    // Giả lập quét AI trong 3 giây
    const timer = setTimeout(() => {
      setScanStatus('success');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content ai-modal">
        <button className="btn-close" onClick={onClose}><X size={20}/></button>
        <h2 className="ai-modal-title"><ScanLine size={24} color="#3b82f6" /> AI Fresh Check</h2>
        
        <div className="ai-scan-area">
          <img src={order.items[0].image} alt="Sản phẩm" className="ai-scan-img" />
          {scanStatus === 'scanning' && <div className="laser-beam"></div>}
        </div>

        <div className="ai-status">
          {scanStatus === 'scanning' ? (
            <p className="scanning-text">Đang phân tích hình ảnh và đối chiếu dữ liệu...</p>
          ) : (
            <div className="ai-result-box">
              <div className="result-header">
                <CheckCircle color="#10b981" size={20} />
                <span>Hoàn tất kiểm định</span>
              </div>
              <ul className="result-details">
                <li><strong>Mức độ khớp ảnh:</strong> 99% (So với ảnh nhà vườn gửi)</li>
                <li><strong>Kích thước & Hình dáng:</strong> Đạt chuẩn loại 1</li>
                <li><strong>Dấu hiệu hư hỏng:</strong> Không phát hiện dập nát</li>
                <li><strong>Độ tươi hiện tại:</strong> 92% (Rất tốt)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFreshCheckModal;
