import React, { useState } from 'react';
import { Package, Truck, CheckCircle, MapPin, ArrowLeft, ScanLine } from 'lucide-react';
import AIFreshCheckModal from '../components/AIFreshCheckModal';
import './ProfileOrders.css';

const ProfileOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // Dữ liệu đơn hàng mô phỏng
  const mockOrders = [
    {
      id: "ESG-8392194",
      date: "16/07/2026 18:45",
      total: "240.000đ",
      statusText: "Đang giao hàng",
      statusClass: "shipping",
      items: [
        { id: 1, name: "Dâu Tây - Nông Sản Sơn La Sạch 100%", quantity: 1, price: "190.000đ", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400" }
      ],
      timeline: [
        { id: 1, time: "18:45 - 16/07", title: "Đặt hàng thành công", desc: "Đơn hàng đã được thanh toán trực tuyến", icon: <CheckCircle size={22} />, done: true },
        { id: 2, time: "19:30 - 16/07", title: "Người bán đang chuẩn bị hàng", desc: "Nông sản đang được kiểm định và đóng gói", icon: <Package size={22} />, done: true },
        { id: 3, time: "20:15 - 16/07", title: "Đã giao cho đơn vị vận chuyển", desc: "ESG Express đã nhận hàng tại trạm thu mua", icon: <Truck size={22} />, done: true },
        { id: 4, time: "Đang cập nhật...", title: "Đang giao hàng (Hoả tốc)", desc: "Tài xế Nguyễn Văn A (0901***888) đang di chuyển đến địa chỉ của bạn", icon: <MapPin size={22} />, active: true }
      ]
    },
    {
      id: "ESG-7312190",
      date: "10/07/2026 09:12",
      total: "520.000đ",
      statusText: "Đã giao thành công",
      statusClass: "success",
      items: [
        { id: 2, name: "Cà Rốt Sạch Chuẩn VietGAP", quantity: 2, price: "210.000đ", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Rau Hữu Cơ Tổng Hợp", quantity: 1, price: "100.000đ", image: "https://images.unsplash.com/photo-1574323347407-e5e5d40def50?auto=format&fit=crop&q=80&w=400" }
      ],
      timeline: [
        { id: 1, time: "09:12 - 10/07", title: "Đặt hàng thành công", desc: "Đơn hàng đã được xác nhận", icon: <CheckCircle size={22} />, done: true },
        { id: 2, time: "10:30 - 10/07", title: "Người bán đang chuẩn bị hàng", desc: "Nông sản đang được kiểm định và đóng gói", icon: <Package size={22} />, done: true },
        { id: 3, time: "14:15 - 10/07", title: "Đã giao cho đơn vị vận chuyển", desc: "ESG Express đã nhận hàng tại trạm thu mua", icon: <Truck size={22} />, done: true },
        { id: 4, time: "16:20 - 10/07", title: "Đã giao thành công", desc: "Đơn hàng đã được giao đến bạn", icon: <CheckCircle size={22} />, done: true, active: true }
      ]
    }
  ];

  if (selectedOrder) {
    return (
      <div className="profile-orders-page">
        <div className="orders-page-header">
          <button className="btn-back-orders" onClick={() => setSelectedOrder(null)}>
            <ArrowLeft size={18} /> Quay lại
          </button>
          <h2 className="orders-page-title no-border">Chi tiết đơn hàng</h2>
        </div>

        <div className="order-card">
          <div className="order-header">
            <div className="order-meta">
              <span className="order-id">Mã đơn: <strong>{selectedOrder.id}</strong></span>
              <span className="order-date">Ngày đặt: {selectedOrder.date}</span>
            </div>
            <div className={`order-status-badge ${selectedOrder.statusClass}`}>
              {selectedOrder.statusText.toUpperCase()}
            </div>
          </div>

          <div className="order-timeline-container">
            <h3>Quy trình vận chuyển</h3>
            <div className="order-timeline">
              {selectedOrder.timeline.map((step, index) => (
                <div className={`timeline-step ${step.active ? 'active' : ''} ${step.done ? 'done' : ''}`} key={step.id}>
                  <div className="timeline-icon-wrapper">
                    {step.icon}
                    {index !== selectedOrder.timeline.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">{step.title}</div>
                    <div className="timeline-desc">{step.desc}</div>
                    <div className="timeline-time">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-items">
            <h3>Sản phẩm</h3>
            {selectedOrder.items.map(item => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <h4>{item.name}</h4>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="order-item-price">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="order-footer">
            <div className="order-total-text">Tổng tiền thanh toán: <span>{selectedOrder.total}</span></div>
            {selectedOrder.statusClass === 'shipping' ? (
              <button className="btn-contact-shipper">Liên hệ Tài xế</button>
            ) : (
              <div style={{display: 'flex', gap: '10px'}}>
                <button className="btn-contact-shipper" onClick={() => setShowAIModal(true)} style={{backgroundColor: '#eef2ff', color: '#4f46e5', borderColor: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <ScanLine size={16}/> Quét AI kiểm tra hàng
                </button>
                <button className="btn-repurchase">Mua lại</button>
              </div>
            )}
          </div>
        </div>

        {showAIModal && <AIFreshCheckModal order={selectedOrder} onClose={() => setShowAIModal(false)} />}
      </div>
    );
  }

  return (
    <div className="profile-orders-page">
      <h2 className="orders-page-title">Đơn mua của tôi</h2>
      
      <div className="orders-list">
        {mockOrders.map(order => (
          <div className="order-list-item" key={order.id}>
            <div className="order-list-header">
              <span className="order-id">Mã đơn: <strong>{order.id}</strong></span>
              <span className={`order-status ${order.statusClass}`}>{order.statusText}</span>
            </div>
            
            <div className="order-list-items">
              {order.items.map((item, idx) => (
                <div className="mini-order-item" key={idx}>
                  <img src={item.image} alt={item.name} />
                  <div className="mini-item-info">
                    <h4>{item.name}</h4>
                    <p>x{item.quantity}</p>
                  </div>
                  <div className="mini-item-price">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="order-list-footer">
              <div className="order-total-compact">Tổng: <span>{order.total}</span></div>
              <button className="btn-view-details" onClick={() => setSelectedOrder(order)}>Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
