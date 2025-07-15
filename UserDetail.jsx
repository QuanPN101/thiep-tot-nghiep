import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './UserDetail.css';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/nguoidung/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Lỗi lấy chi tiết người dùng:', err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getRoleBadge = (roleCode) => {
    const roles = {
      1: { label: "Khách hàng", class: "badge-customer" },
      2: { label: "Chủ Gian hàng", class: "badge-vendor" },
      3: { label: "Admin", class: "badge-admin" }
    };
    const role = roles[roleCode] || { label: "Không xác định", class: "badge-unknown" };
    return <span className={`user-badge ${role.class}`}>{role.label}</span>;
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`user-badge ${status ? 'badge-active' : 'badge-inactive'}`}>
        <i className={`fas ${status ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
        {status ? "Đang hoạt động" : "Đã bị khóa"}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải chi tiết người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="page-header">
        <h1 className="page-title">
          <i className="fas fa-user-circle"></i>
          Chi tiết thông tin người dùng
        </h1>
        <nav className="breadcrumb">
          <Link to="/account" className="breadcrumb-link">Quản lý tài khoản</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Chi tiết người dùng</span>
        </nav>
      </div>

      <div className="user-profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Ảnh đại diện"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <div className="avatar-status">
                {getStatusBadge(user.trangThai)}
              </div>
            </div>
          </div>
          
          <div className="profile-info">
            <h2 className="user-name">{user.hoTen}</h2>
            <p className="user-email">
              <i className="fas fa-envelope"></i>
              {user.email}
            </p>
            <div className="user-role">
              {getRoleBadge(user.maVaiTro)}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-user"></i>
                Họ và tên
              </div>
              <div className="detail-value">{user.hoTen}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-envelope"></i>
                Email
              </div>
              <div className="detail-value">{user.email}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-map-marker-alt"></i>
                Địa chỉ
              </div>
              <div className="detail-value">{user.diaChi || "Chưa cập nhật"}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-phone"></i>
                Số điện thoại
              </div>
              <div className="detail-value">{user.soDienThoai || "Chưa cập nhật"}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-user-tag"></i>
                Vai trò
              </div>
              <div className="detail-value">
                {getRoleBadge(user.maVaiTro)}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-toggle-on"></i>
                Trạng thái
              </div>
              <div className="detail-value">
                {getStatusBadge(user.trangThai)}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-calendar-plus"></i>
                Ngày tạo
              </div>
              <div className="detail-value">
                {new Date(user.ngayTao).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <div className="action-buttons">
            {!user.trangThai && (
              <button className="btn btn-danger">
                <i className="fas fa-trash"></i>
                Xóa thông tin
              </button>
            )}
            
            <Link to="/account" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i>
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;