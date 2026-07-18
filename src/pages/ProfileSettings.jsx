import React from 'react';

const ProfileSettings = () => {
  return (
    <div>
      <h2 style={{ fontSize: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--color-text-main)' }}>
        Hồ sơ của tôi
      </h2>
      <p style={{ color: 'var(--color-text-muted)' }}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px', color: 'var(--color-text-muted)' }}>Tên đăng nhập</label>
          <div style={{ color: 'var(--color-text-main)' }}>datpugaming</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px', color: 'var(--color-text-muted)' }}>Họ và tên</label>
          <input type="text" defaultValue="Người Dùng Eco" style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', flex: 1, color: 'var(--color-text-main)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px', color: 'var(--color-text-muted)' }}>Email</label>
          <div style={{ color: 'var(--color-text-main)' }}>datpu***@gmail.com</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px', color: 'var(--color-text-muted)' }}>Số điện thoại</label>
          <div style={{ color: 'var(--color-text-main)' }}>*********89</div>
        </div>
        <button style={{ background: 'var(--color-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', width: 'fit-content', marginTop: '10px', fontWeight: '500' }}>Lưu thay đổi</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
