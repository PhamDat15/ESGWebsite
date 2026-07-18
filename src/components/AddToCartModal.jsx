import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './AddToCartModal.css';

const AddToCartModal = ({ product, onClose, mode = 'cart' }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const priceNum = parseInt(product.price.replace(/\D/g, '')) || 0;
  const totalPrice = (priceNum * quantity).toLocaleString('vi-VN') + 'đ';

  const handleAdd = () => {
    addToCart(product, quantity);
    
    if (mode === 'buy') {
      onClose();
      navigate('/checkout');
      return;
    }

    setIsAnimating(true);

    const cartIcon = document.getElementById('cart-icon-target');
    if (modalRef.current && cartIcon) {
      const startRect = modalRef.current.getBoundingClientRect();
      const endRect = cartIcon.getBoundingClientRect();

      const startCenterX = startRect.left + startRect.width / 2;
      const startCenterY = startRect.top + startRect.height / 2;
      const endCenterX = endRect.left + endRect.width / 2;
      const endCenterY = endRect.top + endRect.height / 2;

      const deltaX = endCenterX - startCenterX;
      const deltaY = endCenterY - startCenterY;

      // Animation: move to cart, shrink to a drop, and fade out slightly
      modalRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05)`;
      modalRef.current.style.opacity = '0.3';
      modalRef.current.style.borderRadius = '50%';
    }

    // Wait for animation to finish before closing
    setTimeout(() => {
      onClose();
      // Bounce effect on cart icon
      if (cartIcon) {
        cartIcon.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cartIcon.style.transform = 'scale(1.4)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
      }
    }, 800);
  };

  return (
    <div className="modal-overlay">
      <div 
        className={`modal-content ${isAnimating ? 'animating' : ''}`} 
        ref={modalRef}
      >
        <div className="modal-inner">
          <img src={product.image} alt={product.name} className="modal-img" />
          <div className="modal-info">
            <h3>{product.name}</h3>
            <p className="modal-price">{product.price}</p>
          </div>
        </div>

        {!isAnimating && (
          <>
            <div className="quantity-selector">
              <label>Số lượng:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
            
            <div className="modal-total">
              <span>Tổng tiền:</span>
              <span className="total-price">{totalPrice}</span>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>Hủy</button>
              <button className={`btn-add ${mode === 'buy' ? 'btn-buy-now' : ''}`} onClick={handleAdd}>
                {mode === 'buy' ? 'Mua ngay' : 'Thêm vào giỏ'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;
