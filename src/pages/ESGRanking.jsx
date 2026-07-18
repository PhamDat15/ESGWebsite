import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, ShieldCheck, Trophy, ArrowRight, Award, TreePine, Recycle } from 'lucide-react';
import './FeaturePage.css';
import './ESGRanking.css';

const ESGRanking = () => {
  const topFarms = [
    { rank: 1, name: 'Hợp Tác Xã Nông Vàng', score: 98, e: 35, s: 33, g: 30, desc: 'Tiên phong mô hình không rác thải nhựa.' },
    { rank: 2, name: 'Trang Trại Xanh Mộc Châu', score: 95, e: 34, s: 32, g: 29, desc: '100% nhân sự là đồng bào dân tộc thiểu số.' },
    { rank: 3, name: 'Organic Farm Đà Lạt', score: 92, e: 33, s: 30, g: 29, desc: 'Hệ thống quản trị minh bạch, báo cáo định kỳ.' },
    { rank: 4, name: 'Vườn Trái Cây Sáu Coba', score: 88, e: 30, s: 30, g: 28, desc: 'Sử dụng 100% phân bón sinh học.' },
  ];

  return (
    <div className="feature-page esg-page">
      <div className="feature-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="hero-content">
          <h1>ESG Ranking</h1>
          <p>Môi trường - Xã hội - Quản trị. Bảng xếp hạng những trang trại phát triển bền vững nhất hệ thống.</p>
        </div>
      </div>

      <div className="esg-container">
        {/* Intro Section */}
        <section className="esg-section">
          <div className="esg-intro-grid">
            <div className="esg-intro-content">
              <h2 className="esg-section-title text-left">Tiêu chuẩn ESG là gì?</h2>
              <p>Chúng tôi không chỉ bán nông sản, chúng tôi thúc đẩy một hệ sinh thái nông nghiệp bền vững. Mỗi gian hàng trên nền tảng đều được đánh giá nghiêm ngặt dựa trên 3 trụ cột cốt lõi của thế giới:</p>
              
              <div className="esg-pillars">
                <div className="esg-pillar">
                  <div className="esg-p-icon e-icon"><Leaf size={24} /></div>
                  <div className="esg-p-text">
                    <h4>Môi trường (Environment)</h4>
                    <p>Mức độ thân thiện môi trường, giảm phát thải, xử lý rác thải hữu cơ, dùng bao bì xanh.</p>
                  </div>
                </div>
                <div className="esg-pillar">
                  <div className="esg-p-icon s-icon"><Users size={24} /></div>
                  <div className="esg-p-text">
                    <h4>Xã hội (Social)</h4>
                    <p>Tạo việc làm công bằng, bảo vệ sức khỏe người lao động, đóng góp cộng đồng địa phương.</p>
                  </div>
                </div>
                <div className="esg-pillar">
                  <div className="esg-p-icon g-icon"><ShieldCheck size={24} /></div>
                  <div className="esg-p-text">
                    <h4>Quản trị (Governance)</h4>
                    <p>Sự minh bạch trong kinh doanh, đạo đức lãnh đạo, tuân thủ pháp luật và chống gian lận.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="esg-intro-visual">
              <div className="esg-circle-wrap">
                <div className="esg-circle main"><span>ESG</span></div>
                <div className="esg-circle sub e"><TreePine size={32} /></div>
                <div className="esg-circle sub s"><Users size={32} /></div>
                <div className="esg-circle sub g"><Recycle size={32} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="esg-section bg-light">
          <h2 className="esg-section-title">Bảng Vàng Phát Triển Bền Vững (Tháng 7/2026)</h2>
          <p className="esg-section-subtitle">Tôn vinh những đối tác đã nỗ lực hết mình vì một tương lai xanh.</p>
          
          <div className="esg-leaderboard">
            <div className="esg-l-header">
              <div className="col-rank">Hạng</div>
              <div className="col-name">Trang Trại / Đối Tác</div>
              <div className="col-scores">Điểm Thành Phần</div>
              <div className="col-total">Tổng ESG</div>
            </div>
            
            <div className="esg-l-body">
              {topFarms.map((farm, index) => (
                <div key={farm.rank} className={`esg-l-row ${index === 0 ? 'top-1' : ''}`}>
                  <div className="col-rank">
                    {index === 0 ? <Trophy size={28} color="#fbbf24" /> : 
                     index === 1 ? <Award size={24} color="#94a3b8" /> : 
                     index === 2 ? <Award size={24} color="#b45309" /> : 
                     <span className="rank-num">{farm.rank}</span>}
                  </div>
                  <div className="col-name">
                    <h4>{farm.name}</h4>
                    <p>{farm.desc}</p>
                  </div>
                  <div className="col-scores">
                    <div className="score-pill env" title="Điểm Môi Trường (Tối đa 40)"><Leaf size={14} /> {farm.e}</div>
                    <div className="score-pill soc" title="Điểm Xã Hội (Tối đa 35)"><Users size={14} /> {farm.s}</div>
                    <div className="score-pill gov" title="Điểm Quản Trị (Tối đa 25)"><ShieldCheck size={14} /> {farm.g}</div>
                  </div>
                  <div className="col-total">
                    <div className="total-score-badge">{farm.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="esg-section esg-cta">
          <div className="cta-content">
            <h2>Chung Tay Vì Một Nền Nông Nghiệp Xanh</h2>
            <p>Mỗi đơn hàng của bạn tại những gian hàng đạt chuẩn ESG là một đóng góp thiết thực để bảo vệ trái đất và cộng đồng.</p>
            <Link to="/annual-report" className="esg-btn-primary">
              Xem Báo Cáo Thường Niên <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ESGRanking;
