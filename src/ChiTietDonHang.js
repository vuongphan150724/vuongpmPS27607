import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChiTietDonHang.css';

function ChiTietDonHang() {
  const { id_dh } = useParams();
  const [chiTietDonHang, setChiTietDonHang] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/chitietdonhang/${id_dh}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data.thongbao === "Lấy chi tiết đơn hàng thành công") {
          setChiTietDonHang(data.data);
        } else {
          setError('Error fetching order details');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Error fetching order details');
      });
  }, [id_dh]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="chi-tiet-don-hang-container">
      <h2>Chi Tiết Đơn Hàng #{id_dh}</h2>
      <table className="chi-tiet-don-hang-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>mã sản phẩm</th>
            <th>Số lượng</th>
            
            
          </tr>
        </thead>
        <tbody>
          {chiTietDonHang.map((item) => (
            <tr key={item.id_ct}>
              <td>{item.id_dh}</td>
              <td>{item.id_sp}</td>
              <td>{item.so_luong}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChiTietDonHang;
