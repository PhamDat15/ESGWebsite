import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import QRCodeModal from '../components/QRCodeModal';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { addNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [shippingVoucher, setShippingVoucher] = useState(null);
  const [discountVoucher, setDiscountVoucher] = useState(null);
  
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherModalType, setVoucherModalType] = useState('discount'); // 'freeship' or 'discount'
  
  const [showQR, setShowQR] = useState(false);
  
  const savedVouchers = JSON.parse(localStorage.getItem('savedVouchers') || '[]');

  const calculateItemTotal = (priceStr, quantity) => {
    const num = parseInt(priceStr.replace(/\D/g, '')) || 0;
    return num * quantity;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item.price, item.quantity), 0);
  const baseDeliveryFee = deliveryMethod === 'express' ? 30000 : 15000;
  
  let finalDeliveryFee = baseDeliveryFee;
  let finalDiscount = 0;

  if (shippingVoucher) {
    finalDeliveryFee = Math.max(0, baseDeliveryFee - shippingVoucher.value);
  }
  if (discountVoucher) {
    finalDiscount = discountVoucher.value;
  }

  const grandTotal = Math.max(0, subtotal + finalDeliveryFee - finalDiscount);

  const handleApplyVoucher = (voucher) => {
    if (subtotal < voucher.minOrder) {
      addNotification(`Chưa đạt giá trị tối thiểu ${voucher.minOrder.toLocaleString()}đ để dùng mã này!`, 'error');
      return;
    }
    if (voucher.type === 'freeship') {
      setShippingVoucher(voucher);
    } else {
      setDiscountVoucher(voucher);
    }
    setShowVoucherModal(false);
    addNotification('Áp dụng mã giảm giá thành công!', 'success');
  };

  const displayVouchers = savedVouchers.filter(v => 
    voucherModalType === 'freeship' ? v.type === 'freeship' : v.type !== 'freeship'
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (paymentMethod === 'online') {
      setShowQR(true);
    } else {
      // COD
      const orderId = 'ORD' + Math.floor(Math.random() * 10000);
      addNotification(`Đơn hàng #${orderId} của bạn đã được đặt thành công!`, 'success');
      clearCart();
      navigate('/success');
    }
  };

  const handlePaymentSuccess = () => {
    setShowQR(false);
    const orderId = 'ORD' + Math.floor(Math.random() * 10000);
    addNotification(`Thanh toán thành công! Đơn hàng #${orderId} đang được xử lý.`, 'success');
    clearCart();
    navigate('/success');
  };

  if (cartItems.length === 0 && !showQR) {
    return (
      <div className="checkout-empty">
        <h2>Không có sản phẩm nào để thanh toán!</h2>
        <button className="btn-return" onClick={() => navigate('/shop')}>Quay lại mua sắm</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Thanh Toán Đơn Hàng</h1>
      <form className="checkout-grid" onSubmit={handlePlaceOrder}>
        <div className="checkout-left">
          <div className="checkout-section">
            <h2>1. Địa chỉ giao hàng</h2>
            <div className="form-group">
              <input type="text" placeholder="Họ và tên" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Số điện thoại" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Địa chỉ chi tiết (Số nhà, Đường, Phường, Quận, Thành phố)" required />
            </div>
          </div>

          <div className="checkout-section">
            <h2>2. Hình thức giao hàng</h2>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="delivery" value="standard" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} />
                <div className="radio-content">
                  <span>Giao hàng tiêu chuẩn (3-5 ngày)</span>
                  <span className="price">15.000đ</span>
                </div>
              </label>
              <label className="radio-label">
                <input type="radio" name="delivery" value="express" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} />
                <div className="radio-content">
                  <span>Giao hàng hoả tốc (Trong ngày)</span>
                  <span className="price">30.000đ</span>
                </div>
              </label>
            </div>

            <div className="voucher-section-v2 shipping-voucher-wrapper" style={{marginTop: '20px', marginBottom: '0'}}>
              <div className="voucher-header">
                <h3>Voucher Vận Chuyển</h3>
                <button type="button" className="btn-select-voucher" onClick={() => { setVoucherModalType('freeship'); setShowVoucherModal(true); }}>
                  {shippingVoucher ? 'Đổi Voucher' : 'Chọn Voucher FS'}
                </button>
              </div>
              {shippingVoucher && (
                <div className="selected-voucher-card">
                  <div className="svc-info">
                    <strong>{shippingVoucher.discount}</strong>
                    <span>{shippingVoucher.title}</span>
                  </div>
                  <button type="button" className="btn-remove-voucher" onClick={() => setShippingVoucher(null)}>✕</button>
                </div>
              )}
            </div>
          </div>

          <div className="checkout-section">
            <h2>3. Phương thức thanh toán</h2>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <div className="radio-content">
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </div>
              </label>
              <label className="radio-label">
                <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                <div className="radio-content">
                  <span>Thanh toán Online (Quét mã QR Ngân hàng/Ví)</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="checkout-summary-card">
            <h2>Tổng quan đơn hàng</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div className="summary-item" key={item.id}>
                  <div className="summary-item-name">{item.name} <strong>x {item.quantity}</strong></div>
                  <span>{calculateItemTotal(item.price, item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>

            <div className="voucher-section-v2">
              <div className="voucher-header">
                <h3>Voucher Ưu Đãi</h3>
                <button type="button" className="btn-select-voucher" onClick={() => { setVoucherModalType('discount'); setShowVoucherModal(true); }}>
                  {discountVoucher ? 'Đổi Voucher' : 'Chọn Voucher'}
                </button>
              </div>
              {discountVoucher && (
                <div className="selected-voucher-card">
                  <div className="svc-info">
                    <strong>{discountVoucher.discount}</strong>
                    <span>{discountVoucher.title}</span>
                  </div>
                  <button type="button" className="btn-remove-voucher" onClick={() => setDiscountVoucher(null)}>✕</button>
                </div>
              )}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="total-row">
                <span>Phí giao hàng</span>
                <span className={finalDeliveryFee < baseDeliveryFee ? 'strikethrough-opt' : ''}>
                  {baseDeliveryFee.toLocaleString('vi-VN')}đ
                </span>
              </div>
              {shippingVoucher && (
                <div className="total-row discount">
                  <span>Hỗ trợ phí ship</span>
                  <span>-{(baseDeliveryFee - finalDeliveryFee).toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {finalDiscount > 0 && (
                <div className="total-row discount">
                  <span>Giảm giá Voucher</span>
                  <span>-{finalDiscount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Tổng cộng</span>
                <span>{grandTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <button type="submit" className="btn-place-order">Hoàn Tất Đặt Hàng</button>
          </div>
        </div>
      </form>

      {showQR && (
        <QRCodeModal 
          amount={grandTotal} 
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowQR(false)}
        />
      )}

      {/* Voucher Modal */}
      {showVoucherModal && (
        <div className="modal-overlay" onClick={() => setShowVoucherModal(false)}>
          <div className="voucher-modal" onClick={e => e.stopPropagation()}>
            <div className="voucher-modal-header">
              <h2>Kho Voucher Của Bạn</h2>
              <button className="btn-close-modal" onClick={() => setShowVoucherModal(false)}>✕</button>
            </div>
            <div className="voucher-modal-body">
              {displayVouchers.length === 0 ? (
                <div className="empty-vouchers">
                  <p>Không có mã nào phù hợp trong kho.</p>
                  <button className="btn-go-vouchers" type="button" onClick={() => navigate('/vouchers')}>Đến trang Mã Giảm Giá</button>
                </div>
              ) : (
                <div className="saved-voucher-list">
                  {displayVouchers.map(v => (
                    <div key={v.id} className={`checkout-vc-card ${v.type}`}>
                      <div className="cvc-left">
                        <strong>{v.discount}</strong>
                      </div>
                      <div className="cvc-right">
                        <div>
                          <h4>{v.title}</h4>
                          <p>{v.desc}</p>
                          {subtotal < v.minOrder && (
                            <span className="cvc-error">Mua thêm {(v.minOrder - subtotal).toLocaleString('vi-VN')}đ để sử dụng</span>
                          )}
                        </div>
                        <button 
                          className="btn-use-vc" 
                          disabled={subtotal < v.minOrder}
                          onClick={() => handleApplyVoucher(v)}
                        >
                          Dùng ngay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
