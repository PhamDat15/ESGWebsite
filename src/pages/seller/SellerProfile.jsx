import React, { useContext } from 'react';
import { Save } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { mockShops } from '../../data/mockShops';
import './SellerAddProduct.css'; // Tái sử dụng CSS của form

const SellerProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const shopId = currentUser?.shopId || 1;
  const shop = mockShops.find(s => s.id === shopId) || {};

  const handleSave = (e) => {
    e.preventDefault();
    alert("Cập nhật hồ sơ thành công!");
  };

  return (
    <div className="seller-add-product-page">
      <div className="sap-header">
        <div className="sap-header-left">
          <h2>Hồ Sơ Của Tôi</h2>
        </div>
        <button className="btn-save-product" onClick={handleSave}>
          <Save size={20} />
          <span>Lưu Thay Đổi</span>
        </button>
      </div>

      <div className="sap-layout">
        <div className="sap-main-content">
          <section id="section-profile" className="sap-card">
            <h3>I. Hồ sơ nhà sản xuất</h3>
            <div className="sap-form-grid">
              <div className="form-group">
                <label>Tên người sản xuất (hoặc tên đại diện)</label>
                <input type="text" defaultValue={currentUser?.name || "Đại diện HTX"} />
              </div>
              <div className="form-group">
                <label>Tên Hợp tác xã (Gian hàng)</label>
                <input type="text" defaultValue={shop.name || "HTX..."} />
              </div>
              <div className="form-group">
                <label>Số năm kinh nghiệm</label>
                <input type="text" defaultValue="5 năm" />
              </div>
            </div>
          </section>

          <section id="section-area" className="sap-card">
            <h3>II. Thông tin vùng trồng</h3>
            <div className="sap-form-grid">
              <div className="form-group col-span-2">
                <label>Địa chỉ Vùng trồng</label>
                <input type="text" defaultValue={shop.address || "Chưa cập nhật"} />
              </div>
              <div className="form-group">
                <label>Thành phố / Tỉnh</label>
                <input type="text" defaultValue={shop.city || "Chưa cập nhật"} />
              </div>
              <div className="form-group">
                <label>Quận / Huyện</label>
                <input type="text" defaultValue={shop.district || "Chưa cập nhật"} />
              </div>
              <div className="form-group">
                <label>Diện tích canh tác</label>
                <input type="text" defaultValue="25 ha" />
              </div>
              <div className="form-group">
                <label>Link Google Maps bản đồ vùng trồng</label>
                <input type="text" defaultValue="https://maps.google.com/..." />
              </div>
            </div>
          </section>
        </div>

        <div className="sap-sidebar">
          <div className="sap-anchor-menu">
            <h4>Cài đặt</h4>
            <ul>
              <li><a href="#section-profile">I. Hồ sơ nhà sản xuất</a></li>
              <li><a href="#section-area">II. Thông tin vùng trồng</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
