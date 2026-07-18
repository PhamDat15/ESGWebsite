import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo-row">
            <Leaf size={100} color="#10b981" />
            <h1>EcoFlow</h1>
          </div>
          <p>Nền tảng Nông sản sạch & Phát triển bền vững</p>
          <div className="auth-trust-badges" style={{ marginTop: '40px', fontSize: '13px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span><strong>Chứng nhận:</strong> VietGAP, GlobalGAP, ISO 9001:2015, OCOP 4-5 Sao</span>
            <span><strong>Hỗ trợ thanh toán:</strong> Visa, MasterCard, VNPay, MoMo, COD</span>
          </div>
        </div>

        <div className="auth-card">
          <h2>Đăng Nhập</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '-10px', marginBottom: '25px', fontSize: '14px' }}>
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#10b981', fontWeight: '500' }}>Đăng kí</span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ cursor: 'pointer', color: '#64748b' }}>Quên mật khẩu?</span>
          </div>
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                placeholder="Ví dụ: Girl36 hoặc PigMoney"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-auth">Đăng Nhập</button>
          </form>

          <div className="auth-hint">
            <p><strong>Tài khoản Demo:</strong></p>
            <ul>
              <li>Khách hàng (Buyer): <code>Girl36</code> / <code>Girl36</code></li>
              <li>Nhà nông (Seller): <code>PigMoney</code> / <code>PigMoney</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
