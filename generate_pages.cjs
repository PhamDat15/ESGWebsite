const fs = require('fs');

const pages = [
  { name: 'Guarantee', title: 'Bảo Đảm 100%', subtitle: 'Cam kết đổi trả và hoàn tiền nếu sản phẩm không đạt chuẩn.', img: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200' },
  { name: 'ExpressDelivery', title: 'Giao Hỏa Tốc', subtitle: 'Giao hàng nội thành chỉ trong 2H bằng xe điện.', img: 'https://images.unsplash.com/photo-1620853540673-c646fa1bb43b?auto=format&fit=crop&q=80&w=1200' },
  { name: 'ESGRanking', title: 'ESG Ranking', subtitle: 'Bảng xếp hạng nông dân phát triển bền vững.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Vouchers', title: 'Mã Giảm Giá', subtitle: 'Kho voucher đặc quyền dành cho thành viên.', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200' },
  { name: 'FarmerSupport', title: 'Hỗ Trợ Nhà Nông', subtitle: 'Đồng hành cùng hợp tác xã hướng tới tương lai xanh.', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200' }
];

pages.forEach(p => {
  const content = `import React from 'react';
import './FeaturePage.css';

const ${p.name} = () => {
  return (
    <div className="feature-page">
      <div className="feature-hero" style={{backgroundImage: 'url("${p.img}")'}}>
        <div className="hero-content">
          <h1>${p.title}</h1>
          <p>${p.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
export default ${p.name};
`;
  fs.writeFileSync('src/pages/' + p.name + '.jsx', content, 'utf8');
});

const css = `.feature-page {
  padding: var(--spacing-md);
}
.feature-hero {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
}
.feature-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
}
.hero-content {
  position: relative;
  color: white;
  z-index: 1;
}
.hero-content h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
}
.hero-content p {
  font-size: 18px;
  opacity: 0.9;
}
`;
fs.writeFileSync('src/pages/FeaturePage.css', css, 'utf8');
console.log('Created components and CSS!');
