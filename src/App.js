import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu";
import SPTrongLoai from "./SPTrongLoai";
import Home from "./Home";
import NotFound from "./NotFound";
import GioiThieu from "./GioiThieu";
import TimKiem from "./TimKiem";
import ChiTiet from "./ChiTiet";
import SanPhamXemNhieu from "./SanPhamXemNhieu";
import ShowCart from "./ShowCart";
import ThanhToan from "./ThanhToan";
import DonHang from "./DonHang";
import ChiTietDonHang from "./ChiTietDonHang";
import "./App.css";

const sotin = 10;

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        {/* Thanh điều hướng */}
        <nav>
          <Menu />
        </nav>
        
        {/* Phần chính và sidebar */}
        <main className="d-flex">
          <article className="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gioithieu" element={<GioiThieu />} />
              <Route path="/sp/:id" element={<ChiTiet />} />
              <Route path="/loai/:id_loai" element={<SPTrongLoai />} />
              <Route path="/timkiem" element={<TimKiem />} />
              <Route path="/showcart" element={<ShowCart />} />
              <Route path="/thanhtoan" element={<ThanhToan />} />
              <Route path="/donhang" element={<DonHang />} />
               <Route path="/chitietdonhang/:id_dh" element={<ChiTietDonHang />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </article>
          <aside className="col-md-3">
            <SanPhamXemNhieu sotin={sotin} />
          </aside>
        </main>
        
        {/* Footer */}
        <footer>
          <p>Phan Minh Vương</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
