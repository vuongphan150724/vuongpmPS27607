// DonHangList.js

import React, { useState, useEffect } from 'react';
import './DonHangList.css'; // Import CSS file
import { Link } from 'react-router-dom';
function DonHangList() {
  const [donHangList, setDonHangList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/donhang')
      .then(response => response.json())
      .then(data => setDonHangList(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleDelete = (id) => {
    // Gọi API hoặc xử lý xóa đơn hàng với id đã cho
    console.log(`Xóa đơn hàng có id = ${id}`);
    fetch(`http://localhost:3000/donhang/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Đơn hàng đã được xóa:', data);
      // Cập nhật lại danh sách đơn hàng sau khi xóa thành công
      setDonHangList(donHangList.filter(donHang => donHang.id_dh !== id));
    })
    .catch(error => console.error('Lỗi khi xóa đơn hàng:', error));
  };

  return (
    <div className="don-hang-list-container">
      <h2>Danh sách đơn hàng</h2>
      <ul className="don-hang-list">
        {donHangList.map(donHang => (
          <li key={donHang.id_dh} className="don-hang-item">
            <p><strong>Mã đơn hàng:</strong> {donHang.id_dh}</p>
            <p><strong>Thời điểm mua:</strong> {new Date(donHang.thoi_diem_mua).toLocaleString()}</p>
            <p><strong>Họ tên:</strong> {donHang.ho_ten}</p>
            <p><strong>Email:</strong> {donHang.email}</p>
            <button onClick={() => handleDelete(donHang.id_dh)} className="delete-btn">Xóa hóa đơn</button>
          </li>
        ))}
      </ul>
      <ul className="don-hang-list">
        {donHangList.map((dh) => (
          <li key={dh.id_dh}>
            <Link to={`/chitietdonhang/${dh.id_dh}`}>xem chi tiết  #{dh.id_dh}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonHangList;
