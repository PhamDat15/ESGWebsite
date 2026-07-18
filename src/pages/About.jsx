import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Users, ShieldCheck, ArrowRight, Sprout, HandHeart, Globe2 } from 'lucide-react';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>Kết nối Nông nghiệp Xanh</h1>
          <h2>Kiến tạo Tương lai Bền vững</h2>
          <p>
            Chúng tôi không chỉ bán nông sản. Chúng tôi xây dựng một hệ sinh thái minh bạch, 
            nơi công sức của người nông dân được tôn vinh và môi trường được bảo vệ.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="about-story container">
        <div className="story-image">
          <img 
            src="/images/coffee.jpg" 
            alt="Nông dân thu hoạch" 
          />
        </div>
        <div className="story-content">
          <h3 className="section-subtitle">Câu chuyện của chúng tôi</h3>
          <h2 className="section-title">Từ cánh đồng đến bàn ăn, một hành trình minh bạch</h2>
          <p>
            Ra đời từ khao khát giải quyết thực trạng nông sản sạch bị đánh đồng với sản phẩm trôi nổi, 
            và người nông dân luôn chịu thiệt thòi trong chuỗi cung ứng truyền thống.
          </p>
          <p>
            EcoHarvest được thành lập để trở thành cầu nối trực tiếp. Bằng việc ứng dụng công nghệ truy xuất nguồn gốc 
            và hệ thống đánh giá ESG (Môi trường - Xã hội - Quản trị), chúng tôi mang đến cho người tiêu dùng 
            những bữa ăn an toàn tuyệt đối, đồng thời đảm bảo một sinh kế công bằng cho hàng vạn nhà nông Việt Nam.
          </p>
          <div className="story-features">
            <div className="s-feat"><CheckCircleIcon /> Trực tiếp từ Nông trại</div>
            <div className="s-feat"><CheckCircleIcon /> Không chất bảo quản</div>
            <div className="s-feat"><CheckCircleIcon /> 100% Bao bì sinh thái</div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (ESG) */}
      <section className="about-esg bg-light">
        <div className="container">
          <div className="text-center mb-40">
            <h3 className="section-subtitle">Hệ giá trị cốt lõi</h3>
            <h2 className="section-title">Tiêu chuẩn ESG của chúng tôi</h2>
            <p className="max-w-600 mx-auto text-muted">
              Mọi hoạt động trên nền tảng đều được đo lường dựa trên 3 trụ cột phát triển bền vững toàn cầu.
            </p>
          </div>
          
          <div className="esg-grid">
            <div className="esg-card">
              <div className="esg-icon env"><Leaf size={32} /></div>
              <h3>Môi trường (E)</h3>
              <p>Khuyến khích canh tác hữu cơ, sử dụng thiên địch thay thuốc trừ sâu. Vận hành logistics xanh giảm thiểu lượng lớn khí thải CO2.</p>
            </div>
            <div className="esg-card">
              <div className="esg-icon soc"><Users size={32} /></div>
              <h3>Xã hội (S)</h3>
              <p>Trả công công bằng, không ép giá nông dân. Cam kết tạo sinh kế bền vững cho đồng bào vùng sâu vùng xa và đồng bào dân tộc thiểu số.</p>
            </div>
            <div className="esg-card">
              <div className="esg-icon gov"><ShieldCheck size={32} /></div>
              <h3>Quản trị (G)</h3>
              <p>Minh bạch 100% thông tin xuất xứ, nhật ký canh tác. Xếp hạng đối tác công bằng dựa trên dữ liệu thật, không có sự can thiệp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact in Numbers */}
      <section className="about-impact">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-item">
              <Sprout size={40} className="impact-icon" />
              <div className="impact-number">50+</div>
              <div className="impact-label">Hợp tác xã Đồng hành</div>
            </div>
            <div className="impact-item">
              <HandHeart size={40} className="impact-icon" />
              <div className="impact-number">12,000+</div>
              <div className="impact-label">Khách hàng Tin dùng</div>
            </div>
            <div className="impact-item">
              <Globe2 size={40} className="impact-icon" />
              <div className="impact-number">-85 Tấn</div>
              <div className="impact-label">CO2 được Cắt giảm</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Hãy cùng chúng tôi gieo mầm sự sống!</h2>
          <p>Mỗi đơn hàng của bạn là một hành động thiết thực để bảo vệ Trái đất và ủng hộ Nông nghiệp Việt.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/clean-produce')}>
              Khám phá Nông sản <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline btn-lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', color: 'white', borderColor: 'white' }} onClick={() => navigate('/auth')}>
              Trở thành Đối tác
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default About;
