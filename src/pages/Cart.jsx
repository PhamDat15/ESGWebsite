import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateItemTotal = (priceStr, quantity) => {
    const num = parseInt(priceStr.replace(/\D/g, '')) || 0;
    return num * quantity;
  };

  const grandTotal = cartItems.reduce((sum, item) => {
    return sum + calculateItemTotal(item.price, item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <ShoppingBag size={80} color="var(--color-border)" />
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Hãy khám phá các sản phẩm xanh và chất lượng ngay nhé!</p>
        <button className="btn-continue" onClick={() => navigate('/shop')}>Khám phá sản phẩm</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Quay lại
        </button>
        <h1>Giỏ Hàng Của Bạn</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </Link>
              
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="cart-item-price">{item.price}</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>

              <div className="cart-item-total">
                {calculateItemTotal(item.price, item.quantity).toLocaleString('vi-VN')}đ
              </div>

              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Tổng Đơn Hàng</h2>
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{grandTotal.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển (Dự kiến)</span>
            <span>Miễn phí</span>
          </div>
          <div className="summary-row total">
            <span>Tổng cộng</span>
            <span>{grandTotal.toLocaleString('vi-VN')}đ</span>
          </div>
          <button className="btn-checkout" onClick={() => navigate('/checkout')}>Tiến hành Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
