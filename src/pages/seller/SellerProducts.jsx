import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { mockProducts } from '../../data/mockProducts';
import './SellerProducts.css';

const SellerProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useContext(AuthContext);
  
  const shopId = currentUser?.shopId || 1;
  const startIndex = (shopId * 12) % mockProducts.length;
  
  // Khởi tạo state với dữ liệu, làm phong phú danh mục và trạng thái kho để test lọc
  const [products, setProducts] = useState(() => {
    return mockProducts.slice(startIndex, startIndex + 12).map((p, index) => {
      // Đồng bộ logic hết hàng với ShopDetail.jsx
      const isOutOfStock = index > 3 && (shopId * 7 + index * 3) % 10 > 7;
      
      return {
        id: 'P' + p.id.toString().padStart(3, '0'),
        name: p.name,
        category: index % 3 === 0 ? 'Trái cây' : (index % 2 === 0 ? 'Rau củ' : 'Nông sản'),
        price: p.price,
        stock: isOutOfStock ? 0 : Math.floor(Math.random() * 100) + 10,
        status: isOutOfStock ? 'out_of_stock' : 'active',
        sales: parseInt(p.sales.replace(/\D/g, '')) || 0,
        originalId: p.id
      };
    });
  });

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Logic Lọc (Derived state)
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi gian hàng?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleView = (originalId) => {
    navigate(`/product/${originalId}`);
  };

  return (
    <div className="seller-products-page">
      <div className="sp-header">
        <div>
          <h2>Nông Sản Của Tôi</h2>
          <p>Quản lý danh sách sản phẩm, chứng nhận và nhật ký canh tác.</p>
        </div>
        <button className="btn-add-product" onClick={() => navigate('/seller/products/add')}>
          <Plus size={20} />
          <span>Thêm Nông Sản Mới</span>
        </button>
      </div>

      <div className="sp-toolbar">
        <div className="sp-search">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc mã SP..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sp-filters">
          <select className="sp-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">Tất cả ngành hàng</option>
            <option value="Trái cây">Trái cây</option>
            <option value="Rau củ">Rau củ</option>
            <option value="Nông sản">Nông sản</option>
          </select>
          <select className="sp-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang bán</option>
            <option value="out_of_stock">Hết hàng</option>
          </select>
        </div>
      </div>

      <div className="sp-table-container">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên Nông Sản</th>
              <th>Phân Loại</th>
              <th>Giá Bán</th>
              <th>Kho</th>
              <th>Đã Bán</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(item => (
                <tr key={item.id}>
                  <td className="text-muted">{item.id}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.sales}</td>
                  <td>
                    <span className={`sp-status-badge ${item.status}`}>
                      {item.status === 'active' ? 'Đang bán' : 'Hết hàng'}
                    </span>
                  </td>
                  <td>
                    <div className="sp-actions">
                      <button className="btn-icon" title="Xem trước" onClick={() => handleView(item.originalId)}><Eye size={16} /></button>
                      <button className="btn-icon" title="Sửa"><Edit size={16} /></button>
                      <button className="btn-icon danger" title="Xóa" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', padding: '30px', color: '#64748b'}}>
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;
