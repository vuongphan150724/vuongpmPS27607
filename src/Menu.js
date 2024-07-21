import React from "react";
import { listloai } from "./data";
import { Link } from "react-router-dom";
import "./menu.css";

class Menu extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav-menu">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/gioithieu">Giới thiệu</Link></li>
          <li><Link to="/timkiem">Tìm kiếm</Link></li>
          <li><Link to="/showcart">Giỏ hàng</Link></li>
          <li><Link to="/donhang">Hóa đơn</Link></li>
          <li className="dropdown">
            <span className="dropbtn">Danh mục sản phẩm</span>
            <ul className="dropdown-content">
              {listloai.map((loai, i) => (
                <li key={i}><Link to={`/loai/${loai.id_loai}`}>{loai.ten_loai}</Link></li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
