import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-text">ESG<span className="logo-highlight">Farm</span></span>
          </Link>
          <p className="footer-desc">
            Hệ sinh thái nông sản sạch đạt chuẩn ESG. Kết nối trực tiếp người nông dân với người tiêu dùng, mang đến những bữa ăn an toàn, minh bạch và phát triển bền vững.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/dieu.tran.471299" className="social-icon" style={{ fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>FB</a>
            <a href="https://www.instagram.com/_dieutrann1310_?fbclid=IwY2xjawTH49dleHRuA2FlbQIxMABicmlkETFFeURTVVBqbTBmVlE1SzF5c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHuipy2PU1Lm00JC2Ino0b0S45ShS780ZVCphFX8olJivsmOT41rNv0L_FTh6_aem_HkTAMe5sntI60pSeV3EQ9Q" className="social-icon" style={{ fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>IG</a>
            <a href="#" className="social-icon" style={{ fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>X</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Về ESG Farm</h3>
          <ul>
            <li><Link to="/about">Câu chuyện thương hiệu (About Us)</Link></li>
            <li><Link to="/about">Tiêu chuẩn ESG</Link></li>
            <li><Link to="/news">Tin tức & Blog</Link></li>
            <li><Link to="#">Tuyển dụng</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Hỗ Trợ Khách Hàng</h3>
          <ul>
            <li><Link to="#">Hướng dẫn mua hàng</Link></li>
            <li><Link to="#">Chính sách giao hàng</Link></li>
            <li><Link to="#">Chính sách đổi trả</Link></li>
            <li><Link to="#">Câu hỏi thường gặp (FAQ)</Link></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>Liên Hệ</h3>
          <div className="contact-item">
            <MapPin size={18} />
            <span>Khu Công nghệ cao, Phường Tân Phú, TP. Thủ Đức, TP.HCM</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>1900 8888 (8:00 - 20:00)</span>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <span>support@esgfarm.vn</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ESG Farm. All rights reserved. Tiên phong Nông nghiệp Xanh.</p>
        <div className="payment-methods">
          <span>Hỗ trợ thanh toán: Visa, MasterCard, VNPay, MoMo, COD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
