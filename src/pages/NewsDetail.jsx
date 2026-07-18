import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { mockArticles } from '../data/mockArticles';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = mockArticles.find(a => a.id === parseInt(id));

  if (!article) {
    return <div style={{padding: '50px', textAlign: 'center'}}><h2>Bài viết không tồn tại!</h2></div>;
  }

  return (
    <div className="news-detail-page">
      <button className="back-btn" onClick={() => navigate('/news')}>
        <ArrowLeft size={16} /> Quay lại trang tin tức
      </button>

      <div className="news-detail-header">
        <span className="category-badge-detail">{article.category}</span>
        <h1>{article.title}</h1>
        <div className="article-meta-detail">
          <Calendar size={16} /> {article.date}
        </div>
      </div>

      <div className="news-detail-hero">
        <img src={article.image} alt={article.title} />
      </div>

      <div className="news-detail-content">
        <p className="excerpt"><strong>{article.excerpt}</strong></p>
        {article.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
