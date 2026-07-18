import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = mockProducts.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockProducts);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Kết quả tìm kiếm cho: "{query}"</h1>
        <p>Tìm thấy {results.length} sản phẩm phù hợp.</p>
      </div>

      <div className="search-product-grid">
        {results.length > 0 ? (
          results.map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="badge-fresh">Fresh {product.freshIndex}</div>
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price-row">
                  <span className="product-price">{product.price}</span>
                  <span className="product-sales">{product.sales}</span>
                </div>
                <div className="product-scores">
                  <span className="score-badge">ESG: {product.esgScore}</span>
                  <span className="score-badge orange">CO2: Thấp</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>Rất tiếc, không tìm thấy sản phẩm nào khớp với từ khóa của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
