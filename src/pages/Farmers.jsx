import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { NotificationContext } from '../context/NotificationContext';
import './Farmers.css';

const Farmers = () => {
  const navigate = useNavigate();
  const [followedShops, setFollowedShops] = useState([]);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('followedShops') || '[]');
    setFollowedShops(existing);
  }, []);

  const farmers = [
    {
      id: 1,
      shopId: 1,
      name: "Chú 6 Hòa Lộc",
      location: "Tiền Giang",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer1",
      certs: ["VietGAP", "OCOP 4 Sao", "GlobalGAP"],
      sales: "12,500+",
      bio: "20 năm kinh nghiệm trồng xoài cát Hòa Lộc xuất khẩu. Cam kết 100% hữu cơ, ứng dụng công nghệ tưới tiêu thông minh giúp tiết kiệm nước.",
      featured: true
    },
    {
      id: 2,
      shopId: 2,
      name: "Cô Thơm Đà Lạt",
      location: "Lâm Đồng",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer2",
      certs: ["VietGAP", "Organic EU"],
      sales: "8,200+",
      bio: "Tiên phong áp dụng nông nghiệp công nghệ cao và nhà kính thủy canh. Các loại rau quả luôn đạt độ tươi Fresh Index 98+.",
      featured: false
    },
    {
      id: 3,
      shopId: 3,
      name: "HTX Thanh Long Thuận Bình",
      location: "Bình Thuận",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer3",
      certs: ["GlobalGAP", "VietGAP", "ISO 9001"],
      sales: "15,000+",
      bio: "Hợp tác xã quy mô lớn, chuyên thanh long ruột đỏ xuất khẩu với quy trình khép kín, bao bì 100% tái chế thân thiện môi trường.",
      featured: true
    },
    {
      id: 4,
      shopId: 4,
      name: "Chú Bình Măng Tây",
      location: "Ninh Thuận",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer4",
      certs: ["VietGAP", "Organic VN"],
      sales: "4,500+",
      bio: "Cải tạo đất cát nắng cháy thành trang trại măng tây xanh mướt. Dùng phân bón hữu cơ từ trùn quế, không thuốc diệt cỏ.",
      featured: false
    },
    {
      id: 5,
      shopId: 5,
      name: "Nông Trại Cô Hai",
      location: "Đồng Nai",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer5",
      certs: ["GlobalGAP", "OCOP 5 Sao"],
      sales: "9,100+",
      bio: "Chuyên bưởi Tân Triều và các sản phẩm chế biến từ bưởi. Vườn bưởi sinh thái kết hợp du lịch nông nghiệp xanh.",
      featured: true
    },
    {
      id: 6,
      shopId: 6,
      name: "HTX Tiên Phước",
      location: "Quảng Nam",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer6",
      certs: ["VietGAP", "FairTrade"],
      sales: "6,300+",
      bio: "Hợp tác xã bảo tồn giống tiêu bản địa và các loại dược liệu quý. Hỗ trợ sinh kế bền vững cho đồng bào dân tộc thiểu số.",
      featured: false
    },
    {
      id: 7,
      shopId: 7,
      name: "Vườn Dâu Anh Tuấn",
      location: "Mộc Châu",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer7",
      certs: ["VietGAP"],
      sales: "11,200+",
      bio: "Mô hình trồng dâu tây Nhật Bản trong nhà màng tự động kiểm soát vi khí hậu. Bao bì giao hàng 100% tự phân hủy.",
      featured: true
    },
    {
      id: 8,
      shopId: 8,
      name: "Chú 3 Cà Phê",
      location: "Đắk Lắk",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer8",
      certs: ["Rainforest Alliance", "4C"],
      sales: "18,400+",
      bio: "Canh tác cà phê dưới tán rừng nguyên sinh, bảo vệ đa dạng sinh học và động vật hoang dã. Hạt cà phê phơi tự nhiên 100%.",
      featured: true
    },
    {
      id: 9,
      shopId: 9,
      name: "HTX Sinh Thái Bình Đại",
      location: "Bến Tre",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer9",
      certs: ["ASC", "GlobalGAP"],
      sales: "7,800+",
      bio: "Nuôi tôm sinh thái dưới tán rừng ngập mặn. Không sử dụng kháng sinh, thu hoạch theo kích cỡ bảo vệ nguồn lợi thủy sản.",
      featured: false
    },
    {
      id: 10,
      shopId: 10,
      name: "Cam Cao Phong - Bác Hùng",
      location: "Hòa Bình",
      avatar: "https://i.pravatar.cc/150?u=esgfarmer10",
      certs: ["VietGAP", "OCOP 4 Sao"],
      sales: "5,500+",
      bio: "Giữ gìn giống cam Cao Phong chính gốc. Áp dụng thiên địch để kiểm soát sâu bệnh, nói không với thuốc trừ sâu hóa học.",
      featured: false
    }
  ];

  const handleCardClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  const handleFollow = (e, shopId, farmerName) => {
    e.stopPropagation();
    if (followedShops.includes(shopId)) {
      // Hủy theo dõi
      const newFollowed = followedShops.filter(id => id !== shopId);
      setFollowedShops(newFollowed);
      localStorage.setItem('followedShops', JSON.stringify(newFollowed));
      addNotification(`Bạn đã bỏ theo dõi gian hàng của ${farmerName}`, 'unfollow');
    } else {
      // Đăng ký theo dõi
      const newFollowed = [...followedShops, shopId];
      setFollowedShops(newFollowed);
      localStorage.setItem('followedShops', JSON.stringify(newFollowed));
      addNotification(`Đã theo dõi gian hàng của ${farmerName}!`, 'follow');
    }
  };

  return (
    <div className="farmers-page">
      <div className="farmers-header">
        <h1>Nhà Nông Tiêu Biểu (Top Sellers)</h1>
        <p>Tôn vinh những người nông dân và hợp tác xã có đóng góp tích cực cho nông nghiệp bền vững và bảo vệ môi trường.</p>
      </div>
      
      <div className="farmers-list">
        {farmers.map(farmer => (
          <div className={`farmer-card ${farmer.featured ? 'featured' : ''}`} key={farmer.id} onClick={() => handleCardClick(farmer.shopId)} style={{cursor: 'pointer'}}>
            <div className="farmer-profile">
              <img src={farmer.avatar} alt={farmer.name} className="farmer-avatar" />
              <div className="farmer-info-col">
                <div className="farmer-name-loc">
                  <h2>{farmer.name} {farmer.featured && <CheckCircle size={20} color="#1a7b3b" fill="#86efac"/>}</h2>
                  <span>{farmer.location}</span>
                </div>
                <p className="farmer-bio">"{farmer.bio}"</p>
              </div>
            </div>
            
            <div className="farmer-metrics">
              <div className="metric">
                <TrendingUp size={16} /> Đã bán: <strong>{farmer.sales}</strong> đơn
              </div>
              <div className="metric cert-list">
                <ShieldCheck size={16} />
                {farmer.certs.map((cert, index) => (
                  <span key={index} className="cert-badge">{cert}</span>
                ))}
              </div>
            </div>
            
            <button 
              className={`btn-follow ${followedShops.includes(farmer.shopId) ? 'followed' : ''}`} 
              onClick={(e) => handleFollow(e, farmer.shopId, farmer.name)}
            >
              {followedShops.includes(farmer.shopId) ? 'Đã theo dõi' : 'Theo dõi Gian Hàng'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
