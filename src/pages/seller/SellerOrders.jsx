import React, { useState, useContext } from 'react';
import { Search, Eye, Filter, CheckCircle2, Truck, Package, XCircle, MapPin, Clock, AlertTriangle, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { mockProducts } from '../../data/mockProducts';
import './SellerOrders.css';

const getStatusBadge = (status) => {
  switch (status) {
    case 'pending': return <span className="so-badge warning">Chờ xác nhận</span>;
    case 'processing': return <span className="so-badge info">Đang xử lý</span>;
    case 'shipping': return <span className="so-badge primary">Đang giao</span>;
    case 'delivered': return <span className="so-badge success">Hoàn thành</span>;
    case 'cancelled': return <span className="so-badge danger">Đã hủy</span>;
    case 'issue': return <span className="so-badge issue">Có vấn đề</span>;
    default: return null;
  }
};

const SellerOrders = () => {
  const { currentUser } = useContext(AuthContext);
  
  // Đồng bộ với kho sản phẩm hiện tại của Shop
  const shopId = currentUser?.shopId || 1;
  const startIndex = (shopId * 12) % mockProducts.length;
  const shopProducts = mockProducts.slice(startIndex, startIndex + 12);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\D/g, '')) || 0;
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  const createOrder = (id, customer, date, prodName, priceStr, qty, status, hasIssueDetail = '') => {
    const unitPrice = parsePrice(priceStr);
    const totalVal = unitPrice * qty;
    const costVal = Math.round(totalVal * 0.65); // Giá vốn giả định 65%
    const profitVal = totalVal - costVal;
    return {
      id, customer, date,
      products: [{ name: prodName, qty }],
      total: formatPrice(totalVal),
      cost: formatPrice(costVal),
      profit: formatPrice(profitVal),
      status,
      issueDetail: hasIssueDetail
    };
  };

  // Sinh danh sách đơn hàng dựa trên sản phẩm thật của shop
  const initialOrders = [
    createOrder('ORD-8921', 'Lê Minh Tuấn', '2026-07-18', shopProducts[0]?.name || 'Nông sản 1', shopProducts[0]?.price || '150.000đ', 2, 'pending'),
    createOrder('ORD-8922', 'Nguyễn Hà Trang', '2026-07-18', shopProducts[1]?.name || 'Nông sản 2', shopProducts[1]?.price || '125.000đ', 5, 'processing'),
    createOrder('ORD-8923', 'Trần Phong', '2026-07-17', shopProducts[2]?.name || 'Nông sản 3', shopProducts[2]?.price || '85.000đ', 1, 'issue', 'Khách hàng từ chối nhận hàng do bao bì bị ướt, sản phẩm bên trong có dấu hiệu dập nát.'),
    createOrder('ORD-8924', 'Phạm Ngọc Lan', '2026-07-17', shopProducts[3]?.name || 'Nông sản 4', shopProducts[3]?.price || '450.000đ', 1, 'shipping'),
    createOrder('ORD-8925', 'Đặng Thành Đạt', '2026-07-16', shopProducts[4]?.name || 'Nông sản 5', shopProducts[4]?.price || '210.000đ', 3, 'delivered'),
    createOrder('ORD-8926', 'Vũ Bích Ngọc', '2026-07-15', shopProducts[5]?.name || 'Nông sản 6', shopProducts[5]?.price || '150.000đ', 2, 'cancelled'),
    createOrder('ORD-8927', 'Hoàng Quốc Bảo', '2026-07-15', shopProducts[6]?.name || 'Nông sản 7', shopProducts[6]?.price || '120.000đ', 4, 'issue', 'Shipper giao 3 lần không liên lạc được với khách. Chờ hoàn về kho.'),
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (id, action) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        let newStatus = order.status;
        if (action === 'approve') newStatus = 'processing';
        else if (action === 'ship') newStatus = 'shipping';
        else if (action === 'cancel') newStatus = 'cancelled';
        else if (action === 'resolve') newStatus = 'cancelled'; // Resolve issue usually means refund/cancel or reship. We just set to cancelled for mock.
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  return (
    <div className="seller-orders-page">
      <div className="so-header">
        <h2>Quản lý đơn hàng</h2>
        <div className="so-stats">
          <div className="so-stat-item">
            <span className="so-stat-num">{orders.filter(o => o.status === 'pending').length}</span>
            <span className="so-stat-label">Chờ xác nhận</span>
          </div>
          <div className="so-stat-item">
            <span className="so-stat-num">{orders.filter(o => o.status === 'processing').length}</span>
            <span className="so-stat-label">Đang xử lý</span>
          </div>
          <div className="so-stat-item issue">
            <span className="so-stat-num">{orders.filter(o => o.status === 'issue').length}</span>
            <span className="so-stat-label">Có vấn đề</span>
          </div>
        </div>
      </div>

      <div className="so-toolbar">
        <div className="so-search">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Tìm theo mã đơn hoặc tên KH..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="so-filters">
          <Filter size={18} color="#64748b" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="delivered">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
            <option value="issue">Có vấn đề</option>
          </select>
        </div>
      </div>

      <div className="so-table-wrapper">
        <table className="so-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Doanh thu</th>
              <th>Giá vốn</th>
              <th>Lợi nhuận</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td className="text-muted">{order.date}</td>
                  <td>{order.customer}</td>
                  <td>
                    <div className="so-product-list">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="so-product-item">{p.name} <span className="so-qty">x{p.qty}</span></div>
                      ))}
                    </div>
                  </td>
                  <td><strong>{order.total}</strong></td>
                  <td className="text-muted">{order.cost}</td>
                  <td style={{color: '#10b981', fontWeight: 'bold'}}>{order.profit}</td>
                  <td>
                    {getStatusBadge(order.status)}
                    {order.status === 'issue' && (
                      <div className="so-issue-text">{order.issueDetail}</div>
                    )}
                  </td>
                  <td>
                    <div className="so-actions">
                      {order.status === 'pending' && (
                        <>
                          <button className="so-btn-action success" onClick={() => handleAction(order.id, 'approve')} title="Xác nhận">
                            <CheckCircle2 size={16} /> Xác nhận
                          </button>
                          <button className="so-btn-action danger" onClick={() => handleAction(order.id, 'cancel')} title="Hủy">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      {order.status === 'processing' && (
                        <button className="so-btn-action primary" onClick={() => handleAction(order.id, 'ship')} title="Giao hàng">
                          <Truck size={16} /> Giao hàng
                        </button>
                      )}
                      {order.status === 'issue' && (
                        <button className="so-btn-action danger" onClick={() => handleAction(order.id, 'resolve')} title="Hoàn tiền / Hủy">
                          Xử lý
                        </button>
                      )}
                      <button className="so-btn-icon" title="Xem chi tiết" onClick={() => setSelectedOrder(order)}>
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="so-empty">Không tìm thấy đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Chi tiết Đơn hàng */}
      {selectedOrder && (
        <div className="so-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="so-modal-content" onClick={e => e.stopPropagation()}>
            <div className="so-modal-header">
              <h3>Chi tiết đơn hàng {selectedOrder.id}</h3>
              <button className="btn-close-modal" onClick={() => setSelectedOrder(null)}><X size={20} /></button>
            </div>
            
            <div className="so-modal-body">
              <div className="so-modal-section">
                <h4>Thông tin khách hàng</h4>
                <p><strong>Người nhận:</strong> {selectedOrder.customer}</p>
                <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
              </div>

              {selectedOrder.status === 'shipping' && (
                <div className="so-modal-section">
                  <h4>Lộ trình vận chuyển (EcoExpress)</h4>
                  <div className="shipping-timeline">
                    <div className="timeline-item active">
                      <div className="tl-icon"><Truck size={14}/></div>
                      <div className="tl-content">
                        <strong>Đang giao tới khách hàng</strong>
                        <span className="tl-time">Hôm nay 09:15, Shipper Nguyễn Văn A đang trên đường giao (SĐT: 0987xxx)</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="tl-icon"><MapPin size={14}/></div>
                      <div className="tl-content">
                        <strong>Đã đến Kho phân loại (Hà Nội)</strong>
                        <span className="tl-time">Hôm qua 22:30, Đã quét mã trung chuyển</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="tl-icon"><Package size={14}/></div>
                      <div className="tl-content">
                        <strong>Lấy hàng thành công</strong>
                        <span className="tl-time">Hôm qua 15:00, Đã lấy hàng từ Gian hàng {currentUser?.shopId || 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder.status === 'issue' && (
                <div className="so-modal-section issue-box">
                  <h4><AlertTriangle size={18}/> Báo cáo Sự cố / Khiếu nại</h4>
                  <div className="issue-content">
                    <strong>Lý do từ khách hàng/ĐVVC:</strong>
                    <p>{selectedOrder.issueDetail}</p>
                    <div className="issue-proofs">
                      <div className="proof-img">Ảnh chứng minh 1</div>
                      <div className="proof-img">Ảnh chứng minh 2</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="so-modal-section">
                <h4>Thông tin thanh toán</h4>
                <table className="mini-table">
                  <tbody>
                    <tr><td>Sản phẩm:</td><td>{selectedOrder.products.map(p => `${p.name} (x${p.qty})`).join(', ')}</td></tr>
                    <tr><td>Giá vốn:</td><td>{selectedOrder.cost}</td></tr>
                    <tr><td>Doanh thu:</td><td>{selectedOrder.total}</td></tr>
                    <tr><td>Lợi nhuận ròng:</td><td style={{color: '#10b981', fontWeight: 'bold'}}>{selectedOrder.profit}</td></tr>
                  </tbody>
                </table>
              </div>

            </div>
            
            <div className="so-modal-footer">
              <button className="btn-cancel" onClick={() => setSelectedOrder(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
