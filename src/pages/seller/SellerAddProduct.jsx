import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, UploadCloud } from 'lucide-react';
import './SellerAddProduct.css';

const SellerAddProduct = () => {
  const navigate = useNavigate();

  // Bảng Nhật ký canh tác động (Dynamic Table)
  const [growingDiary, setGrowingDiary] = useState([
    { id: 1, date: '', activity: '' }
  ]);

  const addDiaryRow = () => {
    setGrowingDiary([...growingDiary, { id: Date.now(), date: '', activity: '' }]);
  };

  const removeDiaryRow = (id) => {
    if (growingDiary.length > 1) {
      setGrowingDiary(growingDiary.filter(row => row.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Lưu sản phẩm thành công!");
    navigate('/seller/products');
  };

  return (
    <div className="seller-add-product-page">
      <div className="sap-header">
        <div className="sap-header-left">
          <button className="btn-icon" onClick={() => navigate('/seller/products')}><ArrowLeft size={20}/></button>
          <h2>Thêm Nông Sản Mới</h2>
        </div>
        <button className="btn-save-product" onClick={handleSave}>
          <Save size={20} />
          <span>Lưu Sản Phẩm</span>
        </button>
      </div>

      <div className="sap-layout">
        <div className="sap-main-content">
          
          {/* Phần 1: Thông tin cơ bản */}
          <section id="section-basic" className="sap-card">
            <h3>I. Thông tin cơ bản</h3>
            <div className="sap-form-grid">
              <div className="form-group col-span-2">
                <label>Tên sản phẩm *</label>
                <input type="text" placeholder="Ví dụ: Xoài Cát Hòa Lộc" />
              </div>
              <div className="form-group">
                <label>Giá bán (VNĐ) *</label>
                <input type="number" placeholder="85000" />
              </div>
              <div className="form-group">
                <label>Đơn vị bán *</label>
                <input type="text" placeholder="kg, túi, hộp..." />
              </div>
              <div className="form-group">
                <label>Khối lượng / Đơn vị</label>
                <input type="text" placeholder="1kg" />
              </div>
              <div className="form-group">
                <label>Phân loại hàng</label>
                <select>
                  <option>Loại 1 (Xuất khẩu)</option>
                  <option>Loại 2 (Nội địa cao cấp)</option>
                  <option>Loại 3 (Tiêu chuẩn)</option>
                </select>
              </div>
              
              <div className="form-group col-span-2">
                <label>Hình ảnh sản phẩm (5-10 ảnh) *</label>
                <div className="upload-box">
                  <UploadCloud size={32} color="#94a3b8" />
                  <p>Kéo thả ảnh vào đây hoặc <span>Tải lên từ thiết bị</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Phần 2: Hồ sơ & Vùng trồng */}
          <section id="section-area" className="sap-card bg-disabled">
            <div className="sap-card-header-flex">
              <h3>II. Hồ sơ Sản xuất & Vùng trồng</h3>
              <span className="badge-auto">Tự động lấy từ Hồ sơ</span>
            </div>
            <p className="sap-note">Thông tin này được đồng bộ từ Cài đặt Hồ sơ Nhà Nông của bạn.</p>
            <div className="sap-auto-fill-grid">
              <div><strong>Người sản xuất:</strong> Nguyễn Văn A</div>
              <div><strong>Hợp tác xã:</strong> HTX Mỹ Xương</div>
              <div><strong>Vùng trồng:</strong> Cao Lãnh, Đồng Tháp</div>
              <div><strong>Loại đất:</strong> Đất phù sa</div>
              <div><strong>Khí hậu:</strong> Nhiệt đới</div>
              <div><strong>Diện tích:</strong> 25 ha</div>
            </div>
          </section>

          {/* Phần 3: Chứng nhận */}
          <section id="section-cert" className="sap-card">
            <h3>III. Tiêu chuẩn & Chứng nhận</h3>
            <div className="cert-grid">
              <label className="cert-checkbox-wrapper">
                <input type="checkbox" defaultChecked />
                <div className="cert-content">
                  <strong>VietGAP</strong>
                  <span>Tải lên file PDF chứng nhận</span>
                </div>
              </label>
              <label className="cert-checkbox-wrapper">
                <input type="checkbox" />
                <div className="cert-content">
                  <strong>GlobalGAP</strong>
                  <span>Tải lên file PDF chứng nhận</span>
                </div>
              </label>
              <label className="cert-checkbox-wrapper">
                <input type="checkbox" defaultChecked />
                <div className="cert-content">
                  <strong>Organic (Hữu cơ)</strong>
                  <span>Tải lên file PDF chứng nhận</span>
                </div>
              </label>
              <label className="cert-checkbox-wrapper">
                <input type="checkbox" />
                <div className="cert-content">
                  <strong>HACCP</strong>
                  <span>Tải lên file PDF chứng nhận</span>
                </div>
              </label>
            </div>
            
            <div className="form-group mt-20" style={{maxWidth: '300px'}}>
              <label>Xếp hạng OCOP</label>
              <select>
                <option value="">Chưa có</option>
                <option value="3">3 Sao</option>
                <option value="4">4 Sao</option>
                <option value="5">5 Sao</option>
              </select>
            </div>
          </section>

          {/* Phần 4: Nhật ký canh tác */}
          <section id="section-diary" className="sap-card">
            <h3>IV. Nhật ký canh tác (Digital Passport)</h3>
            <p className="sap-note">Đây là phần cực kỳ quan trọng để minh bạch quá trình trồng trọt với người mua.</p>
            
            <table className="sap-diary-table">
              <thead>
                <tr>
                  <th width="30%">Ngày thực hiện</th>
                  <th width="60%">Hoạt động (Gieo trồng, bón phân, cắt tỉa...)</th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {growingDiary.map((row, index) => (
                  <tr key={row.id}>
                    <td><input type="date" className="sap-input" /></td>
                    <td><input type="text" className="sap-input" placeholder="Ví dụ: Bón phân hữu cơ vi sinh" /></td>
                    <td>
                      <button type="button" className="btn-icon danger" onClick={() => removeDiaryRow(row.id)} disabled={growingDiary.length === 1}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button type="button" className="btn-add-row mt-10" onClick={addDiaryRow}>
              <Plus size={16} /> Thêm hoạt động
            </button>
          </section>

          {/* Phần 5: Thu hoạch */}
          <section id="section-harvest" className="sap-card">
            <h3>V. Thông tin thu hoạch</h3>
            <div className="sap-form-grid">
              <div className="form-group">
                <label>Ngày thu hoạch *</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Giờ thu hoạch</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Giờ đóng gói</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Giờ xuất kho</label>
                <input type="time" />
              </div>
            </div>
          </section>

        </div>

        {/* Anchor Menu Sidebar */}
        <div className="sap-sidebar">
          <div className="sap-anchor-menu">
            <h4>Danh mục nhập liệu</h4>
            <ul>
              <li><a href="#section-basic">I. Thông tin cơ bản</a></li>
              <li><a href="#section-area">II. Hồ sơ Vùng trồng</a></li>
              <li><a href="#section-cert">III. Chứng nhận</a></li>
              <li><a href="#section-diary">IV. Nhật ký canh tác</a></li>
              <li><a href="#section-harvest">V. Thông tin thu hoạch</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAddProduct;
