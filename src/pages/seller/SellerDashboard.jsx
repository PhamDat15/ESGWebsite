import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Package, Users, DollarSign, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SellerDashboard.css';

const salesData = {
  day: [
    { name: '00:00', sales: 1200000 }, { name: '04:00', sales: 800000 },
    { name: '08:00', sales: 4500000 }, { name: '12:00', sales: 8900000 },
    { name: '16:00', sales: 6200000 }, { name: '20:00', sales: 11000000 },
    { name: '24:00', sales: 2300000 }
  ],
  week: [
    { name: 'T2', sales: 15000000 }, { name: 'T3', sales: 12000000 },
    { name: 'T4', sales: 22000000 }, { name: 'T5', sales: 18000000 },
    { name: 'T6', sales: 25000000 }, { name: 'T7', sales: 35000000 },
    { name: 'CN', sales: 42000000 }
  ],
  month: [
    { name: 'Tuần 1', sales: 85000000 }, { name: 'Tuần 2', sales: 110000000 },
    { name: 'Tuần 3', sales: 95000000 }, { name: 'Tuần 4', sales: 124500000 }
  ],
  year: [
    { name: 'T1', sales: 450000000 }, { name: 'T2', sales: 380000000 },
    { name: 'T3', sales: 520000000 }, { name: 'T4', sales: 490000000 },
    { name: 'T5', sales: 610000000 }, { name: 'T6', sales: 580000000 },
    { name: 'T7', sales: 720000000 }, { name: 'T8', sales: 0 },
    { name: 'T9', sales: 0 }, { name: 'T10', sales: 0 },
    { name: 'T11', sales: 0 }, { name: 'T12', sales: 0 }
  ]
};

const SellerDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    return value;
  };
  return (
    <div className="seller-dashboard">
      <div className="sd-stats-grid">
        <div className="sd-stat-card">
          <div className="sd-icon-wrap bg-blue-light"><DollarSign size={24} color="#3b82f6" /></div>
          <div className="sd-stat-info">
            <span className="sd-stat-label">Doanh thu tháng này</span>
            <strong className="sd-stat-value">124.500.000đ</strong>
            <span style={{color: '#10b981', fontSize: '13px', fontWeight: '600', marginTop: '4px', display: 'block'}}>Lãi ròng: 43.575.000đ</span>
          </div>
        </div>
        <div className="sd-stat-card">
          <div className="sd-icon-wrap bg-green-light"><Package size={24} color="#10b981" /></div>
          <div className="sd-stat-info">
            <span className="sd-stat-label">Tổng đơn đã bán</span>
            <strong className="sd-stat-value">342</strong>
            <span style={{color: '#ef4444', fontSize: '13px', fontWeight: '600', marginTop: '4px', display: 'block'}}>Đang có vấn đề: 2 đơn</span>
          </div>
        </div>
        <div className="sd-stat-card">
          <div className="sd-icon-wrap bg-purple-light"><Users size={24} color="#8b5cf6" /></div>
          <div className="sd-stat-info">
            <span className="sd-stat-label">Khách hàng theo dõi</span>
            <strong className="sd-stat-value">1,250</strong>
          </div>
        </div>
        <div className="sd-stat-card">
          <div className="sd-icon-wrap bg-amber-light"><Activity size={24} color="#f59e0b" /></div>
          <div className="sd-stat-info">
            <span className="sd-stat-label">Điểm ESG Hiện Tại</span>
            <strong className="sd-stat-value">92/100</strong>
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh số */}
      <div className="sd-panel" style={{ marginBottom: '20px', background: '#171717', border: '1px solid #333' }}>
        <div className="sd-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <h3 style={{ color: '#fff' }}>Biểu đồ Doanh Số</h3>
          <div className="sd-chart-filters dark-mode">
            <button className={`chart-filter-btn dark-btn ${timeRange === 'day' ? 'active' : ''}`} onClick={() => setTimeRange('day')}>Ngày</button>
            <button className={`chart-filter-btn dark-btn ${timeRange === 'week' ? 'active' : ''}`} onClick={() => setTimeRange('week')}>Tuần</button>
            <button className={`chart-filter-btn dark-btn ${timeRange === 'month' ? 'active' : ''}`} onClick={() => setTimeRange('month')}>Tháng</button>
            <button className={`chart-filter-btn dark-btn ${timeRange === 'year' ? 'active' : ''}`} onClick={() => setTimeRange('year')}>Năm</button>
          </div>
        </div>
        <div className="sd-panel-body" style={{ height: '350px', padding: '20px 30px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData[timeRange]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 13 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a1a1aa', fontSize: 13 }} 
                tickFormatter={formatCurrency}
                dx={-10}
              />
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                contentStyle={{ backgroundColor: '#000', borderRadius: '8px', border: '1px solid #ef4444', color: '#facc15' }}
                itemStyle={{ color: '#facc15', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#facc15" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: '#000', stroke: '#ef4444' }} 
                activeDot={{ r: 6, fill: '#ef4444', stroke: '#facc15', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="sd-content-grid">
        <div className="sd-panel">
          <div className="sd-panel-header">
            <h3>Đơn hàng cần xử lý</h3>
            <button className="btn-link" onClick={() => navigate('/seller/orders')}>Xem tất cả</button>
          </div>
          <div className="sd-panel-body">
            <table className="sd-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-8921</td>
                  <td>Dâu tây Mộc Châu (2kg)</td>
                  <td>360.000đ</td>
                  <td><span className="status-badge pending">Chờ xác nhận</span></td>
                </tr>
                <tr>
                  <td>#ORD-8922</td>
                  <td>Rau mầm hữu cơ (5 túi)</td>
                  <td>125.000đ</td>
                  <td><span className="status-badge processing">Đang đóng gói</span></td>
                </tr>
                <tr>
                  <td>#ORD-8923</td>
                  <td>Cà chua Cherry (1kg)</td>
                  <td>85.000đ</td>
                  <td><span className="status-badge pending">Chờ xác nhận</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="sd-panel">
          <div className="sd-panel-header">
            <h3>Báo cáo phát triển bền vững</h3>
          </div>
          <div className="sd-panel-body">
            <div className="esg-score-breakdown">
              <div className="esg-score-item">
                <div className="esi-info">
                  <span>Môi trường (E)</span>
                  <strong>34/40</strong>
                </div>
                <div className="esi-bar"><div className="esi-fill env" style={{width: '85%'}}></div></div>
              </div>
              <div className="esg-score-item">
                <div className="esi-info">
                  <span>Xã hội (S)</span>
                  <strong>32/35</strong>
                </div>
                <div className="esi-bar"><div className="esi-fill soc" style={{width: '90%'}}></div></div>
              </div>
              <div className="esg-score-item">
                <div className="esi-info">
                  <span>Quản trị (G)</span>
                  <strong>26/25</strong>
                </div>
                <div className="esi-bar"><div className="esi-fill gov" style={{width: '100%'}}></div></div>
              </div>
            </div>
            <div className="esg-advice mt-20">
              <strong>Gợi ý cải thiện:</strong> Hãy chuyển sang sử dụng 100% bao bì tự hủy sinh học để đạt điểm tối đa (40/40) ở hạng mục Môi trường.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
