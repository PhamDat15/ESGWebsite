import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { mockArticles as articles } from '../data/mockArticles';
import './News.css';

const News = () => {
  const navigate = useNavigate();

  return (
    <div className="news-page">
      <div className="news-header">
        <h1>Tin Tức Nông Nghiệp & ESG</h1>
        <p>Cập nhật những thông tin mới nhất về thị trường nông sản, xu hướng tiêu dùng xanh và các công nghệ nông nghiệp bền vững.</p>
      </div>

      <div className="news-grid">
        {/* Featured Article */}
        <div className="featured-article">
          <div className="featured-img">
            <img src={articles[0].image} alt={articles[0].title} />
            <span className="category-badge">{articles[0].category}</span>
          </div>
          <div className="featured-content">
            <div className="article-meta">
              <Calendar size={14} /> {articles[0].date}
            </div>
            <h2>{articles[0].title}</h2>
            <p>{articles[0].excerpt}</p>
            <button className="read-more-btn" onClick={() => navigate(`/news/${articles[0].id}`)}>
              Đọc tiếp <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Regular Articles */}
        <div className="article-list">
          {articles.slice(1).map(article => (
            <div className="article-card" key={article.id} onClick={() => navigate(`/news/${article.id}`)} style={{cursor: 'pointer'}}>
              <div className="article-img">
                <img src={article.image} alt={article.title} />
                <span className="category-badge">{article.category}</span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <Calendar size={14} /> {article.date}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <button className="read-more-link">
                  Chi tiết <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
